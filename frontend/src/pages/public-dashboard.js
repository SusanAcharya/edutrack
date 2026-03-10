// ========================================
// OpenScholar — Public Dashboard
// ========================================

import { platformStats, recentActivity, ngos, programs } from '../data/mock.js';
import { icon } from '../icons.js';

export function renderPublicDashboard() {
  const verifiedNgos = ngos.filter(n => n.status === 'verified');
  const utilizationPct = ((platformStats.fundsUtilized / platformStats.totalDonations) * 100).toFixed(1);

  return `
    <div class="page-header animate-fade-in">
      <h1>${icon('globe', 28)} Public Transparency Dashboard</h1>
      <p>Real-time overview of education funding across all verified NGOs and programs</p>
    </div>

    <!-- Stats -->
    <div class="stats-grid">
      <div class="stat-card animate-fade-in stagger-1">
        <div class="stat-icon emerald">${icon('dollar-sign', 22)}</div>
        <div class="stat-info">
          <h3>$${(platformStats.totalDonations / 1000).toFixed(0)}K</h3>
          <p>Total Donations</p>
          <span class="stat-change up">${icon('trending-up', 14)} 12% this month</span>
        </div>
      </div>
      <div class="stat-card animate-fade-in stagger-2">
        <div class="stat-icon blue">${icon('graduation-cap', 22)}</div>
        <div class="stat-info">
          <h3>${platformStats.totalStudents}</h3>
          <p>Students Funded</p>
          <span class="stat-change up">${icon('trending-up', 14)} 34 new</span>
        </div>
      </div>
      <div class="stat-card animate-fade-in stagger-3">
        <div class="stat-icon amber">${icon('building-2', 22)}</div>
        <div class="stat-info">
          <h3>${platformStats.totalNGOs}</h3>
          <p>Verified NGOs</p>
        </div>
      </div>
      <div class="stat-card animate-fade-in stagger-4">
        <div class="stat-icon purple">${icon('folder-open', 22)}</div>
        <div class="stat-info">
          <h3>${platformStats.totalPrograms}</h3>
          <p>Active Programs</p>
        </div>
      </div>
    </div>

    <!-- Fund Utilization -->
    <div class="card animate-fade-in-up" style="margin-bottom: var(--space-8);">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4);">
        <h2 style="font-size: var(--font-xl); font-weight: 700;">Fund Utilization</h2>
        <span class="badge badge-verified">${utilizationPct}% utilized</span>
      </div>
      <div class="progress-bar" style="height: 12px; margin-bottom: var(--space-4);">
        <div class="progress-bar-fill emerald" style="width: ${utilizationPct}%;"></div>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: var(--font-sm); color: var(--text-secondary);">
        <span>Donated: $${platformStats.totalDonations.toLocaleString()}</span>
        <span>Allocated: $${platformStats.fundsAllocated.toLocaleString()}</span>
        <span>Utilized: $${platformStats.fundsUtilized.toLocaleString()}</span>
      </div>
    </div>

    <!-- Fund Flow -->
    <div class="fund-flow animate-fade-in-up" style="margin-bottom: var(--space-8);">
      <div class="fund-flow-title">${icon('arrow-left-right', 20)} Fund Flow Visualization</div>
      <div class="flow-stages">
        <div class="flow-stage">
          <div class="flow-stage-label">Donors</div>
          <div class="flow-stage-items">
            <div class="flow-item donor">Nordic Aid Foundation<br/><strong>$75,000</strong></div>
            <div class="flow-item donor">Global Ed Trust<br/><strong>$120,000</strong></div>
            <div class="flow-item donor">Individual Donors<br/><strong>$395,000</strong></div>
          </div>
        </div>
        <div class="flow-connector">${icon('chevron-right', 20)}</div>
        <div class="flow-stage">
          <div class="flow-stage-label">NGOs</div>
          <div class="flow-stage-items">
            ${verifiedNgos.map(n => `
              <div class="flow-item ngo">${n.name}<br/><strong>$${n.totalFunded.toLocaleString()}</strong></div>
            `).join('')}
          </div>
        </div>
        <div class="flow-connector">${icon('chevron-right', 20)}</div>
        <div class="flow-stage">
          <div class="flow-stage-label">Categories</div>
          <div class="flow-stage-items">
            <div class="flow-item category">Tuition<br/><strong>$210,000</strong></div>
            <div class="flow-item category">Books & Stationery<br/><strong>$95,000</strong></div>
            <div class="flow-item category">Uniforms<br/><strong>$67,000</strong></div>
            <div class="flow-item category">Food & Transport<br/><strong>$48,000</strong></div>
          </div>
        </div>
        <div class="flow-connector">${icon('chevron-right', 20)}</div>
        <div class="flow-stage">
          <div class="flow-stage-label">Impact</div>
          <div class="flow-stage-items">
            <div class="flow-item student">755 Students<br/><strong>across 45 schools</strong></div>
            <div class="flow-item student">18 Programs<br/><strong>in 12 districts</strong></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="card animate-fade-in-up">
      <h2 style="font-size: var(--font-xl); font-weight: 700; margin-bottom: var(--space-4);">${icon('activity', 20)} Recent Activity</h2>
      <div class="activity-feed">
        ${recentActivity.map(a => `
          <div class="activity-item">
            <div class="activity-dot ${a.color}"></div>
            <div class="activity-content">
              <p>${a.text}</p>
              <time>${a.time}</time>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
