import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import IncidentList from './pages/IncidentList'
import CreateIncident from './pages/CreateIncident';
import Navbar from "./components/Navbar";
import EditIncident from "./pages/EditIncident";
import Home from "./pages/Home";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/incidents" element={<IncidentList />} />
        <Route path="/create" element={<CreateIncident />} />
        <Route path="/edit/:id" element={<EditIncident />} />
      </Routes>
    </Router>
  )
}

export default App
