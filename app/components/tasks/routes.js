import { Router } from "express";

import { taskValidation } from "../../../validation/taskValidation.js";
import { validateQueryParams } from "../../../validation/queryParamsValidation.js";
import {
  addTaskToFavourites,
  createTask,
  deleteTaskById,
  editTaskById,
  getAllTasks,
  getFavourites,
  getTasksById,
  searchTasksByQuery,
} from "./controllers.js";
import { authoriseUser } from "../../middleware/authoriseUser.js";

const router = Router();

router
  .get("/api/tasks/search", validateQueryParams, searchTasksByQuery)
  .get("/api/tasks", validateQueryParams, getAllTasks)
  .get("/api/tasks/:id", getTasksById)
  .post("/api/tasks", taskValidation, createTask)
  .put("/api/task/:id", taskValidation, editTaskById)
  .delete("/api/task/:id", deleteTaskById)
  .post("/api/task/favourite", addTaskToFavourites)
  .get("/api/task/favourite", getFavourites);

export default router;
