// ========================================
// OpenScholar — NGO: Invoices Review
// ========================================

import { invoices, schools, programs } from '../../data/mock.js';
import { icon } from '../../icons.js';

export function renderNGOInvoices() {
  const myInvoices = invoices.filter(i => i.ngoId === 'ngo-1');
  const pending = myInvoices.filter(i => i.status === 'pending');
  const approved = myInvoices.filter(i => i.status === 'approved');

  return `
    <div class="page-header animate-fade-in">
      <h1>Invoices & Receipts</h1>
      <p>Review school invoices, approve payments, and manage supporting documents</p>
    </div>

    <div class="tabs animate-fade-in">
      <button class="tab active" data-tab="pending">${icon('clock', 14)} Pending (${pending.length})</button>
      <button class="tab" data-tab="approved">${icon('check-circle', 14)} Approved (${approved.length})</button>
      <button class="tab" data-tab="receipts">${icon('paperclip', 14)} Receipts & Proof</button>
    </div>

    <!-- Pending Invoices -->
    <div id="tab-pending" class="animate-fade-in-up">
      ${pending.length === 0 ? `
        <div class="empty-state">
          ${icon('file-text', 48)}
          <h3>No Pending Invoices</h3>
          <p>All invoices have been reviewed</p>
        </div>
      ` : pending.map(inv => {
    const prog = programs.find(p => p.id === inv.programId);
    return `
        <div class="card" style="margin-bottom: var(--space-5);">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: var(--space-5);">
            <div>
              <h3 style="font-size: var(--font-lg); font-weight: 700;">${inv.schoolName}</h3>
              <p style="font-size: var(--font-sm); color: var(--text-secondary); margin-top: var(--space-1);">Program: ${prog?.name || 'N/A'} · Category: ${inv.category}</p>
              <p style="font-size: var(--font-xs); color: var(--text-tertiary); margin-top: var(--space-1);">${icon('calendar', 12)} Submitted: ${new Date(inv.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div style="text-align: right;">
              <div style="font-size: var(--font-2xl); font-weight: 800; color: var(--text-primary);">$${inv.amount.toLocaleString()}</div>
              <span class="badge badge-pending">${icon('clock', 12)} Pending Review</span>
            </div>
          </div>
          <div style="background: var(--surface-secondary); border-radius: var(--radius-md); padding: var(--space-4); margin-bottom: var(--space-5);">
            <div style="font-size: var(--font-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-tertiary); margin-bottom: var(--space-3);">Line Items</div>
            ${inv.items.map(item => `
              <div style="display: flex; justify-content: space-between; padding: var(--space-2) 0; font-size: var(--font-sm);">
                <span>${item.desc}</span>
                <strong>$${item.amount.toLocaleString()}</strong>
              </div>
            `).join('')}
          </div>
          <div style="display: flex; gap: var(--space-3);">
            <button class="btn btn-primary">${icon('check', 16)} Approve</button>
            <button class="btn btn-danger">${icon('x', 16)} Reject</button>
            <button class="btn btn-secondary">${icon('message-square', 16)} Request Info</button>
          </div>
        </div>
        `;
  }).join('')}
    </div>

    <!-- Approved Invoices -->
    <div id="tab-approved" style="display: none;">
      <div class="table-wrapper animate-fade-in-up">
        <table class="data-table">
          <thead><tr><th>School</th><th>Category</th><th>Amount</th><th>Submitted</th><th>Approved</th><th>Status</th></tr></thead>
          <tbody>
            ${approved.map(inv => `
              <tr>
                <td style="font-weight: 500;">${inv.schoolName}</td>
                <td><span class="badge" style="background: var(--navy-100); color: var(--navy-600);">${inv.category}</span></td>
                <td style="font-weight: 700;">$${inv.amount.toLocaleString()}</td>
                <td style="font-size: var(--font-sm);">${new Date(inv.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                <td style="font-size: var(--font-sm);">${new Date(inv.approvedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                <td><span class="badge badge-verified">${icon('check-circle', 12)} Approved</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Receipts & Proof -->
    <div id="tab-receipts" style="display: none;" class="animate-fade-in-up">
      <div class="card">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-5);">
          <h2 style="font-size: var(--font-lg); font-weight: 700;">Uploaded Documents</h2>
          <button class="btn btn-primary btn-sm">${icon('upload', 14)} Upload Document</button>
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          <div class="doc-preview">
            <div class="doc-icon">${icon('file-text', 20)}</div>
            <div class="doc-info">
              <strong>Receipt_Tuition_SJS_Feb2026.pdf</strong>
              <span>Payment receipt for Shree Janapriya School tuition</span>
            </div>
            <span class="badge badge-verified">${icon('check-circle', 12)} Verified</span>
          </div>
          <div class="doc-preview">
            <div class="doc-icon">${icon('image', 20)}</div>
            <div class="doc-info">
              <strong>Photo_BookDistribution_March2026.jpg</strong>
              <span>Book distribution event photo evidence</span>
            </div>
            <span class="badge badge-verified">${icon('check-circle', 12)} Verified</span>
          </div>
          <div class="doc-preview">
            <div class="doc-icon">${icon('file-text', 20)}</div>
            <div class="doc-info">
              <strong>Invoice_Uniforms_SJS_March2026.pdf</strong>
              <span>Uniform purchase from verified vendor</span>
            </div>
            <span class="badge badge-pending">${icon('clock', 12)} Pending</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindNGOInvoicesEvents() {
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
