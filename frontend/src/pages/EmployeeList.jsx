import React, { useEffect, useState } from "react";
import axios from "axios";
import Employee from "./Employee";
import "./EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [expMin, setExpMin] = useState("");
  const [expMax, setExpMax] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState('');

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8000/employees");
      setEmployees(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(`Error fetching employees: ${err}`);
    }
  };

  const deleteEmployee = async (id, name) => {
    try {
      await axios.delete(`http://localhost:8000/employees/${id}`);
      fetchEmployees();
      setConfirmDelete(null);
      setDeleteMessage(`Employee ${name} deleted successfully`);
      setTimeout(() => {
        setDeleteMessage("");
      }, 5000);
    } catch (err) {
      console.error(`Error deleting Employee: ${err}`);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  const applyFilters = () => {
    let results = employees;
    if (searchTerm.trim()) results = results.filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (expMin) results = results.filter(emp => +emp.experience >= +expMin);
    if (expMax) results = results.filter(emp => +emp.experience <= +expMax);
    setFiltered(results);
    setShowFilter(false);
  };

  const resetFilters = () => {
    setExpMin("");
    setExpMax("");
    const term = searchTerm.toLowerCase();
    const filteredByName = employees.filter(emp => emp.name.toLowerCase().includes(term));
    setFiltered(filteredByName);
    setShowFilter(false);
  };

  return (
    <div>
      {deleteMessage && (
        <div className="alert-group">
          {deleteMessage}
        </div>
      )}

      <div className="search-filter-row">
        <input className="search-input" type="text" placeholder="Search by name..." value={searchTerm} onChange={(e) => {
            const term = e.target.value;
            setSearchTerm(term);
            const results = employees.filter(emp => emp.name.toLowerCase().includes(term.toLowerCase()));
            setFiltered(results);
          }}
        />
        <button className="btn btn-filter" onClick={() => setShowFilter(!showFilter)}>Filters</button>
      </div>

      {showFilter && (
        <div className="modal-overlay" onClick={() => setShowFilter(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Filter Employees</h3>
            <div className="filter-row">
              <label>Experience:</label>
              <input type="number" placeholder="Min" value={expMin} onChange={(e) => setExpMin(e.target.value)} />
              <input type="number" placeholder="Max" value={expMax} onChange={(e) => setExpMax(e.target.value)} />
            </div>
            <div className="filter-actions">
              <button className="btn small-btn-reset" onClick={resetFilters}>Reset</button>
              <button className="btn small-btn-apply" onClick={applyFilters}>Apply</button>
            </div>
          </div>
        </div>
      )}

      <div className="employee-table-wrapper">
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
            {filtered.map(emp => (
              <Employee className="employee-row" key={emp.id} emp={emp} onDelete={() => setConfirmDelete(emp)} />
            ))}
          </tbody>
        </table>
      </div>

      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Deletion</h3>
            <p>Do you want to delete <strong>{confirmDelete.name}</strong>?</p>
            <div className="filter-actions">
              <button className="btn small-btn-cancel" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn small-btn-delete" onClick={() => deleteEmployee(confirmDelete.id, confirmDelete.name)}>Okay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;