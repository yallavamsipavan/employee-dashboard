import React from "react";
import './DashBoard.css';
import EmployeeList from './EmployeeList';

const DashBoard = () => {
  return (
    <div className="dashboard-container">
      <title>Dashboard</title>
      <h2 className="dashboard-title">Employee Dashboard</h2>
      <EmployeeList />
    </div>
  );
};

export default DashBoard;