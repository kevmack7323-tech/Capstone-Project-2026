# Mack Solutions

A comprehensive, full-stack security incident tracking and management application designed for real-time monitoring, analytics, and AI-assisted workflow triage. Built as a capstone project for modern security operations centers (SOCs).

## Features

- **Real-Time Incident Tracking:** Instantly log, update, and manage security incidents with severity levels and operational statuses.
- **Live WebSockets Integration:** Real-time data synchronization across clients using Socket.io and JSON Web Token (JWT) authentication.
- **Analytics Dashboard:** Visual telemetry and charts displaying incident trends, response metrics, and operational performance.
- **AI-Assisted Triage:** Integrated with the **Google Gemini API** to evaluate incident risk levels and streamline automated triage.
- **Secure Role-Based Access:** User authentication and authorization handling protecting sensitive security logs.

## Tech Stack

### Frontend
- **React** (Vite)
- **React Router** for client-side routing
- **Chart.js** / Analytics libraries
- **Socket.io-client** for real-time updates
- **CSS3** for custom styling and responsive layouts

### Backend
- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose** (ODM)
- **Socket.io** for real-time bidirectional communication
- **Google Gemini API** (`@google/genai`) for AI-powered risk evaluation
- **JWT (JSON Web Tokens)** & **Bcrypt.js** for authentication and password hashing

## Project Structure

```text
capstoneProject/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components & navigation
│   │   ├── context/        # Auth & global state contexts
│   │   ├── pages/          # View pages (Dashboard, Login, Register, Incidents)
│   │   └── ...
│   └── package.json
├── server/                 # Express backend API & WebSockets
│   ├── models/             # Mongoose schemas (User, Incident)
│   ├── routes/             # API endpoints & Gemini AI logic
│   ├── middleware/         # Auth & error-handling middleware
│   ├── server.js           # Entry point for Express & Socket.io
│   └── package.json
└── README.md
