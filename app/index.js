import { Router } from "express";
import taskRouter from "./components/tasks/routes.js";
import usersRouter from "./components/users/routes.js";
import authRouter from "./components/auth/routes.js";
import logger from "./middleware/logger.js";
import { authoriseUser } from "./middleware/authoriseUser.js";

const router = Router();

router.use(logger);
router.use(usersRouter);
router.use(authRouter);
router.use(authoriseUser);
router.use(taskRouter);

export default router;
