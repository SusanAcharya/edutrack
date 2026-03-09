// ========================================
// EduTrack — NGO: Students Management
// ========================================

import { students, programs, ngos } from '../../data/mock.js';
import { icon } from '../../icons.js';

export function renderNGOStudents() {
  const myStudents = students.filter(s => s.ngoId === 'ngo-1');

  return `
    <div class="page-header animate-fade-in">
      <h1>Registered Students</h1>
      <p>Manage scholarship students, generate IDs, and assign wallets</p>
      <div class="page-header-actions">
        <button class="btn btn-primary" id="register-student-btn">${icon('user-plus', 16)} Register Student</button>
      </div>
    </div>

    <!-- Student Table -->
    <div class="table-wrapper animate-fade-in-up" style="margin-bottom: var(--space-8);">
      <table class="data-table">
        <thead>
          <tr><th>Student</th><th>School</th><th>Program</th><th>Scholarship ID</th><th>Wallet</th><th>Status</th><th>Actions</th></tr>
        </thead>
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
                      <span>Age ${s.age} · Grade ${s.grade} · ${s.guardian}</span>
                    </div>
                  </div>
                </td>
                <td style="font-size: var(--font-sm);">${s.school}</td>
                <td style="font-size: var(--font-sm);">${prog?.name || 'N/A'}</td>
                <td><code style="font-size: var(--font-xs); background: var(--navy-100); padding: 2px 8px; border-radius: var(--radius-sm);">${s.scholarshipId}</code></td>
                <td style="font-weight: 600;">$${s.walletBalance.toLocaleString()}</td>
                <td><span class="badge badge-${s.status === 'active' ? 'verified' : 'completed'}">${s.status}</span></td>
                <td>
                  <div class="table-actions">
                    <button class="btn btn-secondary btn-sm" onclick="document.getElementById('id-card-modal').style.display='block'; document.getElementById('id-card-name').textContent='${s.name}'; document.getElementById('id-card-number').textContent='${s.scholarshipId}'; document.getElementById('id-card-program').textContent='${prog?.name || ''}'; document.getElementById('id-card-school').textContent='${s.school}'; document.getElementById('id-card-grade').textContent='Grade ${s.grade}';">${icon('eye', 14)} View ID</button>
                  </div>
                </td>
              </tr>
            `;
  }).join('')}
        </tbody>
      </table>
    </div>

    <!-- Pending Applications -->
    <div class="card animate-fade-in-up">
      <h2 style="font-size: var(--font-xl); font-weight: 700; margin-bottom: var(--space-5);">Pending Applications</h2>
      <p style="font-size: var(--font-sm); color: var(--text-secondary); margin-bottom: var(--space-5);">Students who have applied for your scholarship programs</p>

      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        <div style="padding: var(--space-5); border: 1px solid var(--border-light); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <div class="table-avatar" style="background: #f59e0b;">F</div>
            <div>
              <strong>Fulmati Tharu</strong>
              <div style="font-size: var(--font-xs); color: var(--text-tertiary);">Age 13 · Grade 7 · Kailali District</div>
              <div style="font-size: var(--font-xs); color: var(--text-tertiary);">Applied for: Girls Education Program 2026</div>
            </div>
          </div>
          <div class="table-actions">
            <button class="btn btn-primary btn-sm">${icon('check', 14)} Accept</button>
            <button class="btn btn-danger btn-sm">${icon('x', 14)} Reject</button>
          </div>
        </div>
        <div style="padding: var(--space-5); border: 1px solid var(--border-light); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <div class="table-avatar" style="background: #3b82f6;">G</div>
            <div>
              <strong>Gopal Magar</strong>
              <div style="font-size: var(--font-xs); color: var(--text-tertiary);">Age 11 · Grade 5 · Gorkha District</div>
              <div style="font-size: var(--font-xs); color: var(--text-tertiary);">Applied for: STEM Scholarship 2025</div>
            </div>
          </div>
          <div class="table-actions">
            <button class="btn btn-primary btn-sm">${icon('check', 14)} Accept</button>
            <button class="btn btn-danger btn-sm">${icon('x', 14)} Reject</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Scholarship ID Card Modal -->
    <div id="id-card-modal" style="display: none;">
      <div class="modal-overlay" onclick="if(event.target===this)document.getElementById('id-card-modal').style.display='none'">
        <div class="modal" style="max-width: 460px; background: transparent; box-shadow: none;">
          <div class="scholarship-id" style="margin: var(--space-6);">
            <div class="scholarship-id-header">
              <div class="scholarship-id-logo">EduTrack</div>
              <div class="scholarship-id-number" id="id-card-number">EDU-2026-00142</div>
            </div>
            <div class="scholarship-id-name" id="id-card-name">Aarati Tamang</div>
            <div class="scholarship-id-program" id="id-card-program">Girls Education Program 2026</div>
            <div class="scholarship-id-details">
              <div class="scholarship-id-detail"><label>School</label><span id="id-card-school">Shree Janapriya Secondary School</span></div>
              <div class="scholarship-id-detail"><label>Grade</label><span id="id-card-grade">Grade 8</span></div>
              <div class="scholarship-id-detail"><label>Valid Until</label><span>Dec 2026</span></div>
              <div class="scholarship-id-detail"><label>Status</label><span style="color: var(--emerald-400);">● Active</span></div>
            </div>
          </div>
          <div style="text-align: center;">
            <button class="btn btn-secondary" onclick="document.getElementById('id-card-modal').style.display='none'" style="background: rgba(255,255,255,0.1); color: white; border-color: rgba(255,255,255,0.2);">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Register Student Modal -->
    <div id="register-student-modal" style="display: none;">
      <div class="modal-overlay" onclick="if(event.target===this)document.getElementById('register-student-modal').style.display='none'">
        <div class="modal">
          <div class="modal-header">
            <h2>${icon('user-plus', 20)} Register New Student</h2>
            <button class="modal-close" onclick="document.getElementById('register-student-modal').style.display='none'">${icon('x', 18)}</button>
          </div>
          <div class="modal-body">
            <div class="form-row">
              <div class="form-group"><label class="form-label">Student Name</label><input class="form-input" type="text" placeholder="Full name" /></div>
              <div class="form-group"><label class="form-label">Age</label><input class="form-input" type="number" placeholder="Age" /></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label class="form-label">Grade</label><input class="form-input" type="number" placeholder="Grade" /></div>
              <div class="form-group"><label class="form-label">Location</label><input class="form-input" type="text" placeholder="District" /></div>
            </div>
            <div class="form-group"><label class="form-label">School</label><input class="form-input" type="text" placeholder="School name" /></div>
            <div class="form-group"><label class="form-label">Guardian Name & Relation</label><input class="form-input" type="text" placeholder="e.g., Sita Tamang (Mother)" /></div>
            <div class="form-group">
              <label class="form-label">Assign to Program</label>
              <select class="form-select"><option>Girls Education Program 2026</option><option>STEM Scholarship 2025</option></select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="document.getElementById('register-student-modal').style.display='none'">Cancel</button>
            <button class="btn btn-primary">${icon('user-plus', 16)} Register & Generate ID</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindNGOStudentsEvents() {
  const regBtn = document.getElementById('register-student-btn');
  const regModal = document.getElementById('register-student-modal');
  if (regBtn && regModal) {
    regBtn.addEventListener('click', () => regModal.style.display = 'block');
  }
}
