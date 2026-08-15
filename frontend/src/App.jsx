import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css'
import IncidentList from './pages/IncidentList'
import CreateIncident from './pages/CreateIncident';
import Navbar from "./components/Navbar";
import EditIncident from "./pages/EditIncident";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/incidents" element={<IncidentList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protect Operational Routes */}
          <Route element={<ProtectedRoute />}>
          <Route path="/create" element={<CreateIncident />} />
          <Route path="/edit/:id" element={<EditIncident />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
