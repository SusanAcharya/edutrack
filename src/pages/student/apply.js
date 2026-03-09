// ========================================
// EduTrack — Student: Apply for Scholarship
// ========================================

import { programs, ngos } from '../../data/mock.js';
import { icon } from '../../icons.js';

export function renderStudentApply() {
  const activePrograms = programs.filter(p => p.status === 'active');

  return `
    <div class="page-header animate-fade-in">
      <h1>Apply for Scholarship</h1>
      <p>Browse available scholarship programs and submit your application</p>
    </div>

    <!-- Available Programs -->
    <div class="card-grid animate-fade-in-up" style="margin-bottom: var(--space-8);">
      ${activePrograms.map((p, i) => {
    const ngo = ngos.find(n => n.id === p.ngoId);
    const spotsLeft = Math.max(0, 200 - p.studentsEnrolled);
    return `
          <div class="card stagger-${i + 1}">
            <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4);">
              <div class="ngo-card-avatar" style="background: ${ngo?.color || '#10b981'}; width: 44px; height: 44px; font-size: var(--font-lg);">${ngo?.avatar || 'P'}</div>
              <div>
                <div style="font-size: var(--font-xs); color: var(--text-tertiary);">${ngo?.name || 'N/A'}</div>
                <h3 style="font-size: var(--font-lg); font-weight: 700;">${p.name}</h3>
              </div>
            </div>
            <p style="font-size: var(--font-sm); color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.7;">${p.description}</p>
            <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-4);">
              ${p.categories.map(c => `<span class="badge" style="background: var(--navy-100); color: var(--navy-600);">${c}</span>`).join('')}
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: var(--space-3); border-top: 1px solid var(--border-light);">
              <span style="font-size: var(--font-sm); color: ${spotsLeft < 30 ? 'var(--amber-600)' : 'var(--text-secondary)'};">
                ${spotsLeft > 0 ? `${spotsLeft} spots remaining` : 'No spots available'}
              </span>
              <button class="btn btn-primary btn-sm apply-program-btn" data-program="${p.id}">Apply Now ${icon('arrow-right', 14)}</button>
            </div>
          </div>
        `;
  }).join('')}
    </div>

    <!-- Application Form -->
    <div id="application-form" style="display: none;" class="animate-fade-in-up">
      <div class="card" style="max-width: 700px; margin: 0 auto;">
        <h2 style="font-size: var(--font-xl); font-weight: 700; margin-bottom: var(--space-2);">${icon('file-text', 20)} Scholarship Application</h2>
        <p style="font-size: var(--font-sm); color: var(--text-secondary); margin-bottom: var(--space-6);" id="applying-for-text">Applying for: Girls Education Program 2026</p>

        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input class="form-input" type="text" placeholder="Enter your full name" />
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Age</label><input class="form-input" type="number" placeholder="Your age" /></div>
          <div class="form-group"><label class="form-label">Grade</label><input class="form-input" type="number" placeholder="Current grade" /></div>
        </div>
        <div class="form-group"><label class="form-label">School Name</label><input class="form-input" type="text" placeholder="Your current school" /></div>
        <div class="form-group"><label class="form-label">School Address / District</label><input class="form-input" type="text" placeholder="District and location" /></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Guardian Name</label><input class="form-input" type="text" placeholder="Parent/Guardian name" /></div>
          <div class="form-group"><label class="form-label">Relation</label><select class="form-select"><option>Father</option><option>Mother</option><option>Grandparent</option><option>Other</option></select></div>
        </div>
        <div class="form-group"><label class="form-label">Guardian Contact Number</label><input class="form-input" type="tel" placeholder="+977-XXXXXXXXXX" /></div>
        <div class="form-group"><label class="form-label">Why do you need this scholarship?</label><textarea class="form-textarea" rows="4" placeholder="Tell us about your family situation and why you need financial support for your education..."></textarea></div>

        <div style="display: flex; gap: var(--space-3); margin-top: var(--space-6);">
          <button class="btn btn-primary btn-lg" style="flex: 1;" id="submit-application">${icon('send', 16)} Submit Application</button>
          <button class="btn btn-secondary btn-lg" id="cancel-application">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Application Status -->
    <div class="card animate-fade-in-up" style="margin-top: var(--space-8);">
      <h2 style="font-size: var(--font-xl); font-weight: 700; margin-bottom: var(--space-5);">Your Applications</h2>
      <div style="padding: var(--space-5); border: 1px solid var(--border-light); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between;">
        <div>
          <strong>Girls Education Program 2026</strong>
          <div style="font-size: var(--font-sm); color: var(--text-tertiary);">Bright Future Foundation · Applied: Feb 28, 2026</div>
        </div>
        <span class="badge badge-pending">${icon('clock', 12)} Under Review</span>
      </div>
    </div>
  `;
}

export function bindStudentApplyEvents() {
  document.querySelectorAll('.apply-program-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const form = document.getElementById('application-form');
      if (form) {
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const cancelBtn = document.getElementById('cancel-application');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      const form = document.getElementById('application-form');
      if (form) form.style.display = 'none';
    });
  }

  const submitBtn = document.getElementById('submit-application');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const toast = document.createElement('div');
      toast.className = 'toast success';
      toast.innerHTML = '<i data-lucide="check-circle" class="lucide" style="width:18px;height:18px;"></i> Application submitted successfully! You will be notified when reviewed.';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
      const form = document.getElementById('application-form');
      if (form) form.style.display = 'none';
    });
  }
}
