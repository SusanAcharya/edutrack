// ========================================
// OpenScholar — Hash-based SPA Router
// ========================================

const routes = {};
let currentRoute = null;
let beforeNavigate = null;

export function registerRoute(path, handler) {
    routes[path] = handler;
}

export function navigate(path) {
    window.location.hash = path;
}

export function setBeforeNavigate(fn) {
    beforeNavigate = fn;
}

export function getCurrentRoute() {
    return currentRoute;
}

function handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    currentRoute = hash;

    if (beforeNavigate) {
        beforeNavigate(hash);
    }

    // Try exact match first
    if (routes[hash]) {
        routes[hash]();
        return;
    }

    // Try prefix match for nested routes
    const parts = hash.split('/').filter(Boolean);
    while (parts.length > 0) {
        const prefix = '/' + parts.join('/');
        if (routes[prefix]) {
            routes[prefix]();
            return;
        }
        parts.pop();
    }

    // Fallback to landing
    if (routes['/']) {
        routes['/']();
    }
}

export function initRouter() {
    window.addEventListener('hashchange', handleRoute);
    // Handle initial load
    handleRoute();
}
