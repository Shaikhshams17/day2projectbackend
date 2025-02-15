import express from "express";
import { getTasks, addTask, updateTask, deleteTask, toggleTaskCompletion } from "../controllers/task-controller.js";

const router = express.Router();

// Route to get all tasks
router.get("/getTasks", getTasks);

// Route to add a new task
router.post("/addTask", addTask);

// Route to update an existing task
router.put("/updateTask", updateTask);

// Route to delete a task
router.delete("/deleteTask", deleteTask);

// Route to toggle task completion (mark as complete/undo)
router.put("/toggleTaskCompletion", toggleTaskCompletion);

export default router;
