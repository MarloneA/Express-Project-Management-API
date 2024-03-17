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

router.get("/api/user/:id", (request, response) => {});

router.post("/api/auth", (request, response) => {
  const {
    body: { email, password },
  } = request;

  const findUser = usersList.find((user) => user.email === email);

  if (!findUser || findUser.password !== password) {
    return response.status(401).send({ message: "Bad credentials" });
  }

  request.session.user = findUser;

  return response.status(200).send(findUser);
});

router.get("/api/auth/status", (request, response) => {
  return request.session.user
    ? response.status(200).send(request.session.user)
    : response.status(401).send({ message: "Not Authenticated" });
});

export default router;
