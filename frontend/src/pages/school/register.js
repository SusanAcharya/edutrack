// ========================================
// OpenScholar — School: Registration
// ========================================

import { icon } from '../../icons.js';

export function renderSchoolRegister() {
  return `
    <div class="page-header animate-fade-in">
      <h1>School Registration</h1>
      <p>Register your school as a partner to accept scholarship fundings</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-8); align-items: start;" class="animate-fade-in-up">
      <!-- Registration Form -->
      <div class="card">
        <h2 style="font-size: var(--font-xl); font-weight: 700; margin-bottom: var(--space-6);">${icon('school', 20)} School Information</h2>

        <div class="form-group"><label class="form-label">School Name</label><input class="form-input" type="text" placeholder="Official school name" /></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">District</label><input class="form-input" type="text" placeholder="District" /></div>
          <div class="form-group"><label class="form-label">Municipality / VDC</label><input class="form-input" type="text" placeholder="Municipality" /></div>
        </div>
        <div class="form-group"><label class="form-label">School Type</label><select class="form-select"><option>Government School</option><option>Community School</option><option>Private School</option></select></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Contact Person</label><input class="form-input" type="text" placeholder="Principal / Admin name" /></div>
          <div class="form-group"><label class="form-label">Contact Number</label><input class="form-input" type="tel" placeholder="+977-XXXXXXXXXX" /></div>
        </div>
        <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" placeholder="school@email.com" /></div>
        <div class="form-group"><label class="form-label">Total Students</label><input class="form-input" type="number" placeholder="Total enrolled students" /></div>

        <div style="margin-top: var(--space-6); padding-top: var(--space-5); border-top: 1px solid var(--border-light);">
          <h3 style="font-size: var(--font-lg); font-weight: 600; margin-bottom: var(--space-4);">${icon('upload', 18)} Verification Documents</h3>

          <div class="form-group">
            <label class="form-label">School Registration Certificate</label>
            <div style="border: 2px dashed var(--border-light); border-radius: var(--radius-md); padding: var(--space-6); text-align: center; cursor: pointer;">
              <div style="margin-bottom: var(--space-2); color: var(--navy-400);">${icon('file-plus', 28)}</div>
              <p style="font-size: var(--font-sm); color: var(--text-secondary);">Click to upload or drag & drop</p>
              <p style="font-size: var(--font-xs); color: var(--text-tertiary);">PDF, JPG, PNG (max 5MB)</p>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">PAN / Tax Registration</label>
            <div style="border: 2px dashed var(--border-light); border-radius: var(--radius-md); padding: var(--space-6); text-align: center; cursor: pointer;">
              <div style="margin-bottom: var(--space-2); color: var(--navy-400);">${icon('file-plus', 28)}</div>
              <p style="font-size: var(--font-sm); color: var(--text-secondary);">Click to upload or drag & drop</p>
              <p style="font-size: var(--font-xs); color: var(--text-tertiary);">PDF, JPG, PNG (max 5MB)</p>
            </div>
          </div>
        </div>

        <button class="btn btn-primary btn-lg" style="width: 100%; margin-top: var(--space-4);">
          ${icon('send', 16)} Submit Registration
        </button>
      </div>

      <!-- Info Panel -->
      <div>
        <div class="card" style="margin-bottom: var(--space-5);">
          <h3 style="font-size: var(--font-lg); font-weight: 700; margin-bottom: var(--space-5);">${icon('school', 20)} Why Partner with OpenScholar?</h3>
          <div style="display: flex; flex-direction: column; gap: var(--space-5);">
            <div style="display: flex; gap: var(--space-3);">
              <div style="flex-shrink: 0; color: var(--emerald-600);">${icon('dollar-sign', 22)}</div>
              <div>
                <strong style="font-size: var(--font-sm);">Receive Scholarship Funds</strong>
                <p style="font-size: var(--font-sm); color: var(--text-secondary);">Claim tuition and other fees directly through verified invoices</p>
              </div>
            </div>
            <div style="display: flex; gap: var(--space-3);">
              <div style="flex-shrink: 0; color: var(--blue-600);">${icon('bar-chart-3', 22)}</div>
              <div>
                <strong style="font-size: var(--font-sm);">Transparent Records</strong>
                <p style="font-size: var(--font-sm); color: var(--text-secondary);">All transactions are recorded and visible to donors and NGOs</p>
              </div>
            </div>
            <div style="display: flex; gap: var(--space-3);">
              <div style="flex-shrink: 0; color: var(--amber-600);">${icon('users', 22)}</div>
              <div>
                <strong style="font-size: var(--font-sm);">NGO Partnerships</strong>
                <p style="font-size: var(--font-sm); color: var(--text-secondary);">Connect with multiple NGOs running scholarship programs</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card" style="background: var(--emerald-50); border-color: var(--emerald-100);">
          <h3 style="font-size: var(--font-lg); font-weight: 700; margin-bottom: var(--space-3); color: var(--emerald-600);">Registration Status</h3>
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <span class="badge badge-verified">${icon('check-circle', 12)} Verified</span>
            <span style="font-size: var(--font-sm);">Usually reviewed within 2-3 business days</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
