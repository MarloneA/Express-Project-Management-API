import { Router } from "express";
import { usersList } from "../../constants.js";

const router = Router();

router.get("/api/users", (request, response) => {
  response.status(200).send({
    data: {
      users: usersList,
      count: usersList.length,
    },
  });
});

export default router;
