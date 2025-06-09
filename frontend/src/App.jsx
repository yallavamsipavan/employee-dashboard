import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddEmployee from './pages/AddEmployee';
import ProfilePage from './pages/ProfilePage';
import DashBoard from './pages/DashBoard';
import './App.css';
import { Helmet } from 'react-helmet';

function App() {
  return (
      <div>
        <Helmet>
          <title>Employee Dashboard</title>
        </Helmet>
        <Router>
          <nav className="navbar">
            <Link className="navLink" to="/">Home</Link>
            <Link className="navLink" to="/dashboard">Dashboard</Link>
            <Link className="navLink" to="/add">Add Employee</Link>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/dashboard" element={<DashBoard/>} />
            <Route path="/add" element={<AddEmployee/>} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;