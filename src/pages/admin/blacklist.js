// ========================================
// EduTrack — System Admin: Blacklist
// ========================================

import { ngos, students } from '../../data/mock.js';
import { icon } from '../../icons.js';

export function renderBlacklist() {
  return `
    <div class="page-header animate-fade-in">
      <h1>Blacklist Management</h1>
      <p>Search and manage blacklisted NGO and student accounts</p>
    </div>

    <div style="display: flex; gap: var(--space-4); margin-bottom: var(--space-6);" class="animate-fade-in">
      <div class="search-box" style="flex: 1; max-width: 500px;">
        <span class="search-icon">${icon('search', 16)}</span>
        <input type="text" placeholder="Search accounts by name, ID, or location..." />
      </div>
      <select class="form-select" style="width: auto; min-width: 180px;">
        <option value="all">All Accounts</option>
        <option value="ngos">NGOs Only</option>
        <option value="students">Students Only</option>
      </select>
    </div>

    <!-- Currently Blacklisted -->
    <div class="card animate-fade-in-up" style="margin-bottom: var(--space-8);">
      <h2 style="font-size: var(--font-xl); font-weight: 700; margin-bottom: var(--space-5);">Blacklisted Accounts</h2>
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        <div style="padding: var(--space-5); border: 1px solid var(--red-100); border-radius: var(--radius-md); background: var(--red-50);">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: var(--space-3);">
              <div class="table-avatar" style="background: var(--red-500); color: white;">${icon('building-2', 18)}</div>
              <div>
                <strong>Learn & Grow Trust</strong>
                <span class="badge badge-rejected" style="margin-left: var(--space-2);">${icon('ban', 10)} Rejected</span>
                <div style="font-size: var(--font-xs); color: var(--text-tertiary);">${icon('map-pin', 12)} Chitwan, Nepal · NGO Account</div>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm">${icon('check-circle', 14)} Unblacklist</button>
          </div>
          <div style="margin-top: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--red-100);">
            <div style="font-size: var(--font-xs); color: var(--text-tertiary); margin-bottom: var(--space-1);">Reason for blacklisting:</div>
            <p style="font-size: var(--font-sm); color: var(--text-secondary);">Incomplete registration documents. Tax clearance document expired and company registration not verified by authorities.</p>
            <div style="font-size: var(--font-xs); color: var(--text-tertiary); margin-top: var(--space-2);">${icon('calendar', 12)} Blacklisted on: Jan 22, 2025 by Admin</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Audit Trail -->
    <div class="card animate-fade-in-up">
      <h2 style="font-size: var(--font-xl); font-weight: 700; margin-bottom: var(--space-5);">${icon('list-checks', 20)} Audit Trail</h2>
      <div class="table-wrapper" style="border: none;">
        <table class="data-table">
          <thead><tr><th>Date</th><th>Action</th><th>Account</th><th>Type</th><th>Admin</th><th>Reason</th></tr></thead>
          <tbody>
            <tr>
              <td style="font-size: var(--font-sm);">Jan 22, 2025</td>
              <td><span class="badge badge-rejected">${icon('ban', 10)} Blacklisted</span></td>
              <td style="font-weight: 500;">Learn & Grow Trust</td>
              <td>NGO</td>
              <td style="font-size: var(--font-sm);">Admin User</td>
              <td style="font-size: var(--font-sm); color: var(--text-secondary);">Incomplete documents</td>
            </tr>
            <tr>
              <td style="font-size: var(--font-sm);">Dec 15, 2024</td>
              <td><span class="badge badge-verified">${icon('check-circle', 10)} Unblacklisted</span></td>
              <td style="font-weight: 500;">Sunlight Foundation</td>
              <td>NGO</td>
              <td style="font-size: var(--font-sm);">Admin User</td>
              <td style="font-size: var(--font-sm); color: var(--text-secondary);">Documents resubmitted and verified</td>
            </tr>
            <tr>
              <td style="font-size: var(--font-sm);">Nov 3, 2024</td>
              <td><span class="badge badge-rejected">${icon('ban', 10)} Blacklisted</span></td>
              <td style="font-weight: 500;">Raj K. (Student)</td>
              <td>Student</td>
              <td style="font-size: var(--font-sm);">Admin User</td>
              <td style="font-size: var(--font-sm); color: var(--text-secondary);">Fraudulent scholarship application</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}
