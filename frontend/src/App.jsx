// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AddEditModal from "./components/AddEditModal";
// import TaskList from "./components/TaskList";
// import Header from "./components/Header";

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");  // New state for search query
//   const [showModal, setShowModal] = useState(false);
//   const [editTask, setEditTask] = useState(null);

//   // Fetch tasks from backend API
//   useEffect(() => {
//     axios.get("http://localhost:4044/api/tasks").then((response) => {
//       setTasks(response.data);
//     });
//   }, []);

//   // Filter tasks based on status and search query
//   const filteredTasks = tasks.filter((task) => {
//     const matchesStatus =
//       statusFilter === "All" || task.status === statusFilter;
//     const matchesSearch =
//       task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       task.description.toLowerCase().includes(searchQuery.toLowerCase());

//     return matchesStatus && matchesSearch;
//   });

//   // Open modal to add new task
//   const handleAddTask = () => {
//     setEditTask(null);
//     setShowModal(true);
//   };

//   // Open modal to edit task
//   const handleEditTask = (task) => {
//     setEditTask(task);
//     setShowModal(true);
//   };

//   // Delete task from the list and backend
//   const handleDeleteTask = (id) => {
//     axios.delete(`http://localhost:4044/api/tasks/${id}`).then(() => {
//       setTasks(tasks.filter((task) => task._id !== id));
//     });
//   };

//   // Close modal
//   const handleCloseModal = () => setShowModal(false);

//   return (
//     <div className="App">
//       <Header
//         handleAddTask={handleAddTask}
//         setStatusFilter={setStatusFilter}
//         setSearchQuery={setSearchQuery}  // Passing the search query handler
//       />
//       <TaskList
//         tasks={filteredTasks}
//         handleEditTask={handleEditTask}
//         handleDeleteTask={handleDeleteTask}
//       />
//       <AddEditModal
//         showModal={showModal}
//         handleCloseModal={handleCloseModal}
//         editTask={editTask}
//         setTasks={setTasks}
//       />
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import axios from "axios";
// import AddEditModal from "./components/AddEditModal";
// import TaskList from "./components/TaskList";
// import Header from "./components/Header";
// import Login from "./components/Login";
// import Signup from "./components/Signup";

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");  
//   const [showModal, setShowModal] = useState(false);
//   const [editTask, setEditTask] = useState(null);

//   // Check if user is authenticated
//   const isAuthenticated = localStorage.getItem("authToken");

//   // Fetch tasks from backend API if the user is authenticated
//   useEffect(() => {
//     if (isAuthenticated) {
//       axios.get("http://localhost:4044/api/tasks").then((response) => {
//         setTasks(response.data);
//       });
//     }
//   }, [isAuthenticated]);

//   // Filter tasks based on status and search query
//   const filteredTasks = tasks.filter((task) => {
//     const matchesStatus =
//       statusFilter === "All" || task.status === statusFilter;
//     const matchesSearch =
//       task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       task.description.toLowerCase().includes(searchQuery.toLowerCase());

//     return matchesStatus && matchesSearch;
//   });

//   // Open modal to add new task
//   const handleAddTask = () => {
//     setEditTask(null);
//     setShowModal(true);
//   };

//   // Open modal to edit task
//   const handleEditTask = (task) => {
//     setEditTask(task);
//     setShowModal(true);
//   };

//   // Delete task from the list and backend
//   const handleDeleteTask = (id) => {
//     axios.delete(`http://localhost:4044/api/tasks/${id}`).then(() => {
//       setTasks(tasks.filter((task) => task._id !== id));
//     });
//   };

//   // Close modal
//   const handleCloseModal = () => setShowModal(false);

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Route for login (default route) */}
//           <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/tasks" />} />
          
//           {/* Route for tasks (requires authentication) */}
//           <Route
//             path="/tasks"
//             element={
//               isAuthenticated ? (
//                 <>
//                   <Header
//                     handleAddTask={handleAddTask}
//                     setStatusFilter={setStatusFilter}
//                     setSearchQuery={setSearchQuery}
//                   />
//                   <TaskList
//                     tasks={filteredTasks}
//                     handleEditTask={handleEditTask}
//                     handleDeleteTask={handleDeleteTask}
//                   />
//                   <AddEditModal
//                     showModal={showModal}
//                     handleCloseModal={handleCloseModal}
//                     editTask={editTask}
//                     setTasks={setTasks}
//                   />
//                 </>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />

//           {/* Route for signup */}
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;





import React, { useState, useEffect } from "react";
import axios from "axios";
import AddEditModal from "./components/AddEditModal";
import TaskList from "./components/TaskList";
import Header from "./components/Header";

function App() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");  // New state for search query
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  // Fetch tasks from backend API
  useEffect(() => {
    axios.get("http://localhost:4044/api/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  // Filter tasks based on status and search query
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;
    const matchesSearch =
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Open modal to add new task
  const handleAddTask = () => {
    setEditTask(null);
    setShowModal(true);
  };

  // Open modal to edit task
  const handleEditTask = (task) => {
    setEditTask(task);
    setShowModal(true);
  };

  // Delete task from the list and backend
  const handleDeleteTask = (id) => {
    axios.delete(`http://localhost:4044/api/tasks/${id}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
    });
  };

  // Close modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="App">
      <Header
        handleAddTask={handleAddTask}
        setStatusFilter={setStatusFilter}
        setSearchQuery={setSearchQuery}  // Passing the search query handler
      />
      <TaskList
        tasks={filteredTasks}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
      />
      <AddEditModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        editTask={editTask}
        setTasks={setTasks}
      />
    </div>
  );
}

export default App;
