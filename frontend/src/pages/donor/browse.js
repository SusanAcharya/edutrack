// ========================================
// OpenScholar — Donor: Browse NGOs, Programs & Scholarships
// ========================================

import { ngos, programs, students } from '../../data/mock.js';
import { icon } from '../../icons.js';

export function renderDonorBrowse() {
  const verifiedNgos = ngos.filter(n => n.status === 'verified');
  const activePrograms = programs.filter(p => p.status === 'active');
  const activeStudents = students.filter(s => s.status === 'active');

  return `
    <div class="page-header animate-fade-in">
      <h1>Browse & Discover</h1>
      <p>Explore verified NGOs, scholarship programs, and individual students to support</p>
    </div>

    <!-- Pill Tabs -->
    <div class="browse-tabs animate-fade-in">
      <button class="browse-tab active" data-tab="ngos">
        ${icon('building-2', 15)} NGOs
        <span class="badge" style="background: var(--gray-200); color: var(--gray-600); margin-left: 2px;">${verifiedNgos.length}</span>
      </button>
      <button class="browse-tab" data-tab="programs">
        ${icon('folder-open', 15)} Programs
        <span class="badge" style="background: var(--gray-200); color: var(--gray-600); margin-left: 2px;">${activePrograms.length}</span>
      </button>
      <button class="browse-tab" data-tab="scholarships">
        ${icon('graduation-cap', 15)} Scholarships
        <span class="badge" style="background: var(--gray-200); color: var(--gray-600); margin-left: 2px;">${activeStudents.length}</span>
      </button>
    </div>

    <!-- Search -->
    <div style="margin-bottom: var(--space-5);" class="animate-fade-in">
      <div class="search-box">
        <span class="search-icon">${icon('search', 15)}</span>
        <input type="text" placeholder="Search by name, location, or category..." id="search-browse" />
      </div>
    </div>

    <!-- NGOs Tab -->
    <div id="browse-tab-ngos" class="animate-fade-in-up">
      <div class="card-grid">
        ${verifiedNgos.map((ngo, i) => {
    return `
            <div class="ngo-card stagger-${i + 1}" onclick="window.location.hash='/donor/donate?ngo=${ngo.id}'">
              <div class="ngo-card-header">
                <div class="ngo-card-avatar" style="background: ${ngo.color};">${ngo.avatar}</div>
                <div class="ngo-card-info" style="flex: 1;">
                  <h3>${ngo.name}</h3>
                  <span>${icon('map-pin', 12)} ${ngo.location}</span>
                </div>
                <span class="badge badge-verified">${icon('check-circle', 11)} Verified</span>
              </div>
              <p style="font-size: var(--font-sm); color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.6;">
                ${ngo.description}
              </p>
              <div class="ngo-card-stats">
                <div class="ngo-card-stat">
                  <strong>$${(ngo.totalFunded / 1000).toFixed(0)}K</strong>
                  <span>Funded</span>
                </div>
                <div class="ngo-card-stat">
                  <strong>${ngo.studentsHelped}</strong>
                  <span>Students</span>
                </div>
                <div class="ngo-card-stat">
                  <strong>${ngo.programsCount}</strong>
                  <span>Programs</span>
                </div>
              </div>
            </div>
          `;
  }).join('')}
      </div>
    </div>

    <!-- Programs Tab -->
    <div id="browse-tab-programs" style="display: none;" class="animate-fade-in-up">
      <div class="card-grid">
        ${activePrograms.map((p, i) => {
    const ngo = ngos.find(n => n.id === p.ngoId);
    const pct = ((p.allocated / p.totalBudget) * 100).toFixed(0);
    return `
            <div class="card stagger-${i + 1}" style="cursor: pointer;" onclick="window.location.hash='/donor/donate?program=${p.id}'">
              <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-3);">
                <div class="ngo-card-avatar" style="background: ${ngo?.color || '#14b8a6'}; width: 40px; height: 40px; font-size: var(--font-xs);">${ngo?.avatar || 'P'}</div>
                <div style="flex: 1; min-width: 0;">
                  <div style="font-size: var(--font-xs); color: var(--text-tertiary);">${ngo?.name || 'N/A'}</div>
                  <h3 style="font-size: var(--font-base); font-weight: 700;">${p.name}</h3>
                </div>
                <span class="badge badge-active">${icon('circle-dot', 9)} Active</span>
              </div>
              <p style="font-size: var(--font-sm); color: var(--text-secondary); margin-bottom: var(--space-3); line-height: 1.6;">${p.description}</p>
              <div style="display: flex; flex-wrap: wrap; gap: var(--space-1); margin-bottom: var(--space-3);">
                ${p.categories.map(c => `<span class="badge" style="background: var(--gray-100); color: var(--gray-600);">${c}</span>`).join('')}
              </div>
              <div style="margin-bottom: var(--space-2);">
                <div style="display: flex; justify-content: space-between; font-size: var(--font-xs); color: var(--text-tertiary); margin-bottom: 4px;">
                  <span>Budget</span>
                  <span>${pct}%</span>
                </div>
                <div class="progress-bar"><div class="progress-bar-fill emerald" style="width: ${pct}%;"></div></div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: var(--space-2); border-top: 1px solid var(--border-light); font-size: var(--font-xs); color: var(--text-tertiary);">
                <span>${icon('users', 13)} ${p.studentsEnrolled} enrolled</span>
                <span style="color: var(--teal-600);">${Math.max(0, 200 - p.studentsEnrolled)} spots left</span>
              </div>
            </div>
          `;
  }).join('')}
      </div>
    </div>

    <!-- Scholarships Tab -->
    <div id="browse-tab-scholarships" style="display: none;" class="animate-fade-in-up">
      <div class="card-grid-3">
        ${activeStudents.map((s, i) => {
    const ngo = ngos.find(n => n.id === s.ngoId);
    const prog = programs.find(p => p.id === s.programId);
    return `
            <div class="card stagger-${i + 1}" style="cursor: pointer;" onclick="window.location.hash='/donor/donate?student=${s.id}'">
              <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-3);">
                <div class="table-avatar" style="background: ${ngo?.color || '#14b8a6'};">${s.name.charAt(0)}</div>
                <div>
                  <strong style="display: block; font-size: var(--font-sm);">${s.name}</strong>
                  <span style="font-size: var(--font-xs); color: var(--text-tertiary);">Grade ${s.grade} · ${s.location}</span>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; gap: var(--space-1); font-size: var(--font-xs); color: var(--text-secondary); margin-bottom: var(--space-3);">
                <div style="display: flex; align-items: center; gap: var(--space-2);">
                  ${icon('school', 13)} ${s.school}
                </div>
                <div style="display: flex; align-items: center; gap: var(--space-2);">
                  ${icon('folder-open', 13)} ${prog?.name || 'N/A'}
                </div>
              </div>
              <div style="padding-top: var(--space-2); border-top: 1px solid var(--border-light); text-align: right;">
                <span class="btn btn-primary btn-sm">Support ${icon('arrow-right', 13)}</span>
              </div>
            </div>
          `;
  }).join('')}
      </div>
    </div>
  `;
}

export function bindDonorBrowseEvents() {
  const tabs = document.querySelectorAll('.browse-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all
      tabs.forEach(t => t.classList.remove('active'));
      // Add active to clicked
      tab.classList.add('active');

      const tabName = tab.dataset.tab;
      document.querySelectorAll('[id^="browse-tab-"]').forEach(panel => {
        panel.style.display = panel.id === `browse-tab-${tabName}` ? 'block' : 'none';
      });
    });
  });
}
