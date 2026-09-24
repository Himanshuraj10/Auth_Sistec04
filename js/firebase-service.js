/**
 * TrustChain Verify - Firebase Service & Cloud Firestore Data Layer
 * Handles Firebase Auth & Firestore with seamless fallback to offline Demo Mode.
 */

const FirebaseService = {
  isOnlineFirebase: false,
  auth: null,
  db: null,

  async init() {
    if (window.isFirebaseConfigured && window.isFirebaseConfigured() && typeof firebase !== 'undefined') {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(window.FIREBASE_CONFIG);
        }
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.isOnlineFirebase = true;
        console.log("Firebase Service: Connected to Cloud Firestore & Firebase Auth.");
      } catch (err) {
        console.warn("Firebase initialization failed, falling back to Demo Mode:", err);
        this.isOnlineFirebase = false;
      }
    } else {
      this.isOnlineFirebase = false;
      console.log("Firebase Service: Running in offline Demo Mode.");
    }
  },

  // Site Configuration
  async loadSiteConfig() {
    if (this.isOnlineFirebase && this.db) {
      try {
        const doc = await this.db.collection('siteConfig').doc('main').get();
        if (doc.exists) {
          return { ...window.DEFAULT_SITE_CONFIG, ...doc.data() };
        }
      } catch (err) {
        console.warn("Error loading siteConfig from Firestore:", err);
      }
    }
    const local = localStorage.getItem('trustchain_site_config');
    return local ? JSON.parse(local) : window.DEFAULT_SITE_CONFIG;
  },

  async saveSiteConfig(config) {
    localStorage.setItem('trustchain_site_config', JSON.stringify(config));
    window.currentSiteConfig = config;

    if (this.isOnlineFirebase && this.db) {
      try {
        await this.db.collection('siteConfig').doc('main').set({
          ...config,
          updatedAt: Date.now(),
          updatedBy: window.AppState?.currentUser?.email || 'Admin'
        });
        return true;
      } catch (err) {
        console.error("Error saving siteConfig to Firestore:", err);
      }
    }
    return true;
  },

  // Users & Access Control
  async loadUsers() {
    if (this.isOnlineFirebase && this.db) {
      try {
        const snapshot = await this.db.collection('users').get();
        const users = [];
        snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
        return users;
      } catch (err) {
        console.warn("Error loading users from Firestore:", err);
      }
    }
    const local = localStorage.getItem('trustchain_users');
    return local ? JSON.parse(local) : [
      {
        id: 'usr_owner',
        email: window.OWNER_EMAIL || 'owner@demo.in',
        name: 'Dr. Vikram Sethi',
        role: 'OWNER',
        status: 'ACTIVE',
        lastLoginAt: Date.now(),
        addedBy: 'SYSTEM'
      },
      {
        id: 'usr_demo_user',
        email: 'user@demo.in',
        name: 'Rajesh Sharma',
        role: 'USER',
        status: 'ACTIVE',
        lastLoginAt: Date.now() - 3600000,
        addedBy: 'Self Registered'
      }
    ];
  },

  async saveUser(user) {
    const users = await this.loadUsers();
    const idx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...user };
    } else {
      users.push(user);
    }
    localStorage.setItem('trustchain_users', JSON.stringify(users));

    if (this.isOnlineFirebase && this.db) {
      try {
        await this.db.collection('users').doc(user.id || user.email.replace(/[@.]/g, '_')).set(user, { merge: true });
      } catch (err) {
        console.error("Error saving user to Firestore:", err);
      }
    }
    return users;
  },

  async updateUserRole(email, newRole, updatedBy) {
    const users = await this.loadUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      user.role = newRole;
      user.updatedBy = updatedBy;
      user.updatedAt = Date.now();
      localStorage.setItem('trustchain_users', JSON.stringify(users));

      if (this.isOnlineFirebase && this.db) {
        try {
          await this.db.collection('users').doc(user.id || email.replace(/[@.]/g, '_')).update({
            role: newRole,
            updatedBy,
            updatedAt: Date.now()
          });
        } catch (err) {
          console.error("Error updating role in Firestore:", err);
        }
      }
    }
    return users;
  },

  async updateUserStatus(email, newStatus) {
    const users = await this.loadUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      user.status = newStatus;
      localStorage.setItem('trustchain_users', JSON.stringify(users));

      if (this.isOnlineFirebase && this.db) {
        try {
          await this.db.collection('users').doc(user.id || email.replace(/[@.]/g, '_')).update({
            status: newStatus
          });
        } catch (err) {
          console.error("Error updating status in Firestore:", err);
        }
      }
    }
    return users;
  },

  async deleteUser(email) {
    let users = await this.loadUsers();
    users = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
    localStorage.setItem('trustchain_users', JSON.stringify(users));

    if (this.isOnlineFirebase && this.db) {
      try {
        await this.db.collection('users').doc(email.replace(/[@.]/g, '_')).delete();
      } catch (err) {
        console.error("Error deleting user from Firestore:", err);
      }
    }
    return users;
  },

  // Pre-Authorized Allowlist
  async loadPreAuthorizedEmails() {
    if (this.isOnlineFirebase && this.db) {
      try {
        const snapshot = await this.db.collection('preAuthorizedEmails').get();
        const list = [];
        snapshot.forEach(doc => list.push(doc.data()));
        return list;
      } catch (err) {
        console.warn("Error loading preAuthorizedEmails:", err);
      }
    }
    const local = localStorage.getItem('trustchain_preauthorized_emails');
    return local ? JSON.parse(local) : [];
  },

  async addPreAuthorizedEmail(entry) {
    const list = await this.loadPreAuthorizedEmails();
    const existing = list.findIndex(e => e.email.toLowerCase() === entry.email.toLowerCase());
    if (existing !== -1) {
      list[existing] = entry;
    } else {
      list.push(entry);
    }
    localStorage.setItem('trustchain_preauthorized_emails', JSON.stringify(list));

    if (this.isOnlineFirebase && this.db) {
      try {
        await this.db.collection('preAuthorizedEmails').doc(entry.email.replace(/[@.]/g, '_')).set(entry);
      } catch (err) {
        console.error("Error saving preAuthorizedEmail to Firestore:", err);
      }
    }
    return list;
  },

  // Shared Blockchain Ledger
  async loadBlockchain() {
    if (this.isOnlineFirebase && this.db) {
      try {
        const doc = await this.db.collection('blockchain').doc('ledger').get();
        if (doc.exists && doc.data().blocks) {
          return doc.data().blocks;
        }
      } catch (err) {
        console.warn("Error loading blockchain from Firestore:", err);
      }
    }
    const local = localStorage.getItem('trustchain_blockchain');
    return local ? JSON.parse(local) : null;
  },

  async saveBlockchain(blocks) {
    localStorage.setItem('trustchain_blockchain', JSON.stringify(blocks));

    if (this.isOnlineFirebase && this.db) {
      try {
        await this.db.collection('blockchain').doc('ledger').set({
          blocks,
          lastUpdated: Date.now(),
          height: blocks.length - 1
        });
      } catch (err) {
        console.error("Error saving blockchain to Firestore:", err);
      }
    }
  },

  // Verifications
  async loadSubmissions() {
    if (this.isOnlineFirebase && this.db) {
      try {
        const snapshot = await this.db.collection('verifications').orderBy('timestamp', 'desc').limit(50).get();
        const records = [];
        snapshot.forEach(doc => records.push(doc.data()));
        return records;
      } catch (err) {
        console.warn("Error loading verifications from Firestore:", err);
      }
    }
    const local = localStorage.getItem('trustchain_submissions');
    return local ? JSON.parse(local) : [];
  },

  async saveSubmission(record) {
    const list = await this.loadSubmissions();
    list.unshift(record);
    localStorage.setItem('trustchain_submissions', JSON.stringify(list));

    if (this.isOnlineFirebase && this.db) {
      try {
        await this.db.collection('verifications').doc(record.receiptId).set(record);
      } catch (err) {
        console.error("Error saving verification to Firestore:", err);
      }
    }
  },

  // Audit Logs
  async loadAuditLogs() {
    if (this.isOnlineFirebase && this.db) {
      try {
        const snapshot = await this.db.collection('auditLogs').orderBy('timestamp', 'desc').limit(100).get();
        const logs = [];
        snapshot.forEach(doc => logs.push(doc.data()));
        return logs;
      } catch (err) {
        console.warn("Error loading audit logs from Firestore:", err);
      }
    }
    const local = localStorage.getItem('trustchain_audit_logs');
    return local ? JSON.parse(local) : [];
  },

  async appendAuditLog(entry) {
    const logs = await this.loadAuditLogs();
    logs.unshift(entry);
    localStorage.setItem('trustchain_audit_logs', JSON.stringify(logs));

    if (this.isOnlineFirebase && this.db) {
      try {
        await this.db.collection('auditLogs').add(entry);
      } catch (err) {
        console.error("Error appending audit log in Firestore:", err);
      }
    }
  }
};

window.FirebaseService = FirebaseService;
