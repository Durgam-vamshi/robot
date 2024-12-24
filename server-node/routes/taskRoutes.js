const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/tasks", taskController.getAllTasks);
router.get("/tasks/:id", taskController.getTaskById);
router.post("/tasks",taskController.createTask);
router.patch("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id",  taskController.deleteTask);
router.get("/tasks/overdue",taskController.getOverdueTasks);
router.get("/tasks/search", taskController.searchTasks);
router.get("/tasks/filter",taskController.filterTasks);

module.exports = router;





// const express = require("express");
// const router = express.Router();
// const taskController = require("../controllers/taskController");
// const verifyToken = require("../backned/middlewares/authMiddlleware");

// router.get("/tasks", verifyToken, taskController.getAllTasks);
// router.get("/tasks/:id", verifyToken, taskController.getTaskById);
// router.post("/tasks", verifyToken, taskController.createTask);
// router.patch("/tasks/:id", verifyToken, taskController.updateTask);
// router.delete("/tasks/:id", verifyToken, taskController.deleteTask);

// module.exports = router;
