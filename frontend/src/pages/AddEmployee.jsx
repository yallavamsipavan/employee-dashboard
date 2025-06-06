import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const [form, setForm] = useState({ name: '', email: '', position: '', salary: '', experience: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.status === 409) setError('Email already exists!');
    else navigate('/');
  };

  return (
    <div className='add-container'>
      <h2>Add Employee</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required/><br/>
        <input name="email" placeholder="Email" onChange={handleChange} required/><br/>
        <input name="position" placeholder="Position" onChange={handleChange} required/><br/>
        <input name="salary" type="number" placeholder="Salary" onChange={handleChange} required/><br/>
        <input name="experience" type="number" placeholder="Experience" onChange={handleChange} required/><br/>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddEmployee;