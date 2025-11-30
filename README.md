Gstore Career Portal - Full-Stack Assignment

This project is a modular, full-stack career portal designed to evaluate modern development skills, including clean code architecture, database management, file handling, and UI/UX implementation using React with TanStack Query.

🚀 Tech Stack & Architecture

Layer

Technology

Key Features

Frontend

React, TypeScript, Vite, Tailwind CSS, TanStack Query

Modular structure (pages, components, hooks, services), Modern UI/UX, Optimized state management.

Backend

Node.js (Express), TypeScript

Modular Architecture (controllers, services, routes), Multer for file handling.

Database

PostgreSQL (via Neon.tech)

Scalable production-ready database (migrated from SQLite).

ORM

Prisma

Schema management, Type-safe database queries.

✨ Core Features Implemented

Public Portal (/)

Vacancy Listing: Displays all active vacancies. Expired jobs are filtered out.

Modern UI: Clean, minimalist design inspired by modern job boards, adhering strictly to Gstore brand colors.

Vacancy Details (/vacancy/:id): Dedicated page showing the full job description and details.

Application Form:

Validation: Strict validation for Full Name (min. 2 words), Email (Regex), and Phone (min. 9 digits).

CV Upload: Exclusive support for PDF files (validated on both client and server).

Bonus UI: Drag & Drop functionality for resumes.

State Management: All data fetching and mutation managed by TanStack Query for caching and real-time updates.

Admin Panel (/admin)

Access: Hidden link in the footer (/admin) for security (no public navigation).

Manage Applications: View a comprehensive table of all applicants.

Filtering: Filter applicants by specific vacancy.

Sorting: Sort by Date (Newest/Oldest) and Name (A-Z/Z-A).

Download: Direct link to download the stored PDF resume.

Manage Vacancies:

Create: Form to add new vacancies with location, salary, description, and Deadline (Expiration Date).

Delete: Permanent removal of a vacancy (cascades and deletes associated applications).

📂 Project Structure (Clean Code)

The architecture is split into clean, single-responsibility modules:

gstore-career/
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   ├── hooks/      (TanStack Query Logic: useVacancies, useApplications)
│   │   │   └── services/   (Axios Calls: vacancy.service.ts, application.service.ts)
│   │   ├── components/     (Reusable UI: Modal, Header, ApplyModal)
│   │   └── pages/          (Page Logic: HomePage, AdminPage)
│   └── ...
└── server/
    ├── prisma/
    │   └── schema.prisma   (PostgreSQL Configuration)
    ├── src/
    │   ├── config/         (db.ts - Prisma Client)
    │   ├── controllers/    (Main Business Logic)
    │   ├── middleware/     (upload.ts - Multer Config)
    │   └── routes/         (API Endpoints)
    └── ...


🛠️ Deployment Guide (Live Setup)

This project uses a standard Monorepo setup deployed to different specialized platforms for maximum efficiency.

Prerequisites (Global)

GitHub Repository: Ensure the full project is committed and pushed.

Neon.tech Account: Create a PostgreSQL database (Free Tier). Copy the Connection String.

Render.com Account: For the Node.js backend.

Vercel Account: For the React frontend.

A. Backend Deployment (Render.com)

The server is configured to run PostgreSQL via the DATABASE_URL environment variable.

Create Web Service: On Render, select "Web Service".

Connect: Link your GitHub repository.

Configuration:

Root Directory: server (CRITICAL!)

Runtime: Node

Build Command: npm install && npx prisma generate && npm run build

Start Command: npm start

Environment Variables:

Key: DATABASE_URL

Value: Paste your Neon.tech Connection String here.

Deploy: Once live, copy the final Render URL (e.g., https://gstore-api-xxxx.onrender.com). This is your {BACKEND_URL}.

B. Frontend Deployment (Vercel)

The React app will be served statically by Vercel.

Create Project: On Vercel, select "Add New Project".

Connect: Link your GitHub repository.

Configuration:

Framework Preset: Vite

Root Directory: client (CRITICAL!)

Build Command: npm run build

Environment Variables (CRITICAL STEP):

Key: VITE_API_URL

Value: Paste your {BACKEND_URL} from Render, with the /api endpoint appended.

Example: https://gstore-api-xxxx.onrender.com/api

Deploy: Deploy the project. The resulting Vercel URL is your public website.