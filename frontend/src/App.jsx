import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import IncidentList from './pages/IncidentList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <IncidentList/>
    </>
  )
}

export default App
