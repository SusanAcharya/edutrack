# EduTrack

**Transparent education funding platform** — connecting donors with verified NGOs and scholarship programs, ensuring full accountability in how funds reach the children who need them most.

## Overview

EduTrack is a prototype web application that enables:

- **Donors** to browse verified NGOs, scholarship programs, and individual students — then donate and track exactly where their money goes
- **NGO Admins** to manage scholarship programs, register students, allocate funds, and submit documentation
- **Schools** to register as partners, submit invoices for tuition/uniforms/books, and track funding
- **Students** to apply for scholarships and view their digital scholarship ID
- **System Admins** to verify NGOs, manage platform integrity, and oversee fund flows
- **Public viewers** to see a transparency dashboard with total scholarships funded and spending breakdowns

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build | [Vite](https://vitejs.dev/) |
| Language | Vanilla JavaScript (ES Modules) |
| Styling | Custom CSS (design tokens, no framework) |
| Icons | [Lucide](https://lucide.dev/) |
| Fonts | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts) |
| Routing | Hash-based SPA router |
| Data | In-memory mock data (no backend) |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

The dev server runs at `http://localhost:5173` (or next available port).

## Project Structure

```
src/
├── main.js              # App entry, layout rendering, role switching
├── router.js            # Hash-based SPA router
├── icons.js             # Lucide icon helper
├── data/
│   └── mock.js          # All mock data (NGOs, programs, students, donors, etc.)
├── components/
│   └── navbar.js        # Shared navbar component
├── pages/
│   ├── landing.js       # Public landing page
│   ├── public-dashboard.js  # Transparency dashboard
│   ├── donor/           # Donor portal (browse, donate, track)
│   ├── ngo/             # NGO admin (dashboard, programs, students, invoices, allocations)
│   ├── admin/           # System admin (dashboard, NGO verification, reports)
│   ├── school/          # School portal (dashboard, invoices)
│   └── student/         # Student portal (scholarship ID, applications)
└── styles/
    ├── index.css        # Design system tokens (colors, typography, spacing, animations)
    ├── components.css   # Reusable component styles (navbar, sidebar, cards, tables, modals)
    └── pages.css        # Page-specific styles (hero, trust section, NGO cards, forms)
```

## User Roles

Switch between roles using the **"View as"** dropdown in the navbar:

| Role | Routes | Description |
|------|--------|-------------|
| **Public** | `/`, `/public-dashboard` | Landing page and transparency dashboard |
| **Donor** | `/donor/browse`, `/donor/donate`, `/donor/track` | Browse NGOs/programs, make donations, track fund usage |
| **NGO Admin** | `/ngo/dashboard`, `/ngo/programs`, `/ngo/students`, `/ngo/invoices`, `/ngo/allocations` | Manage programs, students, invoices, and fund allocation |
| **School** | `/school/dashboard`, `/school/invoices` | Submit and track invoices |
| **Student** | `/student/dashboard` | View scholarship ID and application status |
| **Admin** | `/admin/dashboard`, `/admin/ngos`, `/admin/reports` | Verify NGOs, manage platform, view reports |

## Design System

The app uses a **warm teal + gray** color palette with design tokens defined in CSS custom properties:

- **Primary**: Teal (`#14b8a6`) — buttons, accents, active states
- **Neutrals**: Warm grays — backgrounds, text, borders
- **Semantic**: Sky (info), Amber (warning), Rose (danger), Violet (secondary)
- **Typography**: Inter font family with 300–800 weight range
- **Components**: Pill tabs, glassmorphism navbar, gradient buttons, shimmer progress bars

## License

This is a prototype / proof-of-concept. Not intended for production use.
# edutrack
# edutrack
