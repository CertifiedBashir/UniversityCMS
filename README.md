# Tazkiyah CMS

> **Nigeria's First All-Female University Portal & Content Management System**  
> Located in Zaria, Kaduna State.

Tazkiyah CMS is a full-stack Content Management System (CMS) and web application designed specifically for **Tazkiyah University**. It combines an Express.js & MongoDB backend with a client-side Single Page Application (SPA) frontend to deliver content management, dynamic navigation, banner carousels, academic pages, and administrative controls.

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Installation Steps](#installation-steps)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Deployment Instructions](#deployment-instructions)
- [License](#license)

---

## Features

- 🌟 **Dynamic Navigation Engine**: Manage header/footer menus, submenus, display order, and active visibility dynamically via MongoDB.
- 🎠 **Homepage Hero Carousel**: Manage slide headlines, subtitles, call-to-action buttons, background imagery, and order.
- 📄 **Dynamic Page Rendering**: Render rich content pages (About Us, Academics, Admissions, News & Events, Contact, etc.) with client-side SPA routing and server-side fallback.
- 🔐 **User Roles & Authentication**: Secure JWT-based authentication system with support for **Super Admin**, **Admin**, and **Editor** roles.
- 🌱 **Automated Database Seeding**: Automatic database initialization on startup—seeding default admin credentials, menu items, hero carousels, and core pages if the database is empty.
- 🛡️ **Offline/Fallback Resilience**: Handles connection drops gracefully without crashing the server.
- 🎨 **Modern Design System**: Responsive CSS design system tailored with Google Fonts (*Inter* and *Playfair Display*), smooth animations, glassmorphism, and accessible UI controls.

---

## Technology Stack

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (v18+)
- **Framework**: [Express.js](https://expressjs.com/) (v5.x)
- **Database**: [MongoDB](https://www.mongodb.com/) / [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose](https://mongoosejs.com/) ORM (v9.x)
- **Security & Auth**: `bcryptjs` (password hashing), `jsonwebtoken` (JWT authentication), `cors` (Cross-Origin Resource Sharing)
- **Environment**: `dotenv`

### Frontend
- **Core**: HTML5, Vanilla JavaScript (ES6+ Modular Architecture)
- **Styling**: Vanilla CSS3 (Custom design system with tokens, variables, CSS Grid, and Flexbox)
- **Icons & Fonts**: FontAwesome 6, Google Fonts (*Inter* & *Playfair Display*)
- **Routing**: Client-side hash & pathname SPA routing with server-side static fallback

---

## Folder Structure

```text
Tazkiyah CMS/
├── backend/
│   ├── controllers/         # Request handlers for API routes
│   │   ├── authController.js
│   │   ├── carouselController.js
│   │   ├── menuController.js
│   │   └── pageController.js
│   ├── models/              # Mongoose database schemas
│   │   ├── Carousel.js
│   │   ├── Menu.js
│   │   ├── Page.js
│   │   └── User.js
│   ├── routes/              # Express API route declarations
│   │   ├── authRoutes.js
│   │   ├── carouselRoutes.js
│   │   ├── menuRoutes.js
│   │   └── pageRoutes.js
│   ├── services/            # Business logic and service abstractions
│   ├── scripts/             # Data migration and utility scripts
│   ├── public/              # Backend static uploads & images
│   ├── .env                 # Environment configuration (ignored in git)
│   ├── package.json         # Node.js dependencies and scripts
│   └── server.js            # Express application entry point
├── frontend/
│   ├── css/
│   │   └── style.css        # Core stylesheet & design system
│   ├── js/
│   │   ├── api.js           # API integration module (TazkiyahAPI)
│   │   ├── app.js           # Main SPA client application logic
│   │   ├── config.js        # Site configuration & defaults
│   │   └── pages/           # Page component renderers
│   ├── images/              # Static frontend visual assets
│   ├── controllers/         # Client controller modules
│   ├── routes/              # Client router helpers
│   ├── services/            # Client service helpers
│   └── index.html           # Main HTML document entry point
├── .gitignore               # Git ignored patterns
└── README.md                # Project documentation
```

---

## Prerequisites

Before setting up the project, ensure you have the following installed on your machine:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: A running local MongoDB instance or a [MongoDB Atlas](https://www.mongodb.com/atlas) cloud cluster string.

---

## Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/CertifiedBashir/UniversityCMS.git
   cd "Tazkiyah CMS"
   ```

2. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Configure Environment Variables**:
   Create a `.env` file in the `backend` directory (or edit the existing one):
   ```bash
   cp .env.example .env   # Or create .env manually
   ```

---

## Environment Variables

The backend relies on the following environment variables defined in `backend/.env`:

| Variable | Description | Default / Example Value |
| :--- | :--- | :--- |
| `PORT` | HTTP port for the Express backend server | `5000` |
| `MONGO_URI` | MongoDB connection string (Local or MongoDB Atlas) | `mongodb://localhost:27017/tazkiyah_cms` |
| `JWT_SECRET` | Secret key used for signing JWT authentication tokens | `your_super_secret_jwt_key` |

### Sample `backend/.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tazkiyah_cms?retryWrites=true&w=majority
JWT_SECRET=tazkiyah_super_secret_jwt_key_2026
```

---

## Running the Application

### Development Mode (with hot reloading via `nodemon`)
```bash
cd backend
npm run dev
```

### Production / Standard Mode
```bash
cd backend
npm start
```

Once started, the Express server will automatically serve both:
- **API Endpoints**: `http://localhost:5000/api/*`
- **Frontend SPA**: `http://localhost:5000`

### Default Admin Credentials
Upon first launch, the application seeds a default Super Admin account if none exists:
- **Email**: `admin@tazkiyah.edu.ng`
- **Password**: `superadmin123`

*(Note: Make sure to change the default password in a production deployment!)*

---

## API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/menus` | Fetch active navigation menus | Public |
| `GET` | `/api/carousel` | Fetch active hero carousel slides | Public |
| `GET` | `/api/pages` | Fetch list of published pages | Public |
| `GET` | `/api/pages/:slug` | Fetch single page content by slug | Public |
| `POST` | `/api/auth/login` | Authenticate user and receive JWT | Public |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Private (JWT) |

---

## Deployment Instructions

### Option 1: Unified Node.js Deployment (Render / Railway / VPS)

Since `server.js` serves both the Express API and the static `frontend` files, you can deploy the `backend` folder as a single Web Service:

1. **Set Root / Working Directory**: Set the root directory to `backend`.
2. **Build Command**: `npm install`
3. **Start Command**: `npm start`
4. **Environment Variables**: Add `PORT`, `MONGO_URI`, and `JWT_SECRET` in your hosting dashboard settings.
5. **Static Path**: Ensure `server.js` points to the correct relative path for the frontend static directory (`path.join(__dirname, '../frontend')`).

### Option 2: Decoupled Frontend (Netlify / Vercel) + Backend API

If deploying the frontend separately:
1. Update `BASE` in `frontend/js/api.js` to point to your live backend domain:
   ```javascript
   const BASE = 'https://your-api-domain.com/api';
   ```
2. Deploy `frontend` directory to static hosting (Netlify, Vercel, GitHub Pages).
3. Ensure CORS is enabled on the backend server for your frontend domain.

---

## License

This project is licensed under the **ISC License**.

```text
ISC License

Copyright (c) 2026 Tazkiyah University / Nile Consult

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```
