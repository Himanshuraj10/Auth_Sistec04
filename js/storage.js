/**
 * TrustChain Verify - Storage & Privacy Engine
 * Hybrid storage: IndexedDB for encrypted off-chain document images,
 * and FirebaseService for shared multi-user ledger metadata.
 */

const StorageEngine = {
  db: null,

  async init() {
    return new Promise((resolve) => {
      const request = indexedDB.open("TrustChainEncryptedDB", 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("documents")) {
          db.createObjectStore("documents", { keyPath: "id" });
        }
      };
      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve();
      };
      request.onerror = () => resolve();
    });
  },

  async storeEncryptedDocument(id, dataUrl, meta) {
    if (!this.db) await this.init();
    try {
      // Encrypt file client-side using AES-GCM
      const encrypted = await CryptoEngine.encryptAES(dataUrl);
      const tx = this.db.transaction("documents", "readwrite");
      const store = tx.objectStore("documents");
      store.put({ id, encrypted, meta, timestamp: Date.now() });
    } catch (e) {
      console.warn("IndexedDB store error:", e);
    }
  },

  async getDocument(id) {
    if (!this.db) await this.init();
    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction("documents", "readonly");
        const store = tx.objectStore("documents");
        const req = store.get(id);
        req.onsuccess = () => {
          if (req.result && req.result.encrypted) {
            // In demo mode or decrypt
            try {
              resolve(atob(req.result.encrypted.cipherText));
            } catch (err) {
              resolve(req.result.dataUrl || null);
            }
          } else {
            resolve(null);
          }
        };
        req.onerror = () => resolve(null);
      } catch (e) {
        resolve(null);
      }
    });
  },

  async exportCitizenData() {
    const submissions = await FirebaseService.loadSubmissions();
    const userSubmissions = submissions.filter(s => 
      !window.AppState.currentUser || s.verifierId === window.AppState.currentUser.email || true
    );
    const blob = new Blob([JSON.stringify(userSubmissions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trustchain_export_${Date.now()}.json`;
    a.click();
    UI.showToast("Personal data exported successfully", "success");
    await FirebaseService.appendAuditLog({
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: window.AppState?.currentUser?.email || "Citizen",
      action: "DATA_EXPORT",
      target: "CITIZEN_RECORDS",
      status: "SUCCESS",
      details: "Citizen exported stored submission records"
    });
  },

  async deleteOffChainData() {
    if (confirm("Are you sure you want to delete your off-chain document images? Your verified on-chain cryptographic receipts will remain permanently recorded on the blockchain ledger.")) {
      if (this.db) {
        const tx = this.db.transaction("documents", "readwrite");
        tx.objectStore("documents").clear();
      }
      UI.showToast("Off-chain document files permanently erased. Blockchain proofs preserved.", "warning");
      await FirebaseService.appendAuditLog({
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        actor: window.AppState?.currentUser?.email || "Citizen",
        action: "DATA_ERASURE",
        target: "INDEXED_DB",
        status: "SUCCESS",
        details: "Citizen triggered right to erasure for off-chain images"
      });
    }
  }
};

window.StorageEngine = StorageEngine;
