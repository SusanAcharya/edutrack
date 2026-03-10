// ========================================
// OpenScholar — Main Entry Point
// ========================================

import './styles/index.css';
import './styles/components.css';
import './styles/pages.css';

import { registerRoute, initRouter, navigate } from './router.js';
import { renderNavbar, bindNavbarEvents } from './components/navbar.js';
import { renderSidebar } from './components/sidebar.js';
import { refreshIcons } from './icons.js';

// Pages
import { renderLanding } from './pages/landing.js';
import { renderPublicDashboard } from './pages/public-dashboard.js';
import { renderDonorBrowse, bindDonorBrowseEvents } from './pages/donor/browse.js';
import { renderDonate, bindDonateEvents } from './pages/donor/donate.js';
import { renderDonorTrack } from './pages/donor/track.js';
import { renderNGODashboard } from './pages/ngo/dashboard.js';
import { renderNGOPrograms, bindNGOProgramsEvents } from './pages/ngo/programs.js';
import { renderNGOStudents, bindNGOStudentsEvents } from './pages/ngo/students.js';
import { renderNGOInvoices, bindNGOInvoicesEvents } from './pages/ngo/invoices.js';
import { renderNGOAllocation } from './pages/ngo/fund-allocation.js';
import { renderAdminDashboard } from './pages/admin/dashboard.js';
import { renderVerifyNGOs, bindVerifyNGOsEvents } from './pages/admin/verify-ngos.js';
import { renderBlacklist } from './pages/admin/blacklist.js';
import { renderStudentApply, bindStudentApplyEvents } from './pages/student/apply.js';
import { renderSchoolRegister } from './pages/school/register.js';
import { renderSchoolInvoices, bindSchoolInvoicesEvents } from './pages/school/invoices.js';

// State
let currentRole = 'public';
const app = document.getElementById('app');

const roleDefaultRoutes = {
    public: '/',
    donor: '/donor/browse',
    ngo: '/ngo/dashboard',
    admin: '/admin/dashboard',
    student: '/student/apply',
    school: '/school/register',
};

function getRoleFromRoute(route) {
    if (route.startsWith('/donor')) return 'donor';
    if (route.startsWith('/ngo')) return 'ngo';
    if (route.startsWith('/admin')) return 'admin';
    if (route.startsWith('/student')) return 'student';
    if (route.startsWith('/school')) return 'school';
    return 'public';
}

const fullPageRoutes = ['/', '/public-dashboard'];

function onRoleChange(role) {
    currentRole = role;
    navigate(roleDefaultRoutes[role]);
}

function renderPage(route) {
    const role = getRoleFromRoute(route);
    currentRole = role;
    const isFullPage = fullPageRoutes.includes(route);

    if (isFullPage) {
        if (route === '/') {
            app.innerHTML = renderNavbar(currentRole, onRoleChange, true) + renderLanding();
        } else if (route === '/public-dashboard') {
            app.innerHTML = `
                ${renderNavbar(currentRole, onRoleChange, false)}
                <div style="padding-top: var(--navbar-height);">
                    <div class="main-content no-sidebar">
                        ${renderPublicDashboard()}
                    </div>
                </div>
            `;
        }
    } else {
        let pageContent = '';
        let afterRender = null;

        switch (route) {
            case '/donor/browse':
                pageContent = renderDonorBrowse();
                afterRender = bindDonorBrowseEvents;
                break;
            case '/donor/donate':
                pageContent = renderDonate();
                afterRender = bindDonateEvents;
                break;
            case '/donor/track':
                pageContent = renderDonorTrack();
                break;
            case '/ngo/dashboard':
                pageContent = renderNGODashboard();
                break;
            case '/ngo/programs':
                pageContent = renderNGOPrograms();
                afterRender = bindNGOProgramsEvents;
                break;
            case '/ngo/students':
                pageContent = renderNGOStudents();
                afterRender = bindNGOStudentsEvents;
                break;
            case '/ngo/invoices':
                pageContent = renderNGOInvoices();
                afterRender = bindNGOInvoicesEvents;
                break;
            case '/ngo/allocation':
                pageContent = renderNGOAllocation();
                break;
            case '/admin/dashboard':
                pageContent = renderAdminDashboard();
                break;
            case '/admin/verify':
                pageContent = renderVerifyNGOs();
                afterRender = bindVerifyNGOsEvents;
                break;
            case '/admin/blacklist':
                pageContent = renderBlacklist();
                break;
            case '/student/apply':
                pageContent = renderStudentApply();
                afterRender = bindStudentApplyEvents;
                break;
            case '/school/register':
                pageContent = renderSchoolRegister();
                break;
            case '/school/invoices':
                pageContent = renderSchoolInvoices();
                afterRender = bindSchoolInvoicesEvents;
                break;
            default:
                pageContent = `
                    <div class="empty-state">
                        <i data-lucide="search" style="width:48px;height:48px;color:var(--navy-400);"></i>
                        <h3>Page Not Found</h3>
                        <p>The page you're looking for doesn't exist.</p>
                    </div>
                `;
        }

        app.innerHTML = `
            ${renderNavbar(currentRole, onRoleChange, false)}
            <div class="layout-with-sidebar">
                ${renderSidebar(role, route)}
                <div class="main-content">
                    ${pageContent}
                </div>
            </div>
        `;

        if (afterRender) afterRender();
    }

    bindNavbarEvents(onRoleChange);
    refreshIcons();
    window.scrollTo(0, 0);
}

const allRoutes = [
    '/', '/public-dashboard',
    '/donor/browse', '/donor/donate', '/donor/track',
    '/ngo/dashboard', '/ngo/programs', '/ngo/students', '/ngo/invoices', '/ngo/allocation',
    '/admin/dashboard', '/admin/verify', '/admin/blacklist',
    '/student/apply',
    '/school/register', '/school/invoices',
];

allRoutes.forEach(route => {
    registerRoute(route, () => renderPage(route));
});

initRouter();
