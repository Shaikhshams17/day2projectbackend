import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/task-routes.js";


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(cors({ origin: "*" }));
app.use(express.json());

// API Routes
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
