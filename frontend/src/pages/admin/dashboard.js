// ========================================
// OpenScholar — System Admin: Dashboard
// ========================================

import { ngos, students, platformStats } from '../../data/mock.js';
import { icon } from '../../icons.js';

export function renderAdminDashboard() {
  const pendingNgos = ngos.filter(n => n.status === 'pending').length;
  const rejectedNgos = ngos.filter(n => n.status === 'rejected').length;

  return `
    <div class="page-header animate-fade-in">
      <h1>System Administration</h1>
      <p>Monitor platform health, verify organizations, and manage accounts</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card animate-fade-in stagger-1">
        <div class="stat-icon amber">${icon('clock', 22)}</div>
        <div class="stat-info">
          <h3>${pendingNgos}</h3>
          <p>Pending Verifications</p>
          ${pendingNgos > 0 ? `<span class="stat-change down">${icon('alert-triangle', 14)} Action required</span>` : ''}
        </div>
      </div>
      <div class="stat-card animate-fade-in stagger-2">
        <div class="stat-icon emerald">${icon('shield-check', 22)}</div>
        <div class="stat-info">
          <h3>${ngos.filter(n => n.status === 'verified').length}</h3>
          <p>Verified NGOs</p>
        </div>
      </div>
      <div class="stat-card animate-fade-in stagger-3">
        <div class="stat-icon red">${icon('ban', 22)}</div>
        <div class="stat-info">
          <h3>${rejectedNgos}</h3>
          <p>Rejected / Blacklisted</p>
        </div>
      </div>
      <div class="stat-card animate-fade-in stagger-4">
        <div class="stat-icon blue">${icon('school', 22)}</div>
        <div class="stat-info">
          <h3>${platformStats.totalSchools}</h3>
          <p>Partner Schools</p>
        </div>
      </div>
    </div>

    <!-- Platform Overview -->
    <div class="card animate-fade-in-up" style="margin-bottom: var(--space-8);">
      <h2 style="font-size: var(--font-xl); font-weight: 700; margin-bottom: var(--space-5);">Platform Overview</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-6);">
        <div>
          <div style="font-size: var(--font-sm); color: var(--text-tertiary); margin-bottom: var(--space-1);">Total Funds Processed</div>
          <div style="font-size: var(--font-2xl); font-weight: 800;">$${(platformStats.totalDonations / 1000).toFixed(0)}K</div>
        </div>
        <div>
          <div style="font-size: var(--font-sm); color: var(--text-tertiary); margin-bottom: var(--space-1);">Active Students</div>
          <div style="font-size: var(--font-2xl); font-weight: 800;">${platformStats.totalStudents}</div>
        </div>
        <div>
          <div style="font-size: var(--font-sm); color: var(--text-tertiary); margin-bottom: var(--space-1);">Active Programs</div>
          <div style="font-size: var(--font-2xl); font-weight: 800;">${platformStats.totalPrograms}</div>
        </div>
        <div>
          <div style="font-size: var(--font-sm); color: var(--text-tertiary); margin-bottom: var(--space-1);">Fund Utilization</div>
          <div style="font-size: var(--font-2xl); font-weight: 800; color: var(--emerald-600);">${((platformStats.fundsUtilized / platformStats.totalDonations) * 100).toFixed(0)}%</div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card-grid animate-fade-in-up">
      <div class="card" style="cursor: pointer;" onclick="window.location.hash='/admin/verify'">
        <div style="margin-bottom: var(--space-3); color: var(--emerald-600);">${icon('shield-check', 36)}</div>
        <h3 style="font-size: var(--font-lg); font-weight: 700; margin-bottom: var(--space-2);">Verify NGOs</h3>
        <p style="font-size: var(--font-sm); color: var(--text-secondary);">${pendingNgos} organizations waiting for verification</p>
      </div>
      <div class="card" style="cursor: pointer;" onclick="window.location.hash='/admin/blacklist'">
        <div style="margin-bottom: var(--space-3); color: var(--red-500);">${icon('ban', 36)}</div>
        <h3 style="font-size: var(--font-lg); font-weight: 700; margin-bottom: var(--space-2);">Manage Blacklist</h3>
        <p style="font-size: var(--font-sm); color: var(--text-secondary);">Review and manage blacklisted accounts</p>
      </div>
    </div>
  `;
}
