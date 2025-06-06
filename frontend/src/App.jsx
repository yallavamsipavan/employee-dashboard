import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddEmployee from './pages/AddEmployee';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Dashboard</Link>
        <Link to="/add">Add Employee</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/add" element={<AddEmployee/>} />
      </Routes>
    </Router>
  );
}

export default App;