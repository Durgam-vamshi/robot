
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TaskContext = createContext();
export const useTaskContext = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:4044/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);
  const filteredTasks = tasks.filter(
    (task) => statusFilter === "All" || task.status === statusFilter
  );
  const addTask = (task) => {
    axios.post("http://localhost:4044/api/tasks", task)
      .then((response) => setTasks([...tasks, response.data]))
      .catch((error) => console.error("Error adding task:", error));
  };
  const editTask = (id, updatedTask) => {
    axios.patch(`http://localhost:4044/api/tasks/${id}`, updatedTask)
      .then(() => {
        setTasks(tasks.map((task) => (task._id === id ? { ...task, ...updatedTask } : task)));
      })
      .catch((error) => console.error("Error editing task:", error));
  };
  const deleteTask = (id) => {
    axios.delete(`http://localhost:4044/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        addTask,
        editTask,
        deleteTask,
        setStatusFilter,
        setShowModal,  
        showModal,    
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
