# A1 Construction — Full-Stack Website

**Client:** A1 Construction, Bengaluru  
**Stack:** React 18 + Vite + Tailwind CSS (Frontend) · Node.js + Express (Backend) · MySQL (Database)  
**Design:** Corporate Prestige — White header, image slider with text-zone overlay only, CMS admin

---

## Project Structure

```
a1construction/
├── frontend/          # React + Vite + Tailwind
│   └── src/
│       ├── components/
│       │   ├── layout/     Navbar.jsx, Footer.jsx
│       │   ├── sections/   HeroSlider, About, Services, Projects, etc.
│       │   ├── cms/        ProtectedRoute.jsx
│       │   └── ui/         SectionHeader.jsx (reusable)
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   ├── AdminLogin.jsx
│       │   └── AdminPage.jsx  (full CMS dashboard)
│       ├── context/        AuthContext.jsx
│       └── utils/          api.js (Axios + JWT)
│
└── backend/           # Node.js + Express + MySQL
    └── src/
        ├── config/     db.js, migrate.js
        ├── middleware/ auth.js (JWT)
        └── routes/     auth, content, admin, enquiries
```

---

## Quick Start

### 1. Prerequisites
- Node.js 18+
- MySQL 8+ (running locally)

### 2. Install all dependencies
```bash
npm run install:all
```

### 3. Configure environment
```bash
cp backend/.env.example backend/.env
```
Edit `backend/.env`:
```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=a1construction
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### 4. Run database migration & seed
```bash
npm run setup:db
```
This creates all tables and seeds sample data + admin user.

### 5. Start development servers

**Terminal 1 — Backend (port 5000):**
```bash
cd backend && npm run dev
```

**Terminal 2 — Frontend (port 5173):**
```bash
cd frontend && npm run dev
```

### 6. Open in browser
- **Website:** http://localhost:5173
- **CMS Admin:** http://localhost:5173/admin
- **Admin login:** `admin@a1construction.co.in` / `Admin@2024`

---

## API Endpoints

### Public
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/content/slides` | Hero slider slides |
| GET | `/api/content/projects` | Projects (optional `?category=`) |
| GET | `/api/content/services` | Services list |
| POST | `/api/enquiries` | Submit contact form |

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Returns JWT token |
| GET | `/api/auth/me` | Current user |

### Admin (JWT required)
| Method | Path | Description |
|--------|------|-------------|
| GET/POST | `/api/admin/slides` | Manage slides |
| PUT/DELETE | `/api/admin/slides/:id` | Edit/delete slide |
| GET/POST | `/api/admin/projects` | Manage projects |
| PUT/DELETE | `/api/admin/projects/:id` | Edit/delete project |
| GET/POST | `/api/admin/services` | Manage services |
| PUT/DELETE | `/api/admin/services/:id` | Edit/delete service |
| GET | `/api/admin/enquiries` | View all enquiries |

---

## Design Specifications

### Header (Navbar)
- Always **white background** (`bg-white`) — never transparent
- 3px gradient accent bar at top (navy → blue → navy)
- Logo: original dark colour (no invert)
- Nav links: navy text, blue underline on active/hover
- Active section tracking via scroll position
- Sticky with shadow on scroll
- Responsive mobile hamburger menu

### Hero Slider
- Full viewport height (clamp 520px → 860px)
- Image fills 100% background
- **Overlay only on text area** (left panel, ~52% width on desktop)
- No full-screen dark overlay — right side of image visible clearly
- Mobile: subtle full overlay for readability
- Auto-play 6s, manual prev/next, dot indicators
- Animated text transitions on slide change
- Stats bar at bottom (5 key metrics)

### Responsive Breakpoints
- `xs` 375px · `sm` 640px · `md` 768px · `lg` 1024px · `xl` 1280px · `2xl` 1536px

---

## CMS Admin Features
- Slide management (create, edit, delete, reorder)
- Project management (with category, location, image, description)
- Service management (icon, name, description, order)
- Enquiry inbox (read-only, with date/time)
- JWT authentication with auto-logout on token expiry

---

## Production Build

```bash
cd frontend && npm run build  # outputs to frontend/dist/
cd backend && npm start       # runs production server
```

Configure `backend/.env` with `NODE_ENV=production` and serve `frontend/dist/` via Nginx or similar.

---

*Designed & Developed by Sunsys Technologies for A1 Construction, Bengaluru*
