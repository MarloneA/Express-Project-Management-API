import { Router } from "express";
import {
  createUsers,
  deleteUserById,
  editUsers,
  getUsersService,
  searchUsersByQuery,
} from "./controllers.js";

const router = Router();

router
  .get("/api/users", getUsersService)
  .get("/api/users/search", searchUsersByQuery)
  .post("/api/users", createUsers)
  .put("/api/users/:id", editUsers)
  .delete("/api/users/:id", deleteUserById);

export default router;
