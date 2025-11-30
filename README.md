
Gstore Career Portal 🚀

This is a modern Full-Stack application designed to manage Gstore's job vacancies and incoming resumes. The project is built following modular architecture principles, ensuring code cleanliness, scalability, and ease of maintenance.

🔗 Live Demo

The project is deployed and fully functional. You can access it here:

-Frontend (Vercel): [https://gstore-career.vercel.app](https://gstore-career.vercel.app/)
-Admin Access: Click the lock icon in the footer or append /admin to the frontend URL.

The project consists of two main parts:

1.Public Portal: For candidates to view vacancies and submit applications.
2.Admin Panel: For HR managers to manage vacancies and process the applicant database.

🛠 Tech Stack

The project utilizes the latest industry-standard technologies:

Frontend  -React (Vite) , TypeScript, TanStack Query , Tailwind CSS
Backend   - Node.js + Express , Modular Architecture , Multer
Database - PostgreSQL, Prisma ORM

✨ Key Features

🌍 Public Side (User)
-Vacancy Listing: Displays active vacancies as cards (expired vacancies are automatically hidden).
-Search & Filter: Search for vacancies by title.
-Detailed Page: Full description of the vacancy, requirements, and conditions.
Application Form:
  -Drag & Drop: Easy resume upload.
  -Validation: Checks for Name (min. 2 words), Email format, and Phone number.
  -PDF Only: Restricts uploads to PDF format only (secured on both frontend and backend).

🔒 Admin Panel (Admin)

-Access: Hidden button in the footer (/admin).
-Applicant Database: Table view of all incoming applications.
  -Filter by vacancy.
  -Sort by date and name.
  -CV Download: Direct download link for resumes.

Vacancy Management:
-Add new vacancies (with deadline specification).
-Delete vacancies (automatically cascades and deletes associated applications).

📂 Project Structure

The project uses a Monorepo structure (Frontend and Backend together):
gstore-career/
├── client/                 # React Frontend Application
│   ├── src/
│   │   ├── api/            # API Layer
│   │   │   ├── hooks/      # Custom React Query Hooks (useVacancies, useApplications)
│   │   │   └── services/   # Pure Axios Services (API calls separated from UI)
│   │   ├── components/     # Reusable UI Components (Header, Modal, Card)
│   │   ├── pages/          # Page Views (HomePage, AdminPage)
│   │   └── types/          # TypeScript Interfaces
│   └── ...
└── server/                 # Node.js Backend Application
    ├── prisma/             # Database Schema & Migrations
    ├── src/
    │   ├── config/         # DB Connection
    │   ├── controllers/    # Request/Response Logic
    │   ├── middleware/     # File Upload Logic
    │   ├── routes/         # API Route Definitions
    │   └── services/       # Business Logic
    └── uploads/            # Temporary storage for Resume files



🚀 Setup Instructions (Local)

To run the project on your machine locally (for development), follow these steps:

1. Clone the Repository
git clone [https://github.com/anritsetskhla10/gstore-career](https://github.com/anritsetskhla10/gstore-career)
cd gstore-career

2. Backend Setup
-Navigate to the server directory and install dependencies:
cd server
npm install

-Create a .env file in the server directory and add your PostgreSQL database link:
DATABASE_URL=""

-Run migrations to create the database schema and start the server:
npx prisma db push
npm run dev

3. Frontend Setup

Open a new terminal, navigate to the client directory:
cd client
npm install
npm run dev

🌐 Deployment Overview

The live project is deployed using the following infrastructure:

Database: Neon.tech (PostgreSQL).
Backend: Render.com (Web Service).
Frontend: Vercel (Static Site).
