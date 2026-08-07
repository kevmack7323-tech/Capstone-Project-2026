MackSolutions – Security Incident Management Platform
MackSolutions is a MERN‑stack application designed to help security teams log, track, and manage operational incidents. Users can create new incidents, edit existing ones, delete incidents, and view all incidents sorted by severity.

📌 Features
Create New Incident  
Submit a form with title, description, severity, AI risk level, and operational context.

View All Incidents  
Incidents are displayed in styled cards with severity and AI‑risk badges.

Edit Existing Incidents  
Update any field of an incident.

Delete Incidents  
Remove incidents from the database instantly.

Severity Sorting  
Incidents automatically sort from Critical → High → Medium → Low.

AI Risk Classification  
Displays AI risk using color‑coded badges.

Responsive UI  
Mobile-friendly layout and clean styling.

🛠️ Tech Stack
Frontend
React

React Router

Axios

Vite

Custom CSS

Backend
Node.js

Express

MongoDB

Mongoose

Nodemon (for development)

📂 Project Structure

/frontend
  /src
    /pages
      IncidentList.jsx
      CreateIncident.jsx
      EditIncident.jsx
      Home.jsx
    /components
      Navbar.jsx
    /api
      axios.js
    App.jsx
    App.css

/backend
  /models
    Incident.js
  /routes
    incidents.js
  server.js

🚀 Getting Started

1. Clone the repository
git clone <https://github.com/kevmack7323-tech/Capstone-Project-2026>
cd macksolutions

2. Install dependencies
Frontend:
cd frontend
npm install
Backend:
Code
cd backend
npm install

▶️ Running the Application
-Start the backend (development mode)
open new terminal
cd backend
nodemon server.js

-Start the frontend
open new terminal
cd frontend
npm run dev
Frontend runs at:
http://localhost:5173

Backend runs at:
http://localhost:3000  
(or whatever PORT you set)

📡 API Endpoints
GET /incidents
Fetch all incidents.

POST /incidents
Create a new incident.

PUT /incidents/:id
Update an incident.

DELETE /incidents/:id
Delete an incident.

🧩 Incident Schema
js
{
  title: String,
  description: String,
  severity: String,
  aiRisk: String,
  ai_risk_level: String,
  operationContext: String
}

🎨 Styling
Includes:
Global CSS reset
Navbar
Incident cards
Severity badges
AI risk badges
Forms
Home page layout

📘 Notes
Severity values are normalized to ensure correct sorting.

AI risk supports both aiRisk and ai_risk_level.

Axios is preconfigured in /api/axios.js.

All components use React functional components and hooks.