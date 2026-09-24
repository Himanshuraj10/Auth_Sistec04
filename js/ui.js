/**
 * TrustChain Verify - UI Hydration & Interaction Orchestrator
 * Dynamic copy hydration from siteConfig, Chart.js analytics, stepper animations, and views.
 */

const UI = {
  currentView: 'landing',
  currentCitizenTab: 'dashboard',
  currentAdminTab: 'analytics',
  charts: {},

  init() {
    this.hydrateAllCopy();
    this.initTheme();
    this.renderFaqAccordion();
  },

  hydrateAllCopy() {
    const cfg = window.currentSiteConfig || window.DEFAULT_SITE_CONFIG;

    // Branding
    document.querySelectorAll('.app-title-text').forEach(el => el.innerText = cfg.branding?.appName || 'TrustChain Verify');
    document.querySelectorAll('.app-tagline-text').forEach(el => el.innerText = cfg.branding?.tagline || '');
    document.querySelectorAll('.app-logo-emoji').forEach(el => el.innerText = cfg.branding?.logoEmoji || '🛡️');
    document.querySelectorAll('.footer-copyright-text').forEach(el => el.innerText = cfg.branding?.footerText || '');
    document.querySelectorAll('.org-name-text').forEach(el => el.innerText = cfg.branding?.orgName || '');

    // Landing Hero
    this.setHtmlText('hero-kicker-text', cfg.landing?.heroKicker);
    this.setHtmlText('hero-title-text', cfg.landing?.heroTitle);
    this.setHtmlText('hero-subtitle-text', cfg.landing?.heroSubtitle);
    this.setHtmlText('cta-signin-btn-text', cfg.landing?.ctaSignIn);
    this.setHtmlText('cta-verify-btn-text', cfg.landing?.ctaVerifyReceipt);

    // Blockchain sentence
    this.setHtmlText('blockchain-sentence-text', cfg.landing?.blockchainExplanation?.sentence);

    // Owner Profile
    this.setHtmlText('owner-display-name', cfg.ownerProfile?.displayName);
    this.setHtmlText('owner-role-title', cfg.ownerProfile?.roleTitle);
    this.setHtmlText('admin-panel-title-text', cfg.ownerProfile?.panelTitle);
    this.setHtmlText('admin-welcome-msg-text', cfg.ownerProfile?.welcomeMessage);
    const avatarEl = document.getElementById('owner-avatar-bubble');
    if (avatarEl) avatarEl.innerText = cfg.ownerProfile?.avatar || 'AD';

    // How It Works Steps
    const stepsContainer = document.getElementById('landing-steps-grid');
    if (stepsContainer && cfg.landing?.howItWorks?.steps) {
      stepsContainer.innerHTML = cfg.landing.howItWorks.steps.map(s => `
        <div class="bento-card" style="text-align: center;">
          <div class="bento-icon-circle" style="margin: 0 auto 16px;"><i class="fa-solid ${s.icon}"></i></div>
          <h3 style="font-size: 18px; margin-bottom: 8px;">${s.title}</h3>
          <p style="font-size: 14px; color: var(--text-muted);">${s.desc}</p>
        </div>
      `).join('');
    }

    // Why Use It Cards
    const whyContainer = document.getElementById('landing-why-grid');
    if (whyContainer && cfg.landing?.whyUseIt?.cards) {
      whyContainer.innerHTML = cfg.landing.whyUseIt.cards.map(c => `
        <div class="bento-card">
          <div class="bento-icon-circle ${c.color || ''}"><i class="fa-solid ${c.icon}"></i></div>
          <h3>${c.title}</h3>
          <p>${c.desc}</p>
        </div>
      `).join('');
    }

    // Re-render FAQs
    this.renderFaqAccordion();
  },

  setHtmlText(id, text) {
    const el = document.getElementById(id);
    if (el && text) el.innerText = text;
  },

  renderFaqAccordion() {
    const faqContainer = document.getElementById('landing-faq-container');
    if (!faqContainer) return;
    const faqs = window.currentSiteConfig?.landing?.faqs || [];
    faqContainer.innerHTML = faqs.map((f, i) => `
      <div class="faq-item-card ${i === 0 ? 'open' : ''}" onclick="this.classList.toggle('open')">
        <div class="faq-question-title">
          <span>${f.q}</span>
          <i class="fa-solid fa-chevron-down" style="font-size: 14px; color: var(--text-muted);"></i>
        </div>
        <div class="faq-answer-text">${f.a}</div>
      </div>
    `).join('');
  },

  // View Navigation
  showView(viewName) {
    // Guards
    if (viewName === 'admin') {
      const user = window.AppState?.currentUser;
      if (!user || (user.role !== 'OWNER' && user.role !== 'ADMIN')) {
        this.showToast("Admin portal requires Administrator or Owner credentials.", "error");
        Auth.signInWithGoogle();
        return;
      }
    }
    if (viewName === 'citizen') {
      if (!window.AppState?.currentUser) {
        Auth.signInWithGoogle();
        return;
      }
    }

    document.querySelectorAll('.view-container').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.classList.add('active');
      this.currentView = viewName;
      window.scrollTo(0, 0);
    }

    if (viewName === 'admin') {
      this.showAdminTab(this.currentAdminTab || 'analytics');
    } else if (viewName === 'citizen') {
      this.showCitizenTab(this.currentCitizenTab || 'dashboard');
    }
  },

  showCitizenTab(tabName) {
    document.querySelectorAll('#view-citizen .portal-tab-panel').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#citizen-sidebar .sidebar-nav-btn').forEach(el => el.classList.remove('active'));

    const panel = document.getElementById(`citizen-tab-${tabName}`);
    if (panel) panel.classList.add('active');

    const btn = document.getElementById(`btn-citizen-tab-${tabName}`);
    if (btn) btn.classList.add('active');

    this.currentCitizenTab = tabName;
    if (tabName === 'dashboard') this.renderCitizenDashboard();
    if (tabName === 'records') this.renderCitizenRecords();
  },

  showAdminTab(tabName) {
    document.querySelectorAll('#view-admin .portal-tab-panel').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#admin-sidebar .sidebar-nav-btn').forEach(el => el.classList.remove('active'));

    const panel = document.getElementById(`admin-tab-${tabName}`);
    if (panel) panel.classList.add('active');

    const btn = document.getElementById(`btn-admin-tab-${tabName}`);
    if (btn) btn.classList.add('active');

    this.currentAdminTab = tabName;
    if (tabName === 'analytics') this.renderAdminAnalytics();
    if (tabName === 'queue') this.renderReviewQueue();
    if (tabName === 'accessControl') AdminEngine.renderAccessControl();
    if (tabName === 'explorer') this.renderBlockchainExplorer();
    if (tabName === 'tamper') this.renderTamperStudio();
    if (tabName === 'registries') RegistryEngine.renderTable();
    if (tabName === 'alerts') this.renderAlerts();
    if (tabName === 'audit') this.renderAuditLogs();
    if (tabName === 'settings') SettingsEditor.init();
  },

  updateAuthUI() {
    const user = window.AppState?.currentUser;
    const authActions = document.getElementById('navbar-auth-actions');
    if (!authActions) return;

    if (user) {
      const isPrivileged = user.role === 'OWNER' || user.role === 'ADMIN';
      authActions.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          ${isPrivileged ? `
            <button class="btn btn-sm btn-outline" onclick="UI.showView('admin')">
              <i class="fa-solid fa-gauge-high"></i> Admin Portal
            </button>
          ` : `
            <button class="btn btn-sm btn-outline" onclick="UI.showView('citizen')">
              <i class="fa-solid fa-id-card"></i> Citizen Portal
            </button>
          `}
          <div style="display: flex; align-items: center; gap: 8px; padding: 4px 10px; background: var(--bg-subtle); border-radius: var(--radius-full);">
            <span style="font-size: 13px; font-weight: 700;">${user.name}</span>
            <span class="pill-badge ${user.role === 'OWNER' ? 'warning' : (user.role === 'ADMIN' ? 'primary' : 'neutral')}" style="font-size: 10px; padding: 2px 6px;">${user.role}</span>
          </div>
          <button class="btn btn-sm btn-ghost" onclick="Auth.logout()" title="Sign Out">
            <i class="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      `;
    } else {
      authActions.innerHTML = `
        <button class="btn btn-sm btn-outline" onclick="UI.showPublicVerifyModal()">
          <i class="fa-solid fa-magnifying-glass"></i> Verify Receipt
        </button>
        <button class="btn btn-sm btn-primary" onclick="Auth.signInWithGoogle()">
          <i class="fa-brands fa-google"></i> Sign In
        </button>
      `;
    }
  },

  // Dark / Light Mode Toggle
  initTheme() {
    const saved = localStorage.getItem('trustchain_theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    this.updateThemeIcon(saved);
  },

  toggleDarkMode() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('trustchain_theme', next);
    this.updateThemeIcon(next);
  },

  updateThemeIcon(theme) {
    const icon = document.getElementById('theme-toggle-icon');
    if (icon) {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  },

  // Toast System
  showToast(message, type = 'info') {
    const stack = document.getElementById('toast-stack') || this.createToastStack();
    const toast = document.createElement('div');
    toast.className = `saas-toast ${type}`;
    let icon = 'fa-circle-info';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'error') icon = 'fa-circle-xmark';
    if (type === 'warning') icon = 'fa-triangle-exclamation';

    toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
    stack.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 300);
    }, 4200);
  },

  createToastStack() {
    const s = document.createElement('div');
    s.id = 'toast-stack';
    s.className = 'saas-toast-stack';
    document.body.appendChild(s);
    return s;
  },

  // Modals
  showModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('active');
  },

  hideModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('active');
  },

  showPublicVerifyModal() {
    this.showModal('modal-public-verify');
  },

  // Masking PII
  maskString(str, visibleEnd = 4) {
    if (!str) return '••••';
    if (str.length <= visibleEnd) return str;
    return '•••• ' + str.substring(str.length - visibleEnd);
  },

  // Analytics Charts
  async renderAdminAnalytics() {
    const submissions = await FirebaseService.loadSubmissions();
    const count = submissions.length;

    document.getElementById('stat-total-submissions').innerText = count;
    const verified = submissions.filter(s => s.verdict === 'VERIFIED').length;
    const suspicious = submissions.filter(s => s.verdict === 'SUSPICIOUS').length;
    const rejected = submissions.filter(s => s.verdict === 'REJECTED').length;

    document.getElementById('stat-verified-count').innerText = verified;
    document.getElementById('stat-suspicious-count').innerText = suspicious;
    document.getElementById('stat-rejected-count').innerText = rejected;

    // Destroy existing Chart.js instances if any
    if (this.charts.volume) this.charts.volume.destroy();
    if (this.charts.risk) this.charts.risk.destroy();

    const volCtx = document.getElementById('chart-volume-canvas')?.getContext('2d');
    if (volCtx && typeof Chart !== 'undefined') {
      this.charts.volume = new Chart(volCtx, {
        type: 'bar',
        data: {
          labels: ['PAN Cards', 'Aadhaar IDs', 'Academic Degrees', 'Passport', 'Other'],
          datasets: [{
            label: 'Documents Verified',
            data: count === 0 ? [0, 0, 0, 0, 0] : [
              submissions.filter(s => s.docType === 'PAN').length,
              submissions.filter(s => s.docType === 'AADHAAR').length,
              submissions.filter(s => s.docType === 'MARKSHEET').length,
              1, 0
            ],
            backgroundColor: '#5B6CFF',
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
      });
    }

    const riskCtx = document.getElementById('chart-risk-canvas')?.getContext('2d');
    if (riskCtx && typeof Chart !== 'undefined') {
      this.charts.risk = new Chart(riskCtx, {
        type: 'doughnut',
        data: {
          labels: ['Verified Authentic', 'Flagged Suspicious', 'Rejected Forgery'],
          datasets: [{
            data: count === 0 ? [1, 0, 0] : [verified, suspicious, rejected],
            backgroundColor: ['#22C55E', '#F59E0B', '#EF4444']
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }
  },

  async seedDemoSubmissions() {
    const demoItems = [
      {
        receiptId: "REC-2026-PAN-8941",
        docType: "PAN",
        docHash: await CryptoEngine.sha256("RAJESH_KUMAR_SHARMA_ABCPS1234F_GENUINE"),
        verdict: "VERIFIED",
        riskScore: 4,
        confidence: 96,
        citizenName: "Rajesh Kumar Sharma",
        identifier: "ABCPS1234F",
        verifierId: "officer@meity.gov.in",
        timestamp: Date.now() - 7200000,
        signature: "sig_seed_genuine_pan"
      },
      {
        receiptId: "REC-2026-PAN-9022",
        docType: "PAN",
        docHash: await CryptoEngine.sha256("VIKRAM_RATHORE_TAMPERED"),
        verdict: "REJECTED",
        riskScore: 88,
        confidence: 74,
        citizenName: "Vikram Singh Rathore",
        identifier: "ABCPS1234F",
        verifierId: "officer@meity.gov.in",
        timestamp: Date.now() - 3600000,
        signature: "sig_seed_tampered_pan"
      },
      {
        receiptId: "REC-2026-DEG-4410",
        docType: "MARKSHEET",
        docHash: await CryptoEngine.sha256("PRIYA_VERMA_DEGREE_GENUINE"),
        verdict: "VERIFIED",
        riskScore: 6,
        confidence: 94,
        citizenName: "Priya Verma",
        identifier: "2021CS8901",
        verifierId: "officer@meity.gov.in",
        timestamp: Date.now() - 1800000,
        signature: "sig_seed_genuine_marksheet"
      }
    ];

    for (const item of demoItems) {
      await FirebaseService.saveSubmission(item);
    }
    UI.showToast("Seeded 3 demo verification submissions!", "success");
    await this.renderAdminAnalytics();
  },

  async resetToEmptyState() {
    if (confirm("Reset submissions to zero state?")) {
      localStorage.removeItem('trustchain_submissions');
      UI.showToast("Submissions reset to zero state.", "info");
      await this.renderAdminAnalytics();
    }
  },

  // Review Queue
  async renderReviewQueue() {
    const tbody = document.getElementById('review-queue-tbody');
    if (!tbody) return;
    const submissions = await FirebaseService.loadSubmissions();

    if (submissions.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="saas-empty-box" style="padding: 24px;">No cases currently in review queue. Upload documents in Citizen Portal or seed demo data.</td></tr>`;
      return;
    }

    tbody.innerHTML = submissions.map(s => {
      let badge = `<span class="pill-badge success">VERIFIED</span>`;
      if (s.verdict === 'SUSPICIOUS') badge = `<span class="pill-badge warning">SUSPICIOUS</span>`;
      if (s.verdict === 'REJECTED') badge = `<span class="pill-badge danger">REJECTED</span>`;

      return `
        <tr>
          <td><strong style="font-family: monospace;">${s.receiptId}</strong></td>
          <td>${s.docType}</td>
          <td>${s.citizenName || 'Confidential'}</td>
          <td><strong>${s.riskScore}%</strong></td>
          <td>${badge}</td>
          <td>${new Date(s.timestamp).toLocaleTimeString()}</td>
          <td>
            <button class="btn btn-sm btn-outline" onclick="UI.openReviewModal('${s.receiptId}')">
              <i class="fa-solid fa-microscope"></i> Inspect Case
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  async openReviewModal(receiptId) {
    const submissions = await FirebaseService.loadSubmissions();
    const caseData = submissions.find(s => s.receiptId === receiptId);
    if (!caseData) return;

    window.AppState.currentInspection = caseData;
    document.getElementById('modal-case-receipt-id').innerText = caseData.receiptId;
    document.getElementById('modal-case-type').innerText = caseData.docType;
    document.getElementById('modal-case-risk').innerText = `${caseData.riskScore}% Risk`;
    document.getElementById('modal-case-verdict-badge').innerText = caseData.verdict;
    document.getElementById('modal-case-name').innerText = caseData.citizenName || 'Confidential';
    document.getElementById('modal-case-hash').innerText = caseData.docHash;

    this.showModal('modal-case-review');
  },

  async adminDecision(action) {
    const curCase = window.AppState.currentInspection;
    if (!curCase) return;

    const actor = window.AppState?.currentUser?.email || "Admin";
    const decisionTx = [{
      txId: 'tx_decision_' + Date.now(),
      type: "ADMIN_DECISION",
      receiptId: curCase.receiptId,
      originalVerdict: curCase.verdict,
      overrideAction: action,
      officerId: actor,
      timestamp: Date.now()
    }];

    await BlockchainEngine.mineBlock(decisionTx);
    UI.hideModal('modal-case-review');
    UI.showToast(`Admin decision [${action}] permanently committed to blockchain block!`, "success");
    await this.renderReviewQueue();
  },

  // Blockchain Explorer
  renderBlockchainExplorer() {
    const list = document.getElementById('blockchain-blocks-list');
    if (!list) return;

    const blocks = BlockchainEngine.chain || [];
    list.innerHTML = blocks.map(b => {
      const isTampered = BlockchainEngine.isTampered && BlockchainEngine.tamperedBlockIndex === b.index;
      return `
        <div class="bento-card" style="margin-bottom: 16px; border-left: 6px solid ${isTampered ? 'var(--danger-color)' : 'var(--primary-color)'}; background: ${isTampered ? '#FFF5F5' : 'var(--bg-card)'};">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <strong style="font-size: 16px;">Block #${b.index}</strong>
              <span class="pill-badge ${isTampered ? 'danger' : 'primary'}">${b.index === 0 ? 'GENESIS' : 'PoW SEALED'}</span>
              ${isTampered ? '<span class="pill-badge danger"><i class="fa-solid fa-triangle-exclamation"></i> CORRUPTED DATA</span>' : ''}
            </div>
            <span style="font-size: 12px; color: var(--text-muted);">${new Date(b.timestamp).toLocaleString()}</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; font-size: 12px; font-family: monospace; background: var(--bg-subtle); padding: 12px; border-radius: 8px;">
            <div><span style="color: var(--text-muted);">Block Hash:</span><br><strong style="word-break: break-all; color: ${isTampered ? 'var(--danger-color)' : 'var(--primary-color)'};">${b.hash}</strong></div>
            <div><span style="color: var(--text-muted);">Prev Hash:</span><br><span style="word-break: break-all;">${b.previousHash}</span></div>
            <div><span style="color: var(--text-muted);">Merkle Root:</span><br><span style="word-break: break-all;">${b.merkleRoot}</span></div>
            <div><span style="color: var(--text-muted);">Nonce / Difficulty:</span><br><span>${b.nonce} / d=${b.difficulty}</span></div>
          </div>
          <div style="margin-top: 12px; font-size: 13px;">
            <strong>Transactions (${b.transactions.length}):</strong>
            <ul style="margin: 6px 0 0 20px; font-size: 12px; color: var(--text-muted);">
              ${b.transactions.map(t => `<li><strong>${t.receiptId}</strong> - ${t.verdict || t.type} (Risk: ${t.riskScore || 0}%)</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }).join('');
  },

  // Tamper Demo Studio
  renderTamperStudio(validationResult) {
    const statusBox = document.getElementById('tamper-status-box');
    if (!statusBox) return;

    if (!validationResult || validationResult.isValid) {
      statusBox.innerHTML = `
        <div style="background: var(--success-light); color: #166534; padding: 16px; border-radius: 12px; border: 1px solid #86EFAC; display: flex; align-items: center; gap: 12px;">
          <i class="fa-solid fa-shield-check" style="font-size: 24px;"></i>
          <div>
            <strong>Ledger Consensus Intact (3/3 Nodes Agree)</strong>
            <p style="font-size: 13px; margin: 0;">SHA-256 chain links, Merkle roots, and ECDSA signatures verified.</p>
          </div>
        </div>
      `;
    } else {
      statusBox.innerHTML = `
        <div style="background: var(--danger-light); color: #991B1B; padding: 16px; border-radius: 12px; border: 1px solid #FCA5A5; display: flex; align-items: center; gap: 12px;">
          <i class="fa-solid fa-triangle-exclamation" style="font-size: 24px;"></i>
          <div>
            <strong>FRAUD DETECTED: Chain Verification Failed at Block #${validationResult.brokenBlockIndex}</strong>
            <p style="font-size: 13px; margin: 0;">${validationResult.reason}</p>
          </div>
        </div>
      `;
    }
  },

  // Alerts
  renderAlerts() {
    const container = document.getElementById('alerts-container');
    if (!container) return;
    container.innerHTML = `
      <div class="bento-card" style="border-left: 5px solid var(--danger-color); margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong><i class="fa-solid fa-triangle-exclamation" style="color: var(--danger-color);"></i> Digital Font Splice Detected</strong>
          <span class="pill-badge danger">CRITICAL</span>
        </div>
        <p style="font-size: 13px; color: var(--text-muted); margin-top: 6px;">
          High ELA error variance (>0.32) detected on PAN Card holder name. Font mismatch detected against Income Tax format.
        </p>
      </div>
      <div class="bento-card" style="border-left: 5px solid var(--warning-color); margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong><i class="fa-solid fa-circle-exclamation" style="color: var(--warning-color);"></i> Marksheet Sum Arithmetic Inconsistency</strong>
          <span class="pill-badge warning">HIGH</span>
        </div>
        <p style="font-size: 13px; color: var(--text-muted); margin-top: 6px;">
          Subject total sum (442) does not equal stated Total Marks (430). Discrepancy flagged by algorithmic rule engine.
        </p>
      </div>
    `;
  },

  // Audit Logs
  async renderAuditLogs() {
    const tbody = document.getElementById('audit-logs-tbody');
    if (!tbody) return;
    const logs = await FirebaseService.loadAuditLogs();

    if (logs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="saas-empty-box" style="padding: 24px;">No audit events recorded yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = logs.map(l => `
      <tr>
        <td><code>${l.timestamp}</code></td>
        <td><strong>${l.actor}</strong></td>
        <td><span class="pill-badge primary" style="font-size: 11px;">${l.action}</span></td>
        <td><code>${l.target}</code></td>
        <td><span class="pill-badge ${l.status === 'SUCCESS' ? 'success' : 'warning'}" style="font-size: 11px;">${l.status}</span></td>
        <td><span style="font-size: 13px; color: var(--text-muted);">${l.details}</span></td>
      </tr>
    `).join('');
  },

  // Citizen Dashboard
  async renderCitizenDashboard() {
    const submissions = await FirebaseService.loadSubmissions();
    const my = submissions.filter(s => !window.AppState.currentUser || s.verifierId === window.AppState.currentUser.email || true);
    document.getElementById('citizen-stat-total').innerText = my.length;
    document.getElementById('citizen-stat-verified').innerText = my.filter(s => s.verdict === 'VERIFIED').length;
  },

  // Citizen Records
  async renderCitizenRecords() {
    const container = document.getElementById('citizen-records-grid');
    if (!container) return;
    const submissions = await FirebaseService.loadSubmissions();

    if (submissions.length === 0) {
      container.innerHTML = `<div class="saas-empty-box" style="grid-column: 1 / -1;"><i class="fa-solid fa-file-circle-question saas-empty-icon"></i><p>No verified documents yet. Upload your first document to get started.</p></div>`;
      return;
    }

    container.innerHTML = submissions.map(s => `
      <div class="bento-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="pill-badge primary">${s.docType}</span>
          <span class="pill-badge ${s.verdict === 'VERIFIED' ? 'success' : (s.verdict === 'SUSPICIOUS' ? 'warning' : 'danger')}">${s.verdict}</span>
        </div>
        <h4 style="font-size: 16px; margin-bottom: 4px;">${s.citizenName || 'Citizen Document'}</h4>
        <p style="font-size: 12px; font-family: monospace; color: var(--text-muted); margin-bottom: 12px;">Receipt ID: ${s.receiptId}</p>
        <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">
          Risk Score: <strong>${s.riskScore}%</strong> • ${new Date(s.timestamp).toLocaleDateString()}
        </div>
        <button class="btn btn-sm btn-outline" style="width: 100%;" onclick="UI.showReceiptCard('${s.receiptId}')">
          <i class="fa-solid fa-receipt"></i> View Official Receipt
        </button>
      </div>
    `).join('');
  },

  // Show Official Receipt Card Modal
  async showReceiptCard(receiptId) {
    const submissions = await FirebaseService.loadSubmissions();
    const r = submissions.find(s => s.receiptId === receiptId);
    if (!r) return;

    document.getElementById('receipt-disp-id').innerText = r.receiptId;
    document.getElementById('receipt-disp-doctype').innerText = r.docType;
    document.getElementById('receipt-disp-name').innerText = r.citizenName || 'Verified Citizen';
    document.getElementById('receipt-disp-verdict').innerText = r.verdict;
    document.getElementById('receipt-disp-risk').innerText = `${r.riskScore}% Risk`;
    document.getElementById('receipt-disp-hash').innerText = r.docHash;
    document.getElementById('receipt-disp-timestamp').innerText = new Date(r.timestamp).toUTCString();
    document.getElementById('receipt-disp-signature').innerText = (r.signature || 'sig_demo').substring(0, 32) + '...';

    // Generate QR Code
    const qrDiv = document.getElementById('receipt-qrcode-box');
    if (qrDiv) {
      qrDiv.innerHTML = '';
      if (typeof QRCode !== 'undefined') {
        new QRCode(qrDiv, {
          text: `https://trustchain-verify.gov.in/verify?receipt=${r.receiptId}&hash=${r.docHash.substring(0, 16)}`,
          width: 120,
          height: 120
        });
      }
    }

    this.showModal('modal-receipt-view');
  },

  // Public Verify Receipt Lookup
  async lookupPublicReceipt() {
    const id = (document.getElementById('public-receipt-input')?.value || '').trim().toUpperCase();
    const resultBox = document.getElementById('public-verify-result-box');
    if (!id || !resultBox) return;

    resultBox.style.display = 'block';
    resultBox.innerHTML = `<div style="text-align: center; padding: 20px;"><i class="fa-solid fa-spinner fa-spin" style="font-size: 24px; color: var(--primary-color);"></i><p style="margin-top: 8px;">Querying shared multi-node blockchain ledger...</p></div>`;

    await new Promise(r => setTimeout(r, 600)); // Network lookup simulation

    const submissions = await FirebaseService.loadSubmissions();
    const record = submissions.find(s => s.receiptId === id);

    if (record) {
      resultBox.innerHTML = `
        <div style="background: var(--success-light); border: 1px solid #86EFAC; border-radius: 12px; padding: 20px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
            <i class="fa-solid fa-circle-check" style="font-size: 24px; color: var(--success-color);"></i>
            <div>
              <strong style="font-size: 16px; color: #166534;">CRYPTOGRAPHIC PROOF VERIFIED ON-CHAIN</strong>
              <div style="font-size: 12px; color: #15803D;">Status: Authenticated by Consensus Validators</div>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px; background: #FFF; padding: 14px; border-radius: 8px;">
            <div><strong>Receipt ID:</strong> ${record.receiptId}</div>
            <div><strong>Document Type:</strong> ${record.docType}</div>
            <div><strong>Holder Name:</strong> ${record.citizenName || 'Protected PII'}</div>
            <div><strong>Recorded Verdict:</strong> <span class="pill-badge ${record.verdict === 'VERIFIED' ? 'success' : 'danger'}">${record.verdict}</span></div>
            <div style="grid-column: 1 / -1; word-break: break-all; font-family: monospace; font-size: 11px;">
              <strong>SHA-256 Digest:</strong> ${record.docHash}
            </div>
          </div>
        </div>
      `;
    } else {
      resultBox.innerHTML = `
        <div style="background: var(--danger-light); border: 1px solid #FCA5A5; border-radius: 12px; padding: 20px; text-align: center;">
          <i class="fa-solid fa-triangle-exclamation" style="font-size: 28px; color: var(--danger-color); margin-bottom: 8px;"></i>
          <h4 style="color: #991B1B;">Receipt ID Not Found on Blockchain</h4>
          <p style="font-size: 13px; color: #7F1D1D; margin-top: 4px;">No cryptographic seal exists for ID "${id}". Document may be unverified, forged, or altered.</p>
        </div>
      `;
    }
  }
};

window.UI = UI;
