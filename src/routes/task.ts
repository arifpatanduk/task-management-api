import express from "express";
import {
  getAllTasks,
  createTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from "../controllers/taskController";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.patch("/:id", updateTaskById);
router.delete("/:id", deleteTaskById);

export default router;
