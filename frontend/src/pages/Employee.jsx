import React from "react";
import { useNavigate } from "react-router-dom";
import "./Employee.css";

const Employee = ({ emp, onDelete }) => {
  const navigate = useNavigate();
  return (
    <tr className="employee-row">
      <td>{emp.name}</td>
      <td>{emp.position}</td>
      <td>{emp.experience} years</td>
      <td>
        <button className="btn btn-profile" onClick={() => navigate(`/profile/${emp.id}`)}>View</button>
        <button className="btn btn-delete" onClick={() => onDelete(emp.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Employee;