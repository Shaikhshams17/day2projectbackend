import { db, ref } from "../config/firebaase-config.js";
import { get, push,set, update, remove } from "firebase/database";

// ✅ Get all tasks
export const getTasks = async (req, res) => {
  try {
    const snapshot = await get(ref(db, "tasks"));
    const tasks = snapshot.exists()
      ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data }))
      : [];
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch tasks: ${error.message}` });
  }
};

// ✅ Add a new task
export const addTask = async (req, res) => {
  try {
    const { title, description = "", completed = false, priority = "Low", dueDate = "" } = req.body;

    if (!title) return res.status(400).json({ error: "Title is required" });

    const taskRef = push(ref(db, "tasks"));
    await set(taskRef, { title, description, completed, priority, dueDate });

    res.status(201).json({ message: "Task added successfully", id: taskRef.key });
  } catch (error) {
    res.status(500).json({ error: `Failed to add task: ${error.message}` });
  }
};

// ✅ Update a task
export const updateTask = async (req, res) => {
  try {
    const { id, title, description, completed, priority, dueDate } = req.body;
console.log("Error",req.bod)
    if (!id) return res.status(400).json({ error: "Task ID is required" });

    const taskRef = ref(db, `tasks/${id}`);
    const updatedTask = { title, description, completed, priority, dueDate };

    await update(taskRef, updatedTask);
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ error: `Failed to update task: ${error.message}` });
  }
};

// ✅ Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) return res.status(400).json({ error: "Task ID is required" });

    const taskRef = ref(db, `tasks/${id}`);
    await remove(taskRef);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: `Failed to delete task: ${error.message}` });
  }
};

// ✅ Mark task as completed/undo
export const toggleTaskCompletion = async (req, res) => {
  try {
    const { id, completed } = req.body;

    if (!id) return res.status(400).json({ error: "Task ID is required" });

    const taskRef = ref(db, `tasks/${id}`);
    await update(taskRef, { completed });

    res.status(200).json({ message: completed ? "Task completed" : "Task marked as undone" });
  } catch (error) {
    res.status(500).json({ error: `Failed to toggle task completion: ${error.message}` });
  }
};
