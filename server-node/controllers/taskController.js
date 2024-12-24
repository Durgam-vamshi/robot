const Task = require("../models/Tasks");
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};
exports.createTask = async (req, res) => {
  const { name, description, dueDate, status, priority } = req.body;
  try {
    const newTask = new Task({
      name,
      description,
      dueDate,
      status,
      priority,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};



exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params; 
    const updatedData = req.body; 
    const updatedTask = await Task.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Error updating task", error });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

exports.getOverdueTasks = async (req, res) => {
  const currentDate = new Date();
  try {
    const overdueTasks = await Task.find({ dueDate: { $lt: currentDate }, status: { $ne: 'Completed' } });
    res.status(200).json(overdueTasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching overdue tasks", error });
  }
};

exports.searchTasks = async (req, res) => {
  const query = req.query.q;
  try {
    const tasks = await Task.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error searching tasks", error });
  }
};

exports.filterTasks = async (req, res) => {
  const { status } = req.query;
  try {
    const tasks = await Task.find({ status });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error filtering tasks", error });
  }
};
