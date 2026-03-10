// ========================================
// OpenScholar — Navbar Component
// ========================================

import { icon } from '../icons.js';

export function renderNavbar(currentRole, onRoleChange, isDark = false) {
  const roleIcons = {
    public: icon('globe', 14),
    donor: icon('heart', 14),
    ngo: icon('building-2', 14),
    admin: icon('wrench', 14),
    student: icon('graduation-cap', 14),
    school: icon('school', 14),
  };

  return `
    <nav class="navbar${isDark ? ' dark' : ''}" id="main-navbar">
      <a class="navbar-brand" onclick="window.location.hash='/'">
        <div class="navbar-logo">OS</div>
        <span>OpenScholar</span>
      </a>
      <div class="navbar-right">
        <div class="role-switcher">
          <label for="role-select">View as:</label>
          <select id="role-select">
            <option value="public"${currentRole === 'public' ? ' selected' : ''}>Public</option>
            <option value="donor"${currentRole === 'donor' ? ' selected' : ''}>Donor</option>
            <option value="ngo"${currentRole === 'ngo' ? ' selected' : ''}>NGO Admin</option>
            <option value="admin"${currentRole === 'admin' ? ' selected' : ''}>System Admin</option>
            <option value="student"${currentRole === 'student' ? ' selected' : ''}>Student</option>
            <option value="school"${currentRole === 'school' ? ' selected' : ''}>School</option>
          </select>
        </div>
      </div>
    </nav>
  `;
}

export function bindNavbarEvents(onRoleChange) {
  const select = document.getElementById('role-select');
  if (select) {
    select.addEventListener('change', (e) => {
      onRoleChange(e.target.value);
    });
  }
}
