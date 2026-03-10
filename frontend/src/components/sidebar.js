// ========================================
// OpenScholar — Sidebar Component
// ========================================

import { icon } from '../icons.js';

export function renderSidebar(role, activeLink) {
    const links = getSidebarLinks(role);

    return `
    <aside class="sidebar">
      ${links.map(section => `
        <div class="sidebar-section">
          <div class="sidebar-section-title">${section.title}</div>
          ${section.items.map(item => `
            <a class="sidebar-link${activeLink === item.route ? ' active' : ''}"
               href="#${item.route}"
               data-route="${item.route}">
              <span class="icon">${item.icon}</span>
              <span>${item.label}</span>
              ${item.badge ? `<span class="sidebar-badge">${item.badge}</span>` : ''}
            </a>
          `).join('')}
        </div>
      `).join('')}
    </aside>
  `;
}

function getSidebarLinks(role) {
    switch (role) {
        case 'donor':
            return [{
                title: 'Donor Portal',
                items: [
                    { icon: icon('search', 18), label: 'Browse & Discover', route: '/donor/browse' },
                    { icon: icon('credit-card', 18), label: 'Make Donation', route: '/donor/donate' },
                    { icon: icon('bar-chart-3', 18), label: 'Track Funds', route: '/donor/track' },
                ]
            }];

        case 'ngo':
            return [{
                title: 'Management',
                items: [
                    { icon: icon('layout-dashboard', 18), label: 'Dashboard', route: '/ngo/dashboard' },
                    { icon: icon('folder-open', 18), label: 'Programs', route: '/ngo/programs' },
                    { icon: icon('graduation-cap', 18), label: 'Students', route: '/ngo/students' },
                    { icon: icon('file-text', 18), label: 'Invoices', route: '/ngo/invoices', badge: '2' },
                    { icon: icon('wallet', 18), label: 'Fund Allocation', route: '/ngo/allocation' },
                ]
            }];

        case 'admin':
            return [{
                title: 'Administration',
                items: [
                    { icon: icon('layout-dashboard', 18), label: 'Dashboard', route: '/admin/dashboard' },
                    { icon: icon('shield-check', 18), label: 'Verify NGOs', route: '/admin/verify', badge: '1' },
                    { icon: icon('ban', 18), label: 'Blacklist', route: '/admin/blacklist' },
                ]
            }];

        case 'student':
            return [{
                title: 'Student Portal',
                items: [
                    { icon: icon('file-text', 18), label: 'Apply for Scholarship', route: '/student/apply' },
                ]
            }];

        case 'school':
            return [{
                title: 'School Portal',
                items: [
                    { icon: icon('list-checks', 18), label: 'Registration', route: '/school/register' },
                    { icon: icon('file-text', 18), label: 'Invoices', route: '/school/invoices' },
                ]
            }];

        default:
            return [];
    }
}
