// ========================================
// OpenScholar — System Admin: Verify NGOs
// ========================================

import { ngos } from '../../data/mock.js';
import { icon } from '../../icons.js';

export function renderVerifyNGOs() {
  const pendingNgos = ngos.filter(n => n.status === 'pending');
  const allNgos = ngos;

  return `
    <div class="page-header animate-fade-in">
      <h1>NGO Verification</h1>
      <p>Review submitted documents and verify or reject NGO registrations</p>
    </div>

    <div class="tabs animate-fade-in">
      <button class="tab active" data-tab="pending-ngos">${icon('clock', 14)} Pending (${pendingNgos.length})</button>
      <button class="tab" data-tab="all-ngos">${icon('building-2', 14)} All NGOs (${allNgos.length})</button>
    </div>

    <!-- Pending NGOs -->
    <div id="tab-pending-ngos" class="animate-fade-in-up">
      ${pendingNgos.length === 0 ? `
        <div class="empty-state">
          ${icon('shield-check', 48)}
          <h3>All Caught Up</h3>
          <p>No NGOs pending verification</p>
        </div>
      ` : pendingNgos.map(ngo => `
        <div class="card" style="margin-bottom: var(--space-5);">
          <div style="display: flex; align-items: flex-start; gap: var(--space-5);">
            <div class="ngo-card-avatar" style="background: ${ngo.color}; width: 64px; height: 64px; font-size: 1.75rem;">${ngo.avatar}</div>
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2);">
                <h3 style="font-size: var(--font-xl); font-weight: 700;">${ngo.name}</h3>
                <span class="badge badge-pending">${icon('clock', 12)} Pending</span>
              </div>
              <p style="font-size: var(--font-sm); color: var(--text-secondary); margin-bottom: var(--space-3);">
                ${icon('map-pin', 14)} ${ngo.location} · Registered: ${new Date(ngo.registeredDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <p style="font-size: var(--font-sm); color: var(--text-secondary); line-height: 1.7; margin-bottom: var(--space-5);">
                ${ngo.description}
              </p>

              <!-- Submitted Documents -->
              <div style="margin-bottom: var(--space-5);">
                <div style="font-size: var(--font-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-tertiary); margin-bottom: var(--space-3);">Submitted Documents</div>
                <div style="display: flex; flex-direction: column; gap: var(--space-2);">
                  <div class="doc-preview">
                    <div class="doc-icon">${icon('file-text', 20)}</div>
                    <div class="doc-info">
                      <strong>${ngo.taxDoc}</strong>
                      <span>Latest Tax Clearance Document</span>
                    </div>
                    <button class="btn btn-secondary btn-sm">${icon('eye', 14)} Review</button>
                  </div>
                  <div class="doc-preview">
                    <div class="doc-icon">${icon('file-text', 20)}</div>
                    <div class="doc-info">
                      <strong>${ngo.regDoc}</strong>
                      <span>Company Registration Certificate</span>
                    </div>
                    <button class="btn btn-secondary btn-sm">${icon('eye', 14)} Review</button>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div style="display: flex; gap: var(--space-3);">
                <button class="btn btn-primary">${icon('shield-check', 16)} Verify & Approve</button>
                <button class="btn btn-danger">${icon('x-circle', 16)} Reject</button>
                <button class="btn btn-secondary">${icon('message-square', 16)} Request More Info</button>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- All NGOs -->
    <div id="tab-all-ngos" style="display: none;">
      <div class="table-wrapper animate-fade-in-up">
        <table class="data-table">
          <thead><tr><th>Organization</th><th>Location</th><th>Registered</th><th>Status</th><th>Total Funded</th><th>Actions</th></tr></thead>
          <tbody>
            ${allNgos.map(ngo => `
              <tr>
                <td>
                  <div class="table-user">
                    <div class="table-avatar" style="background: ${ngo.color};">${ngo.avatar}</div>
                    <div class="table-user-info">
                      <strong>${ngo.name}</strong>
                      <span>${ngo.programsCount} programs</span>
                    </div>
                  </div>
                </td>
                <td style="font-size: var(--font-sm);">${ngo.location}</td>
                <td style="font-size: var(--font-sm);">${new Date(ngo.registeredDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</td>
                <td><span class="badge badge-${ngo.status === 'verified' ? 'verified' : ngo.status === 'pending' ? 'pending' : 'rejected'}">${ngo.status}</span></td>
                <td style="font-weight: 600;">${ngo.totalFunded > 0 ? '$' + ngo.totalFunded.toLocaleString() : '—'}</td>
                <td><button class="btn btn-secondary btn-sm">${icon('eye', 14)} View</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function bindVerifyNGOsEvents() {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabName = tab.dataset.tab;
      document.querySelectorAll('[id^="tab-"]').forEach(panel => {
        panel.style.display = panel.id === `tab-${tabName}` ? 'block' : 'none';
      });
    });
  });
}
