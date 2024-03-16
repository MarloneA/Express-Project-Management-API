import { Router } from "express";

const router = Router();

router.post("/api/auth/register", (request, response) => {
  const { body } = request;

  const newUser = {
    id: crypto.randomUUID(),
    ...body,
  };

  mockUsers.users.push(newUser);

  response.send(newUser);
});

router.post("/api/auth/login", (request, response) => {
  const {
    body: { email, password },
  } = request;

  const findUser = mockUsers.users.find((user) => user.email === email);
  if (!findUser || findUser.password !== password) {
    return response.status(401).send({ msg: "BAD CREDENTIALS" });
  }

  return response.status(200).send(findUser);
});

router.post("/api/auth/reset-password", (request, response) => {});

router.post("/api/auth/logout", (request, response) => {});
router.get("/api/auth/status", (request, response) => {});

export default router;
