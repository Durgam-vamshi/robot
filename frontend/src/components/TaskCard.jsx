import React, { useState } from "react";
import "../styles/TaskCard.css";

const TaskCard = ({ task, handleEditTask, handleDeleteTask }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);  
  const [taskToDelete, setTaskToDelete] = useState(null); 
  const handleDeleteClick = () => {
    setTaskToDelete(task);  
    setShowConfirmation(true);
  };
  const confirmDelete = async () => {
    await handleDeleteTask(taskToDelete._id); 
    setShowConfirmation(false);  
  };
  const cancelDelete = () => {
    setShowConfirmation(false);  
    setTaskToDelete(null); 
  };

  return (
    <div className={`task-card ${task.status.toLowerCase()}`}>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Due: {task.dueDate}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <button onClick={() => handleEditTask(task)}>Edit</button>
      <button onClick={handleDeleteClick}>Delete</button>
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

export default TaskCard;
