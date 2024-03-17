import { Router } from "express";
import { usersList } from "../../utils/constants.js";
import passport from "../../strategy/local-strategy.js";
import { hashPassword } from "../../utils/helpers.js";

const router = Router();

router.get("/api/users", (request, response) => {
  response.status(200).send({
    data: {
      users: usersList,
      count: usersList.length,
    },
  });
});

router.post("/api/auth/register", (request, response) => {
  const {
    body: { email, password },
  } = request;

  const safePassword = hashPassword(password);

  const newUser = {
    id: crypto.randomUUID(),
    email,
    password: safePassword,
  };

  usersList.push(newUser);
  response.sendStatus(200);
});

router.post(
  "/api/auth/login",
  passport.authenticate("local"),
  (request, response) => {
    response.sendStatus(200);
  }
);

router.get("/api/auth/status", (request, response) => {
  return request.user
    ? response.status(200).send({
        status: "authenticated",
        userId: request.user,
      })
    : response.status(401).send({ message: "Not Authenticated" });
});

router.get("/api/auth/logout", (request, response) => {
  return request.session.user
    ? response.status(200).send(request.session.user)
    : response.status(401).send({ message: "Not Authenticated" });
});

export default router;
