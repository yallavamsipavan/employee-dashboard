import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddEmployee.css';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => /^\d{10}$/.test(phone);

const formatName = (rawName) => {
  return rawName.split(/[\s.]+|(?<=\.)\s*/).filter(Boolean).map(part => {
      if (part.length === 1) return part.toUpperCase() + ".";
      if (part.endsWith(".")) return part[0].toUpperCase() + ".";
      return part[0].toUpperCase() + part.slice(1).toLowerCase();
    }).join(" ");
};

function AddEmployee() {
  const [form, setForm] = useState({ name: '', email: '', position: '', salary: '', experience: '', phonenum: '' });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [confirmReset, setConfirmReset] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const resetForm = () => {
    setForm({ name: '', email: '', position: '', salary: '', experience: '', phonenum: '' });
    setImage(null);
    setError('');
    setConfirmReset(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rawName = form.name;
    if(!/^[a-zA-Z\s.]+$/.test(rawName)) {
      setError("Name should not contains digits or special characters");
      return;
    }
    if(rawName.length > 100) {
      setError("Name should be at most 100 characters");
      return;
    }
    if(!/^\d+$/.test(form.phonenum)) {
      setError("Phone number should contain only digits");
      return;
    }
    if(!isValidPhone(form.phonenum)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }
    if(!isValidEmail(form.email)) {
      setError("Invalid email format");
      return;
    }

    const formattedName = formatName(rawName);

    const data = new FormData();
    Object.entries({ ...form, name: formattedName }).forEach(([key, value]) =>
      data.append(key, value)
    );
    if (image) data.append('image', image);

    try {
      const res = await fetch(`http://localhost:8000/employees`, {
        method: 'POST',
        body: data
      });
      if (res.status === 409) setError("Email already exists");
      else navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again");
    }
  };

  return (
    <div>
      <title>Add Employee</title>
      <div className="add-container">
        <h2>Add Employee</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required /><br />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br />
          <input name="position" placeholder="Position" value={form.position} onChange={handleChange} required /><br />
          <input name="salary" type="number" placeholder="Salary" value={form.salary} onChange={handleChange} required /><br />
          <input name="experience" type="number" placeholder="Experience" value={form.experience} onChange={handleChange} required /><br />
          <input name="phonenum" placeholder="Contact Number" value={form.phonenum} onChange={handleChange} required /><br />
          <input type="file" name="image" accept="image/*" onChange={handleFileChange} /><br />
          <div className="buttons">
            <button className="reset-button" type="button" onClick={() => setConfirmReset(true)}>Reset</button>
            <button className="adding-button" type="submit" >Add</button>
          </div>
        </form>
        {confirmReset && (
          <div className="popup">
            <p>Do you want to reset the above data?</p>
            <button className="popup-cancel" onClick={() => setConfirmReset(false)}>Cancel</button>
            <button className="popup-reset" onClick={resetForm}>Reset</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddEmployee;