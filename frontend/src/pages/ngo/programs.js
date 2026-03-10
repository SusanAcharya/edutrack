// ========================================
// OpenScholar — NGO: Programs Management
// ========================================

import { programs, ngos } from '../../data/mock.js';
import { icon } from '../../icons.js';

export function renderNGOPrograms() {
  const myPrograms = programs.filter(p => p.ngoId === 'ngo-1');

  return `
    <div class="page-header animate-fade-in">
      <h1>Scholarship Programs</h1>
      <p>Manage your scholarship programs, budgets, and enrollments</p>
      <div class="page-header-actions">
        <button class="btn btn-primary" id="create-program-btn">${icon('plus', 16)} Create Program</button>
      </div>
    </div>

    <div class="card-grid animate-fade-in-up">
      ${myPrograms.map((p, i) => {
    const pct = ((p.allocated / p.totalBudget) * 100).toFixed(0);
    return `
          <div class="card stagger-${i + 1}">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: var(--space-4);">
              <h3 style="font-size: var(--font-lg); font-weight: 700;">${p.name}</h3>
              <span class="badge badge-${p.status === 'active' ? 'active' : 'completed'}">${p.status === 'active' ? icon('circle-dot', 10) : icon('check-circle', 10)} ${p.status}</span>
            </div>
            <p style="font-size: var(--font-sm); color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.7;">${p.description}</p>
            <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-5);">
              ${p.categories.map(c => `<span class="badge" style="background: var(--navy-100); color: var(--navy-600);">${c}</span>`).join('')}
            </div>
            <div style="margin-bottom: var(--space-3);">
              <div style="display: flex; justify-content: space-between; font-size: var(--font-xs); color: var(--text-tertiary); margin-bottom: var(--space-2);">
                <span>Budget: $${p.allocated.toLocaleString()} / $${p.totalBudget.toLocaleString()}</span>
                <span>${pct}%</span>
              </div>
              <div class="progress-bar"><div class="progress-bar-fill ${p.status === 'active' ? 'emerald' : 'blue'}" style="width: ${pct}%;"></div></div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: var(--space-4); border-top: 1px solid var(--border-light); font-size: var(--font-sm); color: var(--text-secondary);">
              <span>${icon('users', 14)} ${p.studentsEnrolled} students</span>
              <button class="btn btn-secondary btn-sm">${icon('eye', 14)} Details</button>
            </div>
          </div>
        `;
  }).join('')}
    </div>

    <!-- Create Program Modal -->
    <div id="create-program-modal" style="display: none;">
      <div class="modal-overlay" onclick="if(event.target===this)document.getElementById('create-program-modal').style.display='none'">
        <div class="modal">
          <div class="modal-header">
            <h2>${icon('folder-open', 20)} Create Scholarship Program</h2>
            <button class="modal-close" onclick="document.getElementById('create-program-modal').style.display='none'">${icon('x', 18)}</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Program Name</label>
              <input class="form-input" type="text" placeholder="e.g. Digital Literacy Program 2026" />
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea class="form-textarea" rows="3" placeholder="What does this program aim to achieve?"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Total Budget (USD)</label>
                <input class="form-input" type="number" placeholder="50000" />
              </div>
              <div class="form-group">
                <label class="form-label">Max Students</label>
                <input class="form-input" type="number" placeholder="200" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Categories</label>
              <div style="display: flex; flex-wrap: wrap; gap: var(--space-2);">
                <label style="display: flex; align-items: center; gap: var(--space-2); font-size: var(--font-sm); cursor: pointer; padding: var(--space-2) var(--space-3); border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                  <input type="checkbox" checked /> Tuition
                </label>
                <label style="display: flex; align-items: center; gap: var(--space-2); font-size: var(--font-sm); cursor: pointer; padding: var(--space-2) var(--space-3); border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                  <input type="checkbox" checked /> Books
                </label>
                <label style="display: flex; align-items: center; gap: var(--space-2); font-size: var(--font-sm); cursor: pointer; padding: var(--space-2) var(--space-3); border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                  <input type="checkbox" /> Uniforms
                </label>
                <label style="display: flex; align-items: center; gap: var(--space-2); font-size: var(--font-sm); cursor: pointer; padding: var(--space-2) var(--space-3); border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                  <input type="checkbox" /> Food
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="document.getElementById('create-program-modal').style.display='none'">Cancel</button>
            <button class="btn btn-primary">${icon('plus', 16)} Create Program</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindNGOProgramsEvents() {
  const createBtn = document.getElementById('create-program-btn');
  const modal = document.getElementById('create-program-modal');
  if (createBtn && modal) {
    createBtn.addEventListener('click', () => modal.style.display = 'block');
  }
}
