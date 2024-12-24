import React, { useState } from "react";
import "../styles/Tasklists.css";

const TaskList = ({ tasks, handleEditTask, handleDeleteTask }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const isOverdue = (dueDate, status) => {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    return taskDueDate < currentDate && status !== "Completed";
  };
  const handleDeleteClick = (task) => {
    setTaskToDelete(task); 
    setShowConfirmation(true); 
  };
  const confirmDelete = () => {
    handleDeleteTask(taskToDelete._id); 
    setShowConfirmation(false); 
    setTaskToDelete(null);
  };
  const cancelDelete = () => {
    setShowConfirmation(false);
    setTaskToDelete(null); 
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`task-item ${isOverdue(task.dueDate, task.status) ? "overdue" : ""}`}
        >
          <div className="task-info">
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleString()}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
          </div>
          <div className="task-actions">
            <button onClick={() => handleEditTask(task)}>Edit</button>
            <button onClick={() => handleDeleteClick(task)}>Delete</button>
          </div>
        </div>
      ))}
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <h4>Are you sure you want to delete this task?</h4>
            <div className="confirmation-buttons">
              <button onClick={confirmDelete}>Yes, Delete</button>
              <button onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
