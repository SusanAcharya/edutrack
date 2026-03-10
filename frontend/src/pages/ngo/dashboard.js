// ========================================
// OpenScholar — NGO: Dashboard
// ========================================

import { programs, students, invoices, donations, ngos } from '../../data/mock.js';
import { icon } from '../../icons.js';

export function renderNGODashboard() {
  const ngo = ngos.find(n => n.id === 'ngo-1');
  const myPrograms = programs.filter(p => p.ngoId === 'ngo-1');
  const myStudents = students.filter(s => s.ngoId === 'ngo-1');
  const myInvoices = invoices.filter(i => i.ngoId === 'ngo-1');
  const myDonations = donations.filter(d => d.ngoId === 'ngo-1');
  const totalReceived = myDonations.reduce((a, d) => a + d.amount, 0);
  const totalAllocated = myPrograms.reduce((a, p) => a + p.allocated, 0);
  const pendingInvoices = myInvoices.filter(i => i.status === 'pending').length;

  return `
    <div class="page-header animate-fade-in">
      <div style="display: flex; align-items: center; gap: var(--space-4);">
        <div class="ngo-card-avatar" style="background: ${ngo.color}; width: 56px; height: 56px; font-size: var(--font-2xl);">${ngo.avatar}</div>
        <div>
          <h1>${ngo.name}</h1>
          <p>${icon('map-pin', 14)} ${ngo.location} · <span class="badge badge-verified">${icon('check-circle', 12)} Verified</span></p>
        </div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card animate-fade-in stagger-1">
        <div class="stat-icon emerald">${icon('dollar-sign', 22)}</div>
        <div class="stat-info">
          <h3>$${totalReceived.toLocaleString()}</h3>
          <p>Total Received</p>
          <span class="stat-change up">${icon('trending-up', 14)} $5,000 this week</span>
        </div>
      </div>
      <div class="stat-card animate-fade-in stagger-2">
        <div class="stat-icon blue">${icon('bar-chart-3', 22)}</div>
        <div class="stat-info">
          <h3>$${totalAllocated.toLocaleString()}</h3>
          <p>Allocated to Programs</p>
        </div>
      </div>
      <div class="stat-card animate-fade-in stagger-3">
        <div class="stat-icon amber">${icon('file-text', 22)}</div>
        <div class="stat-info">
          <h3>${pendingInvoices}</h3>
          <p>Pending Invoices</p>
          ${pendingInvoices > 0 ? `<span class="stat-change down">${icon('alert-triangle', 14)} Action required</span>` : ''}
        </div>
      </div>
      <div class="stat-card animate-fade-in stagger-4">
        <div class="stat-icon purple">${icon('graduation-cap', 22)}</div>
        <div class="stat-info">
          <h3>${myStudents.length}</h3>
          <p>Registered Students</p>
        </div>
      </div>
    </div>

    <!-- Active Programs -->
    <div class="card animate-fade-in-up" style="margin-bottom: var(--space-8);">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-5);">
        <h2 style="font-size: var(--font-xl); font-weight: 700;">Active Programs</h2>
        <a href="#/ngo/programs" class="btn btn-secondary btn-sm">View All ${icon('arrow-right', 14)}</a>
      </div>
      <div style="display: flex; flex-direction: column; gap: var(--space-5);">
        ${myPrograms.map(p => {
    const pct = ((p.allocated / p.totalBudget) * 100).toFixed(0);
    return `
            <div style="padding: var(--space-5); border: 1px solid var(--border-light); border-radius: var(--radius-md);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-3);">
                <div>
                  <strong style="font-size: var(--font-base);">${p.name}</strong>
                  <span class="badge badge-${p.status === 'active' ? 'active' : 'completed'}" style="margin-left: var(--space-2);">${p.status}</span>
                </div>
                <span style="font-size: var(--font-sm); color: var(--text-secondary);">${icon('users', 14)} ${p.studentsEnrolled} students</span>
              </div>
              <div class="progress-bar" style="margin-bottom: var(--space-2);">
                <div class="progress-bar-fill ${p.status === 'active' ? 'emerald' : 'blue'}" style="width: ${pct}%;"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: var(--font-xs); color: var(--text-tertiary);">
                <span>$${p.allocated.toLocaleString()} / $${p.totalBudget.toLocaleString()} allocated</span>
                <span>${pct}%</span>
              </div>
            </div>
          `;
  }).join('')}
      </div>
    </div>

    <!-- Recent Donations -->
    <div class="card animate-fade-in-up">
      <h2 style="font-size: var(--font-xl); font-weight: 700; margin-bottom: var(--space-5);">Recent Donations Received</h2>
      <div class="table-wrapper" style="border: none;">
        <table class="data-table">
          <thead>
            <tr><th>Date</th><th>Donor</th><th>Program</th><th>Amount</th></tr>
          </thead>
          <tbody>
            ${myDonations.map(d => {
    const prog = d.programId ? programs.find(p => p.id === d.programId) : null;
    return `
                <tr>
                  <td>${new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                  <td style="font-weight: 500;">Anonymous Donor</td>
                  <td>${prog ? prog.name : 'General Fund'}</td>
                  <td style="font-weight: 700; color: var(--emerald-600);">+$${d.amount.toLocaleString()}</td>
                </tr>
              `;
  }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
