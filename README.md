# 🌱 LOCAL ECO TRACKER
### 3rd-Year B.Sc. Computer Science Mini Project

> **"Small eco-friendly actions today create a greener tomorrow."**

A full-stack web application designed to encourage, record, and quantify local environmental actions. Local Eco Tracker allows community members and students to log eco-friendly activities with photo proof, earn verified Eco Points, track progress toward sustainability milestones, report local waste hotspots with photographic evidence, and locate neighborhood recycling facilities.

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [Image Upload Architecture](#image-upload-architecture)
5. [Project Architecture & Folder Structure](#project-architecture--folder-structure)
6. [Installation & Setup](#installation--setup)
7. [MongoDB Atlas Setup Guide](#mongodb-atlas-setup-guide)
8. [Environment Variables](#environment-variables)
9. [Running the Application](#running-the-application)
10. [API Documentation](#api-documentation)
11. [Academic Viva Questions & Answers](#academic-viva-questions--answers)
12. [Future Scope](#future-scope)

---

## 🌟 Project Overview

Local Eco Tracker bridges the gap between personal environmental awareness and quantifiable civic action:

```text
User Registration / Login
         │
         ▼
Personalized Dashboard
         │
         ▼
Log Eco-Friendly Action + Optional Photo Proof (Multer)
         │
         ▼
Backend Validation & Server-Controlled Points Calculation
         │
         ▼
MongoDB Document Storage & User Total Increment
         │
         ▼
Dynamic Progress Bar (0 → 200 pts), Photo Lightbox & Badges Unlocked
```

---

## ✨ Key Features

- **Authentication & Security:**
  - Secure registration and login using JWT (JSON Web Tokens).
  - Passwords hashed using `bcryptjs` before persisting to database.
  - Client-side token storage in `localStorage` with automated Axios Authorization header injection.
  - Route protection preventing unauthorized access to private pages.
- **Eco Activities & Points Engine:**
  - Server-calculated points algorithm preventing client-side point manipulation.
  - Predefined actions: Tree Planting (+20), Plastic Recycling (+10), Cycling (+15), Public Transport (+10), Reusable Bottle (+5), Saving Electricity (+5), Avoiding Single-Use Plastics (+10).
- **📸 Image Upload & Proof System:**
  - **Activity Proof Photos:** Users can attach photos (e.g. planted sapling, recycling drop-off) when logging an activity.
  - **Waste Hotspot Photos:** Community members can photograph uncollected waste or illegal dumping.
  - **Instant Client-Side Preview:** Uses HTML5 `FileReader` for immediate thumbnail preview with clear/remove options before upload.
  - **Server-Side File Validation:** Multer middleware validates MIME types (`jpeg`, `jpg`, `png`, `webp`) and enforces a 5MB size limit.
  - **Lightbox Modal:** Full-resolution modal viewer when clicking thumbnails in activity cards.
- **Personalized Dashboard:**
  - Welcome banner with live user display.
  - Metric cards: Total Eco Points, Completed Activities Count, Progression Level, Primary Badge.
  - Dynamic Progress Bar tracking progress toward the 200 Points milestone (`(points / 200) * 100`).
  - Recent activity feed showing title, description, timestamp, points badge, category icon, and photo thumbnail.
- **Milestone & Achievement System:**
  - Unlocked dynamically from real database records (e.g. *Tree Planter*, *Recycling Hero*, *Green Traveller*, *Eco Warrior*).
  - Clear visual distinction between unlocked and locked achievements with criteria.
- **Comprehensive Activity History:**
  - Complete historical log with photos, points, timestamps, and notes.
  - Category filters to isolate specific activities.
  - Action deletion capability that automatically recalibrates user total Eco Points.
- **Community Waste Reporting:**
  - Community registry for logging waste type, landmark/location, photo evidence, and incident details.
  - Transparent awareness disclaimer without false municipal dispatch claims.
- **Recycling Centers Directory:**
  - Searchable directory of neighborhood facilities with accepted materials and hours.

---

## 📸 Image Upload Architecture

```text
[React Client]
  │ 1. User selects image (JPEG, PNG, WEBP)
  │ 2. FileReader renders instant preview
  │ 3. Packaged into multipart/form-data via Axios
  ▼
[Express Server + Multer Middleware]
  │ 4. Validates file type and 5MB limit
  │ 5. Generates unique timestamp filename
  │ 6. Writes file to /server/uploads/
  ▼
[MongoDB Atlas]
  │ 7. Relative path `/uploads/filename.ext` stored in document
  ▼
[Static Asset Delivery]
    8. Express statically serves `http://localhost:5000/uploads/...`
```

---

## 💻 Technology Stack

### Frontend
- **React 18:** Declarative component-based user interface.
- **Vite:** High-performance build tool with instantaneous HMR.
- **React Router DOM v6:** Client-side single page navigation.
- **Tailwind CSS:** Modern utility-first CSS styling using an environmental palette (`emerald`, `green`, `slate`).
- **Axios:** Promise-based HTTP client with request/response interceptors and multipart support.
- **React Icons:** Accessible vector iconography.

### Backend
- **Node.js:** Asynchronous event-driven JavaScript runtime.
- **Express.js:** Minimalist and robust web framework for RESTful APIs.
- **Multer:** Multipart/form-data middleware for handling file and image uploads.
- **MongoDB Atlas & Mongoose:** Cloud NoSQL database with strict schema definitions and validation hooks.
- **jsonwebtoken (JWT):** Stateless token-based user authentication.
- **bcryptjs:** Salted password hashing algorithm.
- **cors & dotenv:** Cross-origin request enablement and environment management.

---

## 📁 Project Architecture & Folder Structure

```text
Local-Eco-Tracker/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── ActivityCard.jsx
│   │   │   ├── ProgressCard.jsx
│   │   │   └── AchievementCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Activities.jsx
│   │   │   ├── AddActivity.jsx
│   │   │   ├── ReportWaste.jsx
│   │   │   └── RecyclingCenters.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── activityController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Activity.js
│   │   └── WasteReport.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── activityRoutes.js
│   │   └── wasteRoutes.js
│   │
│   ├── uploads/
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── .gitignore
├── README.md
└── package.json
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- MongoDB Atlas account (or local MongoDB)

### Step 1: Install Dependencies
Open a terminal in the root directory:

```bash
# 1. Install Backend Dependencies
cd server
npm install

# 2. Install Frontend Dependencies
cd ../client
npm install
```

---

## 🍃 MongoDB Atlas Setup Guide

1. Log into [MongoDB Cloud](https://www.mongodb.com/cloud/atlas).
2. Create a free **M0 Sandbox Cluster**.
3. Under **Security → Database Access**, create a user (e.g. `ecouser` with password `password123`).
4. Under **Security → Network Access**, add IP `0.0.0.0/0` (Allow access from anywhere).
5. Click **Connect → Drivers (Node.js)** and copy your connection string.
6. Open `server/.env` and update `MONGO_URI`:
```env
MONGO_URI=mongodb+srv://ecouser:password123@cluster0.mongodb.net/local-eco-tracker?retryWrites=true&w=majority
```

---

## 🔑 Environment Variables

Create or verify `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=local_eco_tracker_super_secret_jwt_key_2026
CLIENT_URL=http://localhost:5173
```

---

## 🖥️ How to Run the Application

### Option A: Two Separate Terminals

**Terminal 1 (Backend Server):**
```bash
cd server
npm run dev
# Server runs on: http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
# Client runs on: http://localhost:5173
```

---

## 📡 API Documentation

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Registers a user, hashes password, initializes 0 points |
| `POST` | `/api/auth/login` | Public | Authenticates credentials and returns JWT + user info |

### Activity Routes (`/api/activities`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/activities` | Private (JWT) | Retrieves all activities for logged-in user and current total points |
| `POST` | `/api/activities` | Private (JWT) | Supports multipart image upload, validates action, computes points, creates document |
| `DELETE` | `/api/activities/:id` | Private (JWT) | Deletes activity and deducts points from user total |

### Waste Routes (`/api/waste`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/waste` | Public | Supports multipart image upload, submits waste report |
| `GET` | `/api/waste` | Public | Retrieves recent waste reports |

---

## 🎓 Academic Viva Questions & Answers

**Q1: How is image upload implemented without external paid cloud services?**
> *Answer:* We implemented an on-premise static storage architecture using `multer` middleware on the Express server. When an image is submitted with multipart/form-data, Multer verifies the MIME type, generates a collision-free filename using timestamp and random seeds, and writes the binary stream to the local `/server/uploads/` directory. The relative URI path is saved in MongoDB, and Express serves the uploads statically using `express.static()`.

**Q2: How does the client preview images before uploading?**
> *Answer:* We use the native HTML5 `FileReader` API in React. When the user selects an image from their file picker, `readAsDataURL(file)` converts the local file into a Base64 data URI string stored in local state. This allows an instantaneous UI thumbnail preview with zero network latency before the user submits the form.

**Q3: How does JWT authentication work in this application?**
> *Answer:* When the user logs in with valid credentials, the server signs a JWT containing the user ID using a secret key. The token is sent to the client and stored in `localStorage`. For all subsequent protected requests, an Axios interceptor attaches the token as `Bearer <token>` in the HTTP `Authorization` header. The server's `authMiddleware` verifies the token before granting access to controllers.

**Q4: How are passwords protected?**
> *Answer:* Passwords are never stored in plain text. A Mongoose pre-save hook intercepts user registration or password modifications, generates a cryptographic salt using `bcryptjs`, and hashes the password before writing to MongoDB Atlas.

**Q5: How are Eco Points calculated securely?**
> *Answer:* Eco Points are strictly calculated on the backend (`activityController.js`) using a fixed server-side lookup dictionary (`ECO_ACTIVITY_POINTS`). Clients cannot send arbitrary point values; the server determines the points for the verified activity type and increments the user's score atomically in the database.

**Q6: How do achievements work?**
> *Answer:* Achievements are computed dynamically based on actual database entries. For example, *Tree Planter* checks if an activity titled *"Planted a Tree"* exists in the user's log, while *Eco Warrior* unlocks when the user's live points reach 200.
