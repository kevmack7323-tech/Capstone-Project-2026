import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import IncidentList from './pages/IncidentList'
import CreateIncident from './pages/CreateIncident';
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<IncidentList />} />
        <Route path="/create" element={<CreateIncident />} />
      </Routes>
    </Router>
  )
}

export default App
