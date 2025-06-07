import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8000/employees");
      setEmployees(res.data);
    } catch (error) {
      console.error(`Error fetching employees: ${error}`);
    }
  };
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error(`Error deleting employee: ${error}`);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="homepage-container">
      <h2 className="homepage-title">Employee Dashboard</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>{emp.experience} years</td>
              <td>
                <button className="btn btn-profile" onClick={() => navigate(`/profile/${emp.id}`)}>View</button>
                <button className="btn btn-delete" onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;