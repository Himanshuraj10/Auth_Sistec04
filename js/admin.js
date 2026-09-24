/**
 * TrustChain Verify - Admin Management & Access Control Engine
 * User permissions, Pre-authorization, Registration modes, Review queue, and Audit logs.
 */

const AdminEngine = {
  currentRoleFilter: 'ALL',
  usersPage: 1,
  pageSize: 10,

  async init() {
    await this.renderAccessControl();
  },

  async renderAccessControl() {
    const tbody = document.getElementById('access-control-users-tbody');
    if (!tbody) return;

    const users = await FirebaseService.loadUsers();
    const preAuthorized = await FirebaseService.loadPreAuthorizedEmails();
    const config = window.currentSiteConfig || window.DEFAULT_SITE_CONFIG;

    // Filter by role & search term
    const search = (document.getElementById('access-search-input')?.value || '').toLowerCase();
    let filtered = users.filter(u => {
      const matchSearch = u.email.toLowerCase().includes(search) || (u.name || '').toLowerCase().includes(search);
      const matchRole = this.currentRoleFilter === 'ALL' || u.role === this.currentRoleFilter;
      return matchSearch && matchRole;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="saas-empty-box" style="padding: 24px;">No Google accounts found matching this filter.</td></tr>`;
      return;
    }

    const ownerEmail = (window.OWNER_EMAIL || "owner@demo.in").toLowerCase();

    tbody.innerHTML = filtered.map(u => {
      const isOwner = u.email.toLowerCase() === ownerEmail;
      const avatarHtml = u.photoUrl ? 
        `<img src="${u.photoUrl}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">` :
        `<div style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary-light); color: var(--primary-color); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px;">${(u.name || u.email)[0].toUpperCase()}</div>`;

      let roleBadge = `<span class="pill-badge primary">USER</span>`;
      if (u.role === 'OWNER') roleBadge = `<span class="pill-badge" style="background: var(--accent-light); color: var(--accent-color);">OWNER</span>`;
      if (u.role === 'ADMIN') roleBadge = `<span class="pill-badge" style="background: var(--secondary-light); color: var(--secondary-color);">ADMIN</span>`;

      let statusBadge = u.status === 'BLOCKED' ? 
        `<span class="pill-badge danger">BLOCKED</span>` :
        (u.status === 'PENDING' ? `<span class="pill-badge warning">PENDING APPROVAL</span>` : `<span class="pill-badge success">ACTIVE</span>`);

      let actionButtons = '';
      if (isOwner) {
        actionButtons = `<span style="font-size: 12px; color: var(--text-muted);"><i class="fa-solid fa-lock"></i> Permanent Owner</span>`;
      } else {
        const canPromote = u.role === 'USER';
        const isBlocked = u.status === 'BLOCKED';
        actionButtons = `
          <div style="display: flex; gap: 6px;">
            ${u.status === 'PENDING' ? `
              <button class="btn btn-sm btn-primary" onclick="AdminEngine.approveUser('${u.email}')" title="Approve Registration">
                <i class="fa-solid fa-check"></i> Approve
              </button>
            ` : ''}
            ${canPromote ? `
              <button class="btn btn-sm btn-outline" onclick="AdminEngine.changeRole('${u.email}', 'ADMIN')" title="Promote to Admin">
                <i class="fa-solid fa-shield"></i> Make Admin
              </button>
            ` : `
              <button class="btn btn-sm btn-outline" onclick="AdminEngine.changeRole('${u.email}', 'USER')" title="Demote to User">
                <i class="fa-solid fa-user"></i> Remove Admin
              </button>
            `}
            <button class="btn btn-sm ${isBlocked ? 'btn-outline' : 'btn-ghost'}" onclick="AdminEngine.toggleBlock('${u.email}')" title="${isBlocked ? 'Unblock' : 'Block'}">
              <i class="fa-solid ${isBlocked ? 'fa-unlock' : 'fa-ban'}"></i>
            </button>
            <button class="btn btn-sm btn-ghost" onclick="AdminEngine.deleteUserAccount('${u.email}')" title="Remove Account">
              <i class="fa-solid fa-trash" style="color: var(--danger-color);"></i>
            </button>
          </div>
        `;
      }

      return `
        <tr>
          <td><div style="display: flex; align-items: center; gap: 10px;">${avatarHtml} <strong>${u.name || 'Citizen'}</strong></div></td>
          <td><code>${u.email}</code></td>
          <td>${roleBadge}</td>
          <td>${statusBadge}</td>
          <td>${u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : 'Never'}</td>
          <td><span style="font-size: 12px; color: var(--text-muted);">${u.addedBy || 'Direct'}</span></td>
          <td>${actionButtons}</td>
        </tr>
      `;
    }).join('');

    // Update Registration Mode Radio selection
    const regMode = config.systemSettings?.registrationMode || 'open';
    const radio = document.querySelector(`input[name="regModeRadio"][value="${regMode}"]`);
    if (radio) radio.checked = true;

    // Update Allowed / Blocked list inputs
    const allowedInput = document.getElementById('setting-allowed-domains');
    if (allowedInput && config.systemSettings?.allowedDomains) {
      allowedInput.value = config.systemSettings.allowedDomains.join(', ');
    }
    const blockedDomInput = document.getElementById('setting-blocked-domains');
    if (blockedDomInput && config.systemSettings?.blockedDomains) {
      blockedDomInput.value = config.systemSettings.blockedDomains.join(', ');
    }
  },

  async handlePreAuthorizeForm(event) {
    event.preventDefault();
    const emailsText = (document.getElementById('preauth-emails-input')?.value || '').trim();
    const role = document.getElementById('preauth-role-select')?.value || 'USER';

    if (!emailsText) {
      UI.showToast("Please enter at least one Google email address.", "warning");
      return;
    }

    const emails = emailsText.split(/[\n,;]+/).map(e => e.trim().toLowerCase()).filter(e => e.includes('@'));
    if (emails.length === 0) {
      UI.showToast("No valid email addresses detected.", "error");
      return;
    }

    const addedBy = window.AppState?.currentUser?.email || "Admin";
    for (const email of emails) {
      await FirebaseService.addPreAuthorizedEmail({
        email,
        role,
        addedBy,
        createdAt: Date.now()
      });
      // Also register or update in users collection
      await FirebaseService.saveUser({
        id: email.replace(/[@.]/g, '_'),
        email,
        name: email.split('@')[0],
        role,
        status: 'ACTIVE',
        addedBy,
        createdAt: Date.now()
      });
    }

    await FirebaseService.appendAuditLog({
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: addedBy,
      action: "PRE_AUTHORIZE",
      target: "ACCESS_CONTROL",
      status: "SUCCESS",
      details: `Pre-authorized ${emails.length} email(s) with role: ${role}`
    });

    document.getElementById('preauth-emails-input').value = '';
    UI.hideModal('modal-preauthorize');
    await this.renderAccessControl();
    UI.showToast(`Successfully authorized ${emails.length} Google account(s) as ${role}.`, "success");
  },

  async changeRole(email, newRole) {
    const actor = window.AppState?.currentUser?.email || "Admin";
    if (confirm(`Are you sure you want to change role for ${email} to ${newRole}?`)) {
      await FirebaseService.updateUserRole(email, newRole, actor);
      await FirebaseService.appendAuditLog({
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        actor,
        action: "ROLE_CHANGE",
        target: email,
        status: "SUCCESS",
        details: `Promoted/Changed role of ${email} to ${newRole}`
      });
      await this.renderAccessControl();
      UI.showToast(`Updated ${email} to ${newRole}`, "success");
    }
  },

  async toggleBlock(email) {
    const users = await FirebaseService.loadUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return;

    const newStatus = user.status === 'BLOCKED' ? 'ACTIVE' : 'BLOCKED';
    const actor = window.AppState?.currentUser?.email || "Admin";

    if (confirm(`Confirm ${newStatus === 'BLOCKED' ? 'blocking' : 'unblocking'} access for ${email}?`)) {
      await FirebaseService.updateUserStatus(email, newStatus);
      await FirebaseService.appendAuditLog({
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        actor,
        action: "STATUS_CHANGE",
        target: email,
        status: "SUCCESS",
        details: `Changed status of ${email} to ${newStatus}`
      });
      await this.renderAccessControl();
      UI.showToast(`Account ${email} is now ${newStatus}`, "info");
    }
  },

  async approveUser(email) {
    const actor = window.AppState?.currentUser?.email || "Admin";
    await FirebaseService.updateUserStatus(email, 'ACTIVE');
    await FirebaseService.appendAuditLog({
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor,
      action: "USER_APPROVED",
      target: email,
      status: "SUCCESS",
      details: `Approved registration for ${email}`
    });
    await this.renderAccessControl();
    UI.showToast(`Approved registration for ${email}`, "success");
  },

  async deleteUserAccount(email) {
    const actor = window.AppState?.currentUser?.email || "Admin";
    if (confirm(`Permanently remove ${email} from access list?`)) {
      await FirebaseService.deleteUser(email);
      await FirebaseService.appendAuditLog({
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        actor,
        action: "USER_DELETED",
        target: email,
        status: "SUCCESS",
        details: `Deleted user record for ${email}`
      });
      await this.renderAccessControl();
      UI.showToast(`Removed ${email} from user database`, "info");
    }
  },

  async updateRegistrationMode(mode) {
    const config = window.currentSiteConfig || window.DEFAULT_SITE_CONFIG;
    config.systemSettings = config.systemSettings || {};
    config.systemSettings.registrationMode = mode;
    await FirebaseService.saveSiteConfig(config);
    UI.showToast(`Registration mode set to: ${mode.toUpperCase()}`, "success");
  },

  async saveAccessDomainsSettings() {
    const config = window.currentSiteConfig || window.DEFAULT_SITE_CONFIG;
    config.systemSettings = config.systemSettings || {};

    const allowed = (document.getElementById('setting-allowed-domains')?.value || '')
      .split(',').map(d => d.trim().toLowerCase()).filter(Boolean);
    const blocked = (document.getElementById('setting-blocked-domains')?.value || '')
      .split(',').map(d => d.trim().toLowerCase()).filter(Boolean);

    config.systemSettings.allowedDomains = allowed;
    config.systemSettings.blockedDomains = blocked;

    await FirebaseService.saveSiteConfig(config);
    UI.showToast("Domain security rules updated successfully.", "success");
  }
};

window.AdminEngine = AdminEngine;
