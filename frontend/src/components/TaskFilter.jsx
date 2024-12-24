
import React from "react";
import { useTaskContext } from "../context/TaskContext";
import "../styles/TaskFilter.css"

const TaskFilter = () => {
  const { setStatusFilter } = useTaskContext();

  return (
    <div>
      <select onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskFilter;
