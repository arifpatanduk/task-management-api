import { Request, Response } from "express";
import Task from "../models/task";

// Controller for GET /tasks
export async function getAllTasks(req: Request, res: Response) {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller for POST /tasks
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, completed } = req.body;

    // Validate request
    if (!title)
      return res.status(400).json({ message: "Title field are required" });
    if (completed && typeof completed !== "boolean")
      return res
        .status(400)
        .json({ message: "Completed field must be in boolean" });

    const task = await Task.create({ title, description, completed });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for GET /tasks/:id
export async function getTaskById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller for PATCH /tasks/:id
export async function updateTaskById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const { title, description, completed } = req.body;

    // Validate request
    if (typeof completed !== "boolean") {
      return res.status(400).json({
        message: "Completed field must be in boolean",
      });
    }

    const task = await Task.findByPk(id);
    if (task) {
      await task.update({ title, description, completed });
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller for DELETE /tasks/:id
export async function deleteTaskById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (task) {
      await task.destroy();
      res
        .status(204)
        .json({ message: `Task '${task.title}' has been deleted` })
        .end();
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
