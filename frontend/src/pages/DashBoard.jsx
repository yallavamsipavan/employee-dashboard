import React from "react";
import './DashBoard.css';
import EmployeeList from './EmployeeList';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h2 className="homepage-title">Employee Dashboard</h2>
      <EmployeeList />
    </div>
  );
};

export default HomePage;