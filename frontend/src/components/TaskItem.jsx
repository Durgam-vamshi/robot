
import React from "react";
import { useTaskContext } from "../context/TaskContext";
import "../styles/TaskItem.css"

const TaskItem = ({ task }) => {
  const { handleEditTask, handleDeleteTask } = useTaskContext();

  return (
    <li>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <button onClick={() => handleEditTask(task)}>Edit</button>
      <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
