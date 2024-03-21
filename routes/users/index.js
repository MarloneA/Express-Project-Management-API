import { Router } from "express";
import { usersList } from "../../constants.js";
import passport from "../../strategy/local-strategy.js";

const router = Router();

router.get("/api/users", (request, response) => {
  response.status(200).send({
    data: {
      users: usersList,
      count: usersList.length,
    },
  });
});

router.get("/api/user/:id", (request, response) => {});

router.post(
  "/api/auth/login",
  passport.authenticate("local"),
  (request, response) => {
    response.sendStatus(200);
  }
);

router.get("/api/auth/status", (request, response) => {
  return request.user
    ? response.status(200).send(request.user)
    : response.status(401).send({ message: "Not Authenticated" });
});

router.get("/api/auth/logout", (request, response) => {
  return request.session.user
    ? response.status(200).send(request.session.user)
    : response.status(401).send({ message: "Not Authenticated" });
});

export default router;
