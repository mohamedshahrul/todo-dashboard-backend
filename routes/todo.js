import express from "express";
import {
  getDashboard,
  getPostsBySearch,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/todo.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/dashboard/:id", getDashboard);
router.get("/search", getPostsBySearch);
router.post("/", auth, createTask);
router.patch("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
