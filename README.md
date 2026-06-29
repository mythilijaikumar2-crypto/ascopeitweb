# Ascope Tech - Premium Software Engineering Portal

Ascope Tech is a premium, modern, and production-ready enterprise application built for a high-end Software Development Company. The project is engineered with a luxury corporate aesthetic, high-performance architectures, dynamic animations, and complete responsiveness.

---

## 📂 Project Directory Structure

```text
ascope-tech/
├── frontend/               # React + Vite + TS Frontend Portal
│   ├── src/                # Components, pages, hooks, services, routing
│   ├── public/             # Static public assets
│   ├── package.json        # Frontend specific packages
│   └── vite.config.ts      # Vite compilation configurations
│
├── backend/                # Node + Express + Prisma + PostgreSQL Backend
│   ├── prisma/             # Schema definitions and database seeds
│   ├── src/                # Controllers, services, repositories, middlewares, validators
│   ├── uploads/            # Local uploads sandbox (stores resumes)
│   └── package.json        # Backend specific packages
│
├── package.json            # Root workspace workspace launcher script configurations
└── README.md               # Main instructions and setup documentation
```

---

## 🛠️ Installation & Getting Started

### 1. Clone the repository and install all dependencies
From the project root directory, run:
```bash
npm run install:all
```
This automatically runs `npm install` inside both the `/frontend` and `/backend` directories.

### 2. Launch local servers
*   To launch **both frontend and backend concurrently**:
    ```bash
    npm run dev
    ```
    This launches the Vite dev server (`http://localhost:5173`) and the Express API server (`http://localhost:5001`) concurrently.
*   To run the **frontend only**:
    ```bash
    npm run dev:frontend
    ```
*   To run the **backend only**:
    ```bash
    npm run dev:backend
    ```

### 3. Build compile tests
*   To build the production bundle of both applications:
    ```bash
    npm run build
    ```
*   To compile **frontend only**:
    ```bash
    npm run build:frontend
    ```
*   To compile **backend only**:
    ```bash
    npm run build:backend
    ```

---

## 🔗 End-to-End API Integration

The portal features an integrated API client layer supporting contact scoping, job applications, internship tracks, and bootcamp registrations.

### 1. Frontend API Client ([api.ts](file:///Users/apple/Desktop/projcets/ascope%20tech/ascopetech2nd/frontend/src/services/api.ts))
The client communicates via JSON payloads with the backend:
- `api.submitContact(payload)` &rarr; `POST /api/contact`
- `api.submitCareerApplication(payload)` &rarr; `POST /api/careers/apply` (transmits resumes as Base64 strings)
- `api.submitInternshipApplication(payload)` &rarr; `POST /api/internship/apply`
- `api.submitTrainingEnrollment(payload)` &rarr; `POST /api/training/enroll`

### 2. Backend Server ([server.ts](file:///Users/apple/Desktop/projcets/ascope%20tech/ascopetech2nd/backend/src/server.ts))
A Node.js + Express backend processes incoming scoping arrays, parses Base64 attachments, and writes uploaded candidate resumes into a local folder (`backend/uploads/`).

---

## 🎨 Design System & Aesthetics

- **Visual Theme**: High-contrast, clean corporate light mode.
- **Card Elements (`.glass-card`)**: Solid white backgrounds with subtle slate borders and drop-shadows:
  `bg-white border border-slate-100 shadow-premium`
- **Navigation (`.glass-nav`)**: Sticky top navbar with a solid white background and a thin divider border:
  `bg-white border-b border-slate-100 shadow-sm`
- **Branding Gradients**: Custom `brand-gradient` defined as a smooth linear layout transitioning from deep corporate blue to clear light-sky blue.
