// ========================================
// EduTrack — NGO: Fund Allocation
// ========================================

import { programs, students } from '../../data/mock.js';
import { icon } from '../../icons.js';

export function renderNGOAllocation() {
  const myPrograms = programs.filter(p => p.ngoId === 'ngo-1');
  const myStudents = students.filter(s => s.ngoId === 'ngo-1');
  const totalBudget = myPrograms.reduce((a, p) => a + p.totalBudget, 0);
  const totalAllocated = myPrograms.reduce((a, p) => a + p.allocated, 0);
  const unallocated = totalBudget - totalAllocated;

  return `
    <div class="page-header animate-fade-in">
      <h1>Fund Allocation</h1>
      <p>Distribute received funds to programs and individual students</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card animate-fade-in stagger-1">
        <div class="stat-icon emerald">${icon('dollar-sign', 22)}</div>
        <div class="stat-info">
          <h3>$${totalBudget.toLocaleString()}</h3>
          <p>Total Budget</p>
        </div>
      </div>
      <div class="stat-card animate-fade-in stagger-2">
        <div class="stat-icon blue">${icon('pie-chart', 22)}</div>
        <div class="stat-info">
          <h3>$${totalAllocated.toLocaleString()}</h3>
          <p>Allocated</p>
        </div>
      </div>
      <div class="stat-card animate-fade-in stagger-3">
        <div class="stat-icon amber">${icon('clock', 22)}</div>
        <div class="stat-info">
          <h3>$${unallocated.toLocaleString()}</h3>
          <p>Unallocated</p>
        </div>
      </div>
    </div>

    <!-- Program Allocations -->
    <div class="card animate-fade-in-up" style="margin-bottom: var(--space-8);">
      <h2 style="font-size: var(--font-xl); font-weight: 700; margin-bottom: var(--space-6);">Program Budgets</h2>
      ${myPrograms.map(p => {
    const pct = ((p.allocated / p.totalBudget) * 100).toFixed(0);
    return `
          <div style="margin-bottom: var(--space-6); padding-bottom: var(--space-5); border-bottom: 1px solid var(--border-light);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
              <div>
                <strong style="font-size: var(--font-base);">${p.name}</strong>
                <span class="badge badge-${p.status === 'active' ? 'active' : 'completed'}" style="margin-left: var(--space-2);">${p.status}</span>
              </div>
              <span style="font-size: var(--font-sm); font-weight: 600;">$${p.allocated.toLocaleString()} / $${p.totalBudget.toLocaleString()}</span>
            </div>
            <div class="progress-bar" style="margin-bottom: var(--space-3);">
              <div class="progress-bar-fill emerald" style="width: ${pct}%;"></div>
            </div>
            <div style="display: flex; gap: var(--space-3);">
              <button class="btn btn-secondary btn-sm">${icon('wallet', 14)} Allocate Funds</button>
              <button class="btn btn-secondary btn-sm">${icon('eye', 14)} View Details</button>
            </div>
          </div>
        `;
  }).join('')}
    </div>

    <!-- Student-level allocation -->
    <div class="card animate-fade-in-up">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-5);">
        <h2 style="font-size: var(--font-xl); font-weight: 700;">Student Wallet Allocations</h2>
        <button class="btn btn-primary btn-sm">${icon('plus', 14)} Add Allocation</button>
      </div>
      <div class="table-wrapper" style="border: none;">
        <table class="data-table">
          <thead><tr><th>Student</th><th>Program</th><th>Total Received</th><th>Wallet Balance</th><th>Actions</th></tr></thead>
          <tbody>
            ${myStudents.map(s => {
    const prog = programs.find(p => p.id === s.programId);
    return `
                <tr>
                  <td>
                    <div class="table-user">
                      <div class="table-avatar" style="background: #10b981;">${s.name.charAt(0)}</div>
                      <div class="table-user-info">
                        <strong>${s.name}</strong>
                        <span>${s.school}</span>
                      </div>
                    </div>
                  </td>
                  <td style="font-size: var(--font-sm);">${prog?.name || 'N/A'}</td>
                  <td style="font-weight: 600;">$${s.totalReceived.toLocaleString()}</td>
                  <td>
                    <span style="font-weight: 700; color: ${s.walletBalance > 0 ? 'var(--emerald-600)' : 'var(--text-tertiary)'};">
                      $${s.walletBalance.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-secondary btn-sm">${icon('hand-coins', 14)} Fund</button>
                  </td>
                </tr>
              `;
  }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
