import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import ProfileNotFoundPage from "./ProfileNotFound";

const ProfilePage = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/employees/${id}`);
        setEmployee(res.data);
      } catch (error) {
        if(error.response && error.response.status === 404) setNotFound(true);
        else console.error(`Error fetching employee profile: ${error}`);
      }
    };
    fetchEmployee();
  }, [id]);

  if(notFound) return (<ProfileNotFoundPage/>);
  if(!employee) return (<div className="loading">Loading...</div>);

  return (
    <div className="profile-container">
      <title>{employee.name}</title>
      <button className="back-button" onClick={() => navigate("/dashboard")}>←</button>
      <div className="profile-card">
        <img
          className="profile-image"
          src={employee.image ? (`data:image/jpeg;base64,${employee.image}`) : require("../assets/defaultImage.jpg")}
          alt="Employee"/>
        <div className="profile-details">
          <div className="profile-left">
            <p className="employee-details"><strong>Name:</strong></p>
            <p className="employee-details"><strong>Email:</strong></p>
            <p className="employee-details"><strong>Phone:</strong></p>
            <p className="employee-details"><strong>Position:</strong></p>
            <p className="employee-details"><strong>Experience:</strong></p>
            <p className="employee-details"><strong>Salary:</strong></p>
          </div>
          <div className="profile-right">
            <p className="employee-details">{employee.name}</p>
            <p className="employee-details">{employee.email}</p>
            <p className="employee-details">{employee.phonenum}</p>
            <p className="employee-details">{employee.position}</p>
            <p className="employee-details">{employee.experience} years</p>
            <p className="employee-details">₹{employee.salary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;