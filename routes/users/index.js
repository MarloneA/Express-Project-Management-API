import { Router } from "express";
import { usersList } from "../../utils/constants.js";
import { hashPassword } from "../../utils/helpers.js";

const router = Router();

router.get("/api/users", (request, response) => {
  const {
    query: { filter, value },
  } = request;

  if (filter && value) {
    const filteredUsers = usersList.filter((user) => user[filter] === value);

    return response.status(200).send({
      data: {
        users: filteredUsers,
        count: filteredUsers.length,
      },
    });
  }

  response.status(200).send({
    data: {
      users: usersList,
      count: usersList.length,
    },
  });
});

router.get("/api/users/search", (request, response) => {
  const {
    query: { q },
  } = request;

  if (q) {
    const searchResults = usersList.filter((user) =>
      user.name.toLowerCase().includes(q.toLowerCase())
    );
    response.status(200).send({
      tasks: searchResults,
      count: searchResults.length,
    });
  }

  response.status(200).send({
    data: {
      users: usersList,
      count: usersList.length,
    },
  });
});

router.post("/api/users", (request, response) => {
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

router.put("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;

  const findUserIndex = usersList.findIndex((user) => user.id === id);

  usersList.splice(findUserIndex, 1, {
    ...usersList[findUserIndex],
    ...body,
  });

  response.send({
    data: {
      message: "user has been updated",
    },
  });
});

router.delete("/api/users/:id", (request, response) => {
  const {
    params: { id },
  } = request;

  usersList.filter((user) => user.id !== id);

  response.sendStatus(200);
});

export default router;
