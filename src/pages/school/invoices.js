// ========================================
// EduTrack — School: Invoices
// ========================================

import { invoices as allInvoices, programs, ngos } from '../../data/mock.js';
import { icon } from '../../icons.js';

export function renderSchoolInvoices() {
  const myInvoices = allInvoices.filter(i => i.schoolId === 'school-1');
  const totalInvoiced = myInvoices.reduce((a, i) => a + i.amount, 0);
  const approved = myInvoices.filter(i => i.status === 'approved');
  const pending = myInvoices.filter(i => i.status === 'pending');

  return `
    <div class="page-header animate-fade-in">
      <h1>Invoice Management</h1>
      <p>Create and submit invoices to NGOs for scholarship-related expenses</p>
      <div class="page-header-actions">
        <button class="btn btn-primary" id="create-invoice-btn">${icon('file-plus', 16)} Create Invoice</button>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card animate-fade-in stagger-1">
        <div class="stat-icon emerald">${icon('dollar-sign', 22)}</div>
        <div class="stat-info">
          <h3>$${totalInvoiced.toLocaleString()}</h3>
          <p>Total Invoiced</p>
        </div>
      </div>
      <div class="stat-card animate-fade-in stagger-2">
        <div class="stat-icon blue">${icon('check-circle', 22)}</div>
        <div class="stat-info">
          <h3>${approved.length}</h3>
          <p>Approved</p>
        </div>
      </div>
      <div class="stat-card animate-fade-in stagger-3">
        <div class="stat-icon amber">${icon('clock', 22)}</div>
        <div class="stat-info">
          <h3>${pending.length}</h3>
          <p>Pending</p>
        </div>
      </div>
    </div>

    <!-- Invoices Table -->
    <div class="table-wrapper animate-fade-in-up" style="margin-bottom: var(--space-8);">
      <table class="data-table">
        <thead><tr><th>Invoice</th><th>NGO / Program</th><th>Category</th><th>Amount</th><th>Submitted</th><th>Status</th></tr></thead>
        <tbody>
          ${myInvoices.map(inv => {
    const ngo = ngos.find(n => n.id === inv.ngoId);
    const prog = programs.find(p => p.id === inv.programId);
    return `
              <tr>
                <td>
                  <strong style="font-size: var(--font-sm);">#${inv.id.toUpperCase()}</strong>
                  <div style="font-size: var(--font-xs); color: var(--text-tertiary);">${inv.items.length} line items</div>
                </td>
                <td>
                  <div style="font-size: var(--font-sm); font-weight: 500;">${ngo?.name || 'N/A'}</div>
                  <div style="font-size: var(--font-xs); color: var(--text-tertiary);">${prog?.name || 'General'}</div>
                </td>
                <td><span class="badge" style="background: var(--navy-100); color: var(--navy-600);">${inv.category}</span></td>
                <td style="font-weight: 700;">$${inv.amount.toLocaleString()}</td>
                <td style="font-size: var(--font-sm);">${new Date(inv.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td>
                  <span class="badge badge-${inv.status === 'approved' ? 'verified' : 'pending'}">
                    ${inv.status === 'approved' ? `${icon('check-circle', 12)} Approved` : `${icon('clock', 12)} Pending`}
                  </span>
                </td>
              </tr>
            `;
  }).join('')}
        </tbody>
      </table>
    </div>

    <!-- Create Invoice Modal -->
    <div id="create-invoice-modal" style="display: none;">
      <div class="modal-overlay" onclick="if(event.target===this)document.getElementById('create-invoice-modal').style.display='none'">
        <div class="modal" style="max-width: 640px;">
          <div class="modal-header">
            <h2>${icon('file-plus', 20)} Create New Invoice</h2>
            <button class="modal-close" onclick="document.getElementById('create-invoice-modal').style.display='none'">${icon('x', 18)}</button>
          </div>
          <div class="modal-body">
            <div class="form-group"><label class="form-label">Submit To (NGO)</label><select class="form-select"><option>Bright Future Foundation</option><option>EduHope International</option><option>Nepal Education Alliance</option></select></div>
            <div class="form-group"><label class="form-label">Program</label><select class="form-select"><option>Girls Education Program 2026</option><option>STEM Scholarship 2025</option></select></div>
            <div class="form-group"><label class="form-label">Category</label><select class="form-select"><option>Tuition</option><option>Books</option><option>Uniforms</option><option>Food</option><option>Transport</option><option>Lab Equipment</option></select></div>
            <div style="margin-bottom: var(--space-5);">
              <label class="form-label">Line Items</label>
              <div id="line-items" style="display: flex; flex-direction: column; gap: var(--space-3);">
                <div style="display: flex; gap: var(--space-3);"><input class="form-input" type="text" placeholder="Description" style="flex: 2;" /><input class="form-input" type="number" placeholder="Amount" style="flex: 1;" /></div>
                <div style="display: flex; gap: var(--space-3);"><input class="form-input" type="text" placeholder="Description" style="flex: 2;" /><input class="form-input" type="number" placeholder="Amount" style="flex: 1;" /></div>
              </div>
              <button class="btn btn-secondary btn-sm" style="margin-top: var(--space-2);">${icon('plus', 14)} Add Line Item</button>
            </div>
            <div class="form-group">
              <label class="form-label">Supporting Document</label>
              <div style="border: 2px dashed var(--border-light); border-radius: var(--radius-md); padding: var(--space-4); text-align: center; cursor: pointer;">
                <p style="font-size: var(--font-sm); color: var(--text-secondary);">${icon('paperclip', 16)} Attach invoice document (PDF, JPG)</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="document.getElementById('create-invoice-modal').style.display='none'">Cancel</button>
            <button class="btn btn-primary">${icon('send', 16)} Submit Invoice</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindSchoolInvoicesEvents() {
  const createBtn = document.getElementById('create-invoice-btn');
  const modal = document.getElementById('create-invoice-modal');
  if (createBtn && modal) {
    createBtn.addEventListener('click', () => modal.style.display = 'block');
  }
}
