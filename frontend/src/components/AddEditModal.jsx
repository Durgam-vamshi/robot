import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../styles/AddEditModal.css"

const AddEditModal = ({ showModal, handleCloseModal, editTask, setTasks }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Low");

  useEffect(() => {
    if (editTask) {
      setTaskName(editTask.name);
      setDescription(editTask.description);
      setDueDate(editTask.dueDate);
      setStatus(editTask.status);
      setPriority(editTask.priority);
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = {
      name: taskName,
      description,
      dueDate,
      status,
      priority,
    };

    const token = localStorage.getItem("authToken");

    try {
      if (editTask) {
        // Update task
        await axios.patch(
          `http://localhost:4044/api/tasks/${editTask._id}`,
          updatedTask,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        // Add new task
        await axios.post("http://localhost:4044/api/tasks", updatedTask, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Refresh task list
      const updatedTasks = await axios.get("http://localhost:4044/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(updatedTasks.data);
      handleCloseModal();
    } catch (error) {
      console.error("Error with task operation", error);
    }
  };

  return (
    <Modal isOpen={showModal} onRequestClose={handleCloseModal} ariaHideApp={false}>
      <h2>{editTask ? "Edit Task" : "Add New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit">{editTask ? "Update Task" : "Add Task"}</button>
        <button type="button" onClick={handleCloseModal}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default AddEditModal;
