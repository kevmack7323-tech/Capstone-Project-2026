import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import IncidentList from './pages/IncidentList'
import CreateIncident from './pages/CreateIncident';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<IncidentList />} />
        <Route path="/create" element={<CreateIncident />} />
      </Routes>
    </Router>
  )
}

export default App
