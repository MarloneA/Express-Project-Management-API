import { Router } from "express";
import passport from "../../strategy/local-strategy.js";

import {
  getAuthStatus,
  login,
  logout,
  registerUser,
} from "../../controllers/auth.js";

const router = Router();

router
  .post("/api/auth/register", registerUser)
  .post(
    "/api/auth/login",
    passport.authenticate("local", { failureMessage: true }),
    login
  )
  .get("/api/auth/status", getAuthStatus)
  .post("/api/auth/logout", logout);

export default router;
