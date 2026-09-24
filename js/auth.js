/**
 * TrustChain Verify - Authentication & Access Control Engine
 * Handles Google Sign-In, Email Safety Checks, RBAC, and Idle Timeout.
 */

const Auth = {
  idleTimeoutTimer: null,
  idleLimitMs: 15 * 60 * 1000, // 15 minutes
  lastActivity: Date.now(),

  init() {
    this.setupIdleTimer();
    this.checkAutoLogin();
  },

  setupIdleTimer() {
    const resetTimer = () => {
      this.lastActivity = Date.now();
    };
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    setInterval(() => {
      if (window.AppState?.currentUser && Date.now() - this.lastActivity > this.idleLimitMs) {
        this.logout("Session timed out due to 15 minutes of inactivity.");
      }
    }, 30000);
  },

  checkAutoLogin() {
    const saved = sessionStorage.getItem('trustchain_current_user');
    if (saved) {
      try {
        window.AppState.currentUser = JSON.parse(saved);
        UI.updateAuthUI();
      } catch (e) {
        sessionStorage.removeItem('trustchain_current_user');
      }
    }
  },

  async signInWithGoogle() {
    const config = window.currentSiteConfig || window.DEFAULT_SITE_CONFIG;

    if (window.FirebaseService.isOnlineFirebase && window.FirebaseService.auth) {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        const result = await window.FirebaseService.auth.signInWithPopup(provider);
        const user = result.user;

        // Perform strict Google email safety checks
        const checkResult = await this.validateGoogleAccount(user, config);
        if (!checkResult.allowed) {
          await window.FirebaseService.auth.signOut();
          UI.showToast(checkResult.reason, "error");
          return;
        }

        // Establish session
        await this.handleSuccessfulLogin(checkResult.userData);
      } catch (err) {
        console.error("Google Sign-In Error:", err);
        UI.showToast(err.message || "Google Sign-In was cancelled or failed.", "error");
      }
    } else {
      // Offline Demo Mode: Prompt user or use quick demo account
      this.showDemoGoogleLoginModal();
    }
  },

  async validateGoogleAccount(googleUser, config) {
    const email = (googleUser.email || "").toLowerCase().trim();
    const domain = email.split('@')[1] || '';

    // Check 1: Google Email Verification
    if (!googleUser.emailVerified && !email.endsWith('@demo.in')) {
      return { allowed: false, reason: "Your Google email address is not verified by Google." };
    }

    // Check 2: Disposable / Temporary Email Domain Check
    const blockedDomains = config.systemSettings?.blockedDomains || [];
    if (blockedDomains.some(d => domain === d.toLowerCase())) {
      return { allowed: false, reason: `Disposable or temporary email domains (@${domain}) are prohibited.` };
    }

    // Check 3: Blocked Emails List
    const blockedEmails = config.systemSettings?.blockedEmails || [];
    if (blockedEmails.some(e => e.toLowerCase() === email)) {
      return { allowed: false, reason: "This account has been administratively blocked from access." };
    }

    // Check 4: Allowed Domains Enforced (if configured)
    const allowedDomains = config.systemSettings?.allowedDomains || [];
    if (allowedDomains.length > 0 && !allowedDomains.some(d => domain === d.toLowerCase())) {
      return { allowed: false, reason: `Only organization accounts from ${allowedDomains.join(', ')} are permitted.` };
    }

    // Determine Role
    const ownerEmail = (window.OWNER_EMAIL || "owner@demo.in").toLowerCase();
    let role = 'USER';
    let status = 'ACTIVE';

    if (email === ownerEmail) {
      role = 'OWNER';
    } else {
      // Check if pre-authorized in allowlist
      const preAuthorized = await window.FirebaseService.loadPreAuthorizedEmails();
      const preEntry = preAuthorized.find(p => p.email.toLowerCase() === email);
      if (preEntry) {
        role = preEntry.role || 'USER';
      } else {
        // Check existing user database
        const existingUsers = await window.FirebaseService.loadUsers();
        const existing = existingUsers.find(u => u.email.toLowerCase() === email);
        if (existing) {
          role = existing.role;
          status = existing.status;
          if (status === 'BLOCKED') {
            return { allowed: false, reason: "Your account is currently blocked. Contact an administrator." };
          }
          if (status === 'PENDING') {
            return { allowed: false, reason: "Your registration is awaiting approval by an Administrator." };
          }
        } else {
          // Check Registration Mode
          const regMode = config.systemSettings?.registrationMode || 'open';
          if (regMode === 'invite') {
            return { allowed: false, reason: "This platform is currently Invite-Only. Your email must be pre-authorized." };
          }
          if (regMode === 'approval') {
            status = 'PENDING';
            // Save pending user
            await window.FirebaseService.saveUser({
              id: googleUser.uid || 'usr_' + Date.now(),
              email,
              name: googleUser.displayName || 'Applicant',
              photoUrl: googleUser.photoURL || '',
              role: 'USER',
              status: 'PENDING',
              createdAt: Date.now(),
              lastLoginAt: Date.now(),
              addedBy: 'Self Registered (Pending)'
            });
            return { allowed: false, reason: "Registration submitted! Your account is awaiting Administrator approval." };
          }
        }
      }
    }

    const userData = {
      id: googleUser.uid || 'usr_' + Date.now(),
      email,
      name: googleUser.displayName || email.split('@')[0],
      photoUrl: googleUser.photoURL || '',
      role,
      status,
      lastLoginAt: Date.now()
    };

    return { allowed: true, userData };
  },

  async handleSuccessfulLogin(userData) {
    window.AppState.currentUser = userData;
    sessionStorage.setItem('trustchain_current_user', JSON.stringify(userData));

    // Persist to users database
    await window.FirebaseService.saveUser(userData);

    // Audit log
    await window.FirebaseService.appendAuditLog({
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: userData.email,
      action: "LOGIN",
      target: "AUTH_GATEWAY",
      status: "SUCCESS",
      details: `Google Sign-In authenticated with role: ${userData.role}`
    });

    UI.updateAuthUI();
    UI.showToast(`Signed in as ${userData.name} (${userData.role})`, "success");

    // Route guards
    if (userData.role === 'OWNER' || userData.role === 'ADMIN') {
      UI.showView('admin');
      UI.showAdminTab('analytics');
    } else {
      UI.showView('citizen');
      UI.showCitizenTab('dashboard');
    }
  },

  logout(reason) {
    if (window.FirebaseService.isOnlineFirebase && window.FirebaseService.auth) {
      window.FirebaseService.auth.signOut();
    }
    const email = window.AppState?.currentUser?.email;
    window.AppState.currentUser = null;
    sessionStorage.removeItem('trustchain_current_user');

    if (email) {
      window.FirebaseService.appendAuditLog({
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        actor: email,
        action: "LOGOUT",
        target: "AUTH_GATEWAY",
        status: "SUCCESS",
        details: reason || "User initiated sign-out"
      });
    }

    UI.updateAuthUI();
    UI.showView('landing');
    UI.showToast(reason || "You have been signed out.", "info");
  },

  // Demo Google Login Modal when Firebase is unconfigured
  showDemoGoogleLoginModal() {
    const ownerEmail = window.OWNER_EMAIL || "owner@demo.in";
    const modal = document.getElementById('modal-demo-login');
    if (modal) {
      document.getElementById('demo-owner-email-tag').innerText = ownerEmail;
      modal.classList.add('active');
    }
  },

  quickDemoLogin(role) {
    const ownerEmail = window.OWNER_EMAIL || "owner@demo.in";
    let email = role === 'owner' ? ownerEmail : (role === 'admin' ? 'admin@demo.in' : 'user@demo.in');
    let name = role === 'owner' ? 'Dr. Vikram Sethi' : (role === 'admin' ? 'Sarah Jenkins' : 'Rajesh Sharma');
    let userRole = role === 'owner' ? 'OWNER' : (role === 'admin' ? 'ADMIN' : 'USER');

    const fakeGoogleUser = {
      uid: 'demo_' + role + '_' + Date.now(),
      email,
      displayName: name,
      photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
      emailVerified: true
    };

    UI.hideModal('modal-demo-login');
    this.handleSuccessfulLogin({
      id: fakeGoogleUser.uid,
      email: fakeGoogleUser.email,
      name: fakeGoogleUser.displayName,
      photoUrl: fakeGoogleUser.photoURL,
      role: userRole,
      status: 'ACTIVE',
      lastLoginAt: Date.now()
    });
  }
};

window.Auth = Auth;
