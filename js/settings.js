/**
 * TrustChain Verify - Site Settings & Content Editor Engine
 * Full in-browser CMS allowing complete live customization of branding, copy, themes, and thresholds.
 */

const SettingsEditor = {
  themePresets: {
    "Default": { primary: "#5B6CFF", secondary: "#2DD4BF", accent: "#FFB86B" },
    "Ocean": { primary: "#0284C7", secondary: "#38BDF8", accent: "#F59E0B" },
    "Forest": { primary: "#059669", secondary: "#10B981", accent: "#FBBF24" },
    "Sunset": { primary: "#E11D48", secondary: "#FB7185", accent: "#F59E0B" },
    "Slate": { primary: "#475569", secondary: "#64748B", accent: "#38BDF8" }
  },

  init() {
    this.populateFormFields();
  },

  populateFormFields() {
    const cfg = window.currentSiteConfig || window.DEFAULT_SITE_CONFIG;

    // Branding
    this.setVal('set-app-name', cfg.branding?.appName);
    this.setVal('set-tagline', cfg.branding?.tagline);
    this.setVal('set-logo-emoji', cfg.branding?.logoEmoji);
    this.setVal('set-team-name', cfg.branding?.teamName);
    this.setVal('set-org-name', cfg.branding?.orgName);
    this.setVal('set-contact-email', cfg.branding?.contactEmail);
    this.setVal('set-footer-text', cfg.branding?.footerText);

    // Owner Profile
    this.setVal('set-owner-name', cfg.ownerProfile?.displayName);
    this.setVal('set-owner-role', cfg.ownerProfile?.roleTitle);
    this.setVal('set-panel-title', cfg.ownerProfile?.panelTitle);
    this.setVal('set-welcome-msg', cfg.ownerProfile?.welcomeMessage);

    // Landing Page
    this.setVal('set-hero-title', cfg.landing?.heroTitle);
    this.setVal('set-hero-subtitle', cfg.landing?.heroSubtitle);
    this.setVal('set-hero-kicker', cfg.landing?.heroKicker);
    this.setVal('set-cta-signin', cfg.landing?.ctaSignIn);
    this.setVal('set-cta-verify', cfg.landing?.ctaVerifyReceipt);
    this.setVal('set-blockchain-sentence', cfg.landing?.blockchainExplanation?.sentence);

    // Theme & Colors
    this.setVal('set-primary-color', cfg.theme?.primaryColor || "#5B6CFF");
    this.setVal('set-secondary-color', cfg.theme?.secondaryColor || "#2DD4BF");
    this.setVal('set-accent-color', cfg.theme?.accentColor || "#FFB86B");
    this.setVal('set-border-radius', cfg.theme?.borderRadius || "16px");

    // System Settings
    this.setVal('set-accept-threshold', cfg.systemSettings?.acceptThreshold || 25);
    this.setVal('set-reject-threshold', cfg.systemSettings?.rejectThreshold || 60);
    this.setVal('set-difficulty', cfg.systemSettings?.difficulty || 2);
    this.setVal('set-timeout-min', cfg.systemSettings?.sessionTimeoutMinutes || 15);

    // Render FAQs in editor
    this.renderFaqListEditor();
  },

  setVal(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.value = val;
  },

  getVal(id, fallback = '') {
    const el = document.getElementById(id);
    return el ? el.value.trim() : fallback;
  },

  renderFaqListEditor() {
    const container = document.getElementById('faq-editor-container');
    if (!container) return;

    const faqs = window.currentSiteConfig?.landing?.faqs || [];
    container.innerHTML = faqs.map((f, i) => `
      <div class="bento-card" style="padding: 16px; margin-bottom: 12px; background: var(--bg-subtle);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <strong style="font-size: 13px;">FAQ #${i + 1}</strong>
          <button type="button" class="btn btn-sm btn-ghost" onclick="SettingsEditor.deleteFaq(${i})" style="color: var(--danger-color);">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
        <input type="text" class="faq-edit-q" value="${this.escapeHtml(f.q)}" placeholder="Question" style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color); margin-bottom: 8px; font-size: 13px;">
        <textarea class="faq-edit-a" rows="2" placeholder="Answer" style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color); font-size: 13px;">${this.escapeHtml(f.a)}</textarea>
      </div>
    `).join('');
  },

  addFaqItem() {
    const cfg = window.currentSiteConfig;
    if (!cfg.landing) cfg.landing = {};
    if (!cfg.landing.faqs) cfg.landing.faqs = [];
    cfg.landing.faqs.push({
      q: "New question title?",
      a: "Explanation answering the question in plain, simple words."
    });
    this.renderFaqListEditor();
  },

  deleteFaq(index) {
    const cfg = window.currentSiteConfig;
    if (cfg.landing?.faqs) {
      cfg.landing.faqs.splice(index, 1);
      this.renderFaqListEditor();
    }
  },

  applyPreset(presetName) {
    const preset = this.themePresets[presetName];
    if (!preset) return;
    this.setVal('set-primary-color', preset.primary);
    this.setVal('set-secondary-color', preset.secondary);
    this.setVal('set-accent-color', preset.accent);
    this.livePreviewTheme();
    UI.showToast(`Applied preset: ${presetName}`, "info");
  },

  livePreviewTheme() {
    const primary = this.getVal('set-primary-color', '#5B6CFF');
    const secondary = this.getVal('set-secondary-color', '#2DD4BF');
    const accent = this.getVal('set-accent-color', '#FFB86B');
    const radius = this.getVal('set-border-radius', '16px');

    document.documentElement.style.setProperty('--primary-color', primary);
    document.documentElement.style.setProperty('--secondary-color', secondary);
    document.documentElement.style.setProperty('--accent-color', accent);
    document.documentElement.style.setProperty('--radius-lg', radius);
  },

  async saveAllSettings() {
    const cfg = window.currentSiteConfig || JSON.parse(JSON.stringify(window.DEFAULT_SITE_CONFIG));

    // Branding
    cfg.branding = {
      ...cfg.branding,
      appName: this.getVal('set-app-name', 'TrustChain Verify'),
      tagline: this.getVal('set-tagline', 'Intelligent Document Verification'),
      logoEmoji: this.getVal('set-logo-emoji', '🛡️'),
      teamName: this.getVal('set-team-name', 'Team TrustChain'),
      orgName: this.getVal('set-org-name', 'Ministry of Electronics & IT'),
      contactEmail: this.getVal('set-contact-email', 'support@trustchain.gov.in'),
      footerText: this.getVal('set-footer-text', '')
    };

    // Owner Profile
    cfg.ownerProfile = {
      ...cfg.ownerProfile,
      displayName: this.getVal('set-owner-name', 'Dr. Vikram Sethi'),
      roleTitle: this.getVal('set-owner-role', 'Chief Verification Officer'),
      panelTitle: this.getVal('set-panel-title', 'Verifier Authority Console'),
      welcomeMessage: this.getVal('set-welcome-msg', '')
    };

    // Landing
    cfg.landing = {
      ...cfg.landing,
      heroTitle: this.getVal('set-hero-title', ''),
      heroSubtitle: this.getVal('set-hero-subtitle', ''),
      heroKicker: this.getVal('set-hero-kicker', ''),
      ctaSignIn: this.getVal('set-cta-signin', 'Sign in with Google'),
      ctaVerifyReceipt: this.getVal('set-cta-verify', 'Verify a Receipt')
    };
    if (!cfg.landing.blockchainExplanation) cfg.landing.blockchainExplanation = {};
    cfg.landing.blockchainExplanation.sentence = this.getVal('set-blockchain-sentence', '');

    // Collect FAQs from editor
    const qInputs = document.querySelectorAll('.faq-edit-q');
    const aInputs = document.querySelectorAll('.faq-edit-a');
    const updatedFaqs = [];
    qInputs.forEach((qEl, i) => {
      if (qEl.value.trim()) {
        updatedFaqs.push({ q: qEl.value.trim(), a: aInputs[i] ? aInputs[i].value.trim() : '' });
      }
    });
    cfg.landing.faqs = updatedFaqs;

    // Theme
    cfg.theme = {
      ...cfg.theme,
      primaryColor: this.getVal('set-primary-color', '#5B6CFF'),
      secondaryColor: this.getVal('set-secondary-color', '#2DD4BF'),
      accentColor: this.getVal('set-accent-color', '#FFB86B'),
      borderRadius: this.getVal('set-border-radius', '16px')
    };

    // System Settings
    cfg.systemSettings = {
      ...cfg.systemSettings,
      acceptThreshold: Number(this.getVal('set-accept-threshold', '25')),
      rejectThreshold: Number(this.getVal('set-reject-threshold', '60')),
      difficulty: Number(this.getVal('set-difficulty', '2')),
      sessionTimeoutMinutes: Number(this.getVal('set-timeout-min', '15'))
    };

    // Persist to Cloud Firestore & LocalStorage
    await FirebaseService.saveSiteConfig(cfg);
    window.currentSiteConfig = cfg;

    // Re-hydrate UI immediately
    UI.hydrateAllCopy();
    this.livePreviewTheme();

    await FirebaseService.appendAuditLog({
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: window.AppState?.currentUser?.email || "Admin",
      action: "SETTINGS_UPDATE",
      target: "SITE_CONFIG",
      status: "SUCCESS",
      details: "Updated site branding, landing page copy, theme colors, and thresholds"
    });

    UI.showToast("All settings saved and applied live across the platform!", "success");
  },

  async restoreDefaults() {
    if (confirm("Restore all site content, copy, and theme colors to original defaults?")) {
      const def = JSON.parse(JSON.stringify(window.DEFAULT_SITE_CONFIG));
      await FirebaseService.saveSiteConfig(def);
      window.currentSiteConfig = def;
      this.populateFormFields();
      UI.hydrateAllCopy();
      this.livePreviewTheme();
      UI.showToast("Restored all configuration to defaults.", "info");
    }
  },

  exportConfigJSON() {
    const cfg = window.currentSiteConfig || window.DEFAULT_SITE_CONFIG;
    const blob = new Blob([JSON.stringify(cfg, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trustchain_siteConfig_${Date.now()}.json`;
    a.click();
    UI.showToast("Site configuration exported as JSON.", "success");
  },

  importConfigJSON(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.branding && imported.landing) {
          await FirebaseService.saveSiteConfig(imported);
          window.currentSiteConfig = imported;
          this.populateFormFields();
          UI.hydrateAllCopy();
          this.livePreviewTheme();
          UI.showToast("Configuration imported and applied successfully!", "success");
        } else {
          UI.showToast("Invalid configuration JSON structure.", "error");
        }
      } catch (err) {
        UI.showToast("Could not parse JSON file.", "error");
      }
    };
    reader.readAsText(file);
  },

  escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
};

window.SettingsEditor = SettingsEditor;
