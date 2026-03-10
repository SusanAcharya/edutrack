// ========================================
// OpenScholar — Donor: Track Funds
// ========================================

import { donations, ngos, programs, students } from '../../data/mock.js';
import { icon } from '../../icons.js';

export function renderDonorTrack() {
  const myDonations = donations.filter(d => d.donorId === 'donor-1');
  const totalDonated = myDonations.reduce((acc, d) => acc + d.amount, 0);

  return `
    <div class="page-header animate-fade-in">
      <h1>Track Your Donations</h1>
      <p>See exactly where your donations are being allocated and utilized</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card animate-fade-in stagger-1">
        <div class="stat-icon emerald">${icon('dollar-sign', 22)}</div>
        <div class="stat-info">
          <h3>$${totalDonated.toLocaleString()}</h3>
          <p>Total Donated</p>
        </div>
      </div>
      <div class="stat-card animate-fade-in stagger-2">
        <div class="stat-icon blue">${icon('layers', 22)}</div>
        <div class="stat-info">
          <h3>${myDonations.length}</h3>
          <p>Donations Made</p>
        </div>
      </div>
      <div class="stat-card animate-fade-in stagger-3">
        <div class="stat-icon amber">${icon('graduation-cap', 22)}</div>
        <div class="stat-info">
          <h3>12</h3>
          <p>Students Impacted</p>
        </div>
      </div>
    </div>

    <!-- Donation History -->
    <div class="card animate-fade-in-up" style="margin-bottom: var(--space-8);">
      <h2 style="font-size: var(--font-xl); font-weight: 700; margin-bottom: var(--space-5);">Donation History</h2>
      <div class="table-wrapper" style="border: none;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Recipient</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${myDonations.map(d => {
    const ngo = ngos.find(n => n.id === d.ngoId);
    const prog = d.programId ? programs.find(p => p.id === d.programId) : null;
    const stu = d.studentId ? students.find(s => s.id === d.studentId) : null;
    const recipient = stu ? stu.name : (prog ? prog.name : ngo?.name);
    return `
                <tr>
                  <td>${new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td>
                    <div class="table-user">
                      <div class="table-avatar" style="background: ${ngo?.color || '#10b981'}; width: 32px; height: 32px; font-size: var(--font-xs);">${(ngo?.avatar || 'N')}</div>
                      <div class="table-user-info">
                        <strong>${recipient}</strong>
                        <span>${ngo?.name || ''}</span>
                      </div>
                    </div>
                  </td>
                  <td><span class="badge badge-${d.type === 'program' ? 'active' : d.type === 'student' ? 'verified' : 'pending'}">${d.type}</span></td>
                  <td style="font-weight: 700;">$${d.amount.toLocaleString()}</td>
                  <td><span class="badge badge-verified">${icon('check-circle', 12)} Allocated</span></td>
                </tr>
              `;
  }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Fund Allocation Breakdown -->
    <div class="card animate-fade-in-up" style="margin-bottom: var(--space-8);">
      <h2 style="font-size: var(--font-xl); font-weight: 700; margin-bottom: var(--space-2);">Where Your Funds Went</h2>
      <p style="font-size: var(--font-sm); color: var(--text-secondary); margin-bottom: var(--space-6);">
        Transparent breakdown of how your donations were allocated
      </p>

      <div class="allocation-card" style="border: none; padding: 0;">
        <div class="allocation-item">
          <div style="display: flex; align-items: center; gap: var(--space-2);">${icon('book-open', 18)}</div>
          <div class="allocation-item-label">Tuition Fees</div>
          <div class="allocation-item-bar">
            <div class="progress-bar"><div class="progress-bar-fill emerald" style="width: 45%;"></div></div>
          </div>
          <div class="allocation-item-amount">$3,375</div>
        </div>
        <div class="allocation-item">
          <div style="display: flex; align-items: center; gap: var(--space-2);">${icon('book-open', 18)}</div>
          <div class="allocation-item-label">Books & Stationery</div>
          <div class="allocation-item-bar">
            <div class="progress-bar"><div class="progress-bar-fill blue" style="width: 25%;"></div></div>
          </div>
          <div class="allocation-item-amount">$1,875</div>
        </div>
        <div class="allocation-item">
          <div style="display: flex; align-items: center; gap: var(--space-2);">${icon('shirt', 18)}</div>
          <div class="allocation-item-label">Uniforms</div>
          <div class="allocation-item-bar">
            <div class="progress-bar"><div class="progress-bar-fill amber" style="width: 20%;"></div></div>
          </div>
          <div class="allocation-item-amount">$1,500</div>
        </div>
        <div class="allocation-item">
          <div style="display: flex; align-items: center; gap: var(--space-2);">${icon('utensils-crossed', 18)}</div>
          <div class="allocation-item-label">Food & Transport</div>
          <div class="allocation-item-bar">
            <div class="progress-bar"><div class="progress-bar-fill emerald" style="width: 10%;"></div></div>
          </div>
          <div class="allocation-item-amount">$750</div>
        </div>
      </div>
    </div>

    <!-- Proof Documents -->
    <div class="card animate-fade-in-up">
      <h3 style="font-size: var(--font-lg); font-weight: 600; margin-bottom: var(--space-5);">${icon('paperclip', 18)} Supporting Documents</h3>
      <div style="display: flex; flex-direction: column; gap: var(--space-3);">
        <div class="doc-preview">
          <div class="doc-icon">${icon('file-text', 20)}</div>
          <div class="doc-info">
            <strong>Tuition_Receipt_Feb2026.pdf</strong>
            <span>Shree Janapriya School · Feb 5, 2026</span>
          </div>
          <button class="btn btn-secondary btn-sm">${icon('eye', 14)} View</button>
        </div>
        <div class="doc-preview">
          <div class="doc-icon">${icon('file-text', 20)}</div>
          <div class="doc-info">
            <strong>Books_Purchase_Invoice.pdf</strong>
            <span>Bright Future Foundation · Feb 12, 2026</span>
          </div>
          <button class="btn btn-secondary btn-sm">${icon('eye', 14)} View</button>
        </div>
        <div class="doc-preview">
          <div class="doc-icon">${icon('image', 20)}</div>
          <div class="doc-info">
            <strong>Uniform_Distribution_Photo.jpg</strong>
            <span>Bright Future Foundation · Feb 20, 2026</span>
          </div>
          <button class="btn btn-secondary btn-sm">${icon('eye', 14)} View</button>
        </div>
      </div>
    </div>
  `;
}
