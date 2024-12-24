
import React from "react";
import "../styles/Header.css"
const Header = ({ handleAddTask, setStatusFilter, setSearchQuery }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header>
      <h1>Task Management</h1>
      <div>
        <button onClick={handleAddTask}>Add Task</button>
        <select onChange={(e) => setStatusFilter(e.target.value)} defaultValue="All">
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          type="text"
          placeholder="Search by name or description"
          onChange={handleSearchChange}
        />
      </div>
    </header>
  );
};

export default Header;



