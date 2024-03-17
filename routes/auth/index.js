import { Router } from "express";
import passport from "../../strategy/local-strategy.js";
import { hashPassword } from "../../utils/helpers.js";
import { usersList } from "../../utils/constants.js";

const router = Router();

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

router.post("/api/auth/logout", (request, response) => {
  console.log("request: ", request.isAuthenticated());

  if (!request.user) {
    return response.status(401).send({
      message: "user not logged in",
    });
  }

  if (request.isAuthenticated()) {
    request.logOut((err) => {
      if (err) {
        return response.status(404).send({
          error: err,
        });
      }
    });

    response.status(200).send({
      message: "loggod out",
    });
  }

  return response.status(401).send({
    message: "Not Authenticated",
  });
});

export default router;
