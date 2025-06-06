import React, { useEffect, useState } from 'react';

function HomePage() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/employees').then(res => res.json()).then(data => setEmployees(data));
  }, []);
  const deleteEmployee = async (id) => {
    await fetch(`http://localhost:8000/employees/${id}`, {method: 'DELETE'});
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className='container'>
      <h2 className='title'>Employee Dashboard</h2>
      <table className='employee-table'>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Position</th><th>Salary</th><th>Experience</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>
              <td>{emp.experience}</td>
              <td>
                <button className='btn btn-delete' onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;