import { usersList } from "../utils/constants.js";
import { hashPassword } from "../utils/helpers.js";

export const getUsersService = (request, response) => {
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

  return response.status(200).send({
    data: {
      users: usersList,
      count: usersList.length,
    },
  });
};

export const searchUsersByQuery = (request, response) => {
  const {
    query: { q },
  } = request;

  if (q) {
    const searchResults = usersList.filter((user) =>
      user.name.toLowerCase().includes(q.toLowerCase())
    );
    return response.status(200).send({
      tasks: searchResults,
      count: searchResults.length,
    });
  }

  return response.status(200).send({
    data: {
      users: usersList,
      count: usersList.length,
    },
  });
};

export const createUsers = (request, response) => {
  const { body } = request;

  const safePassword = hashPassword(body.password);

  const newUser = {
    id: crypto.randomUUID(),
    ...body,
    password: safePassword,
  };

  usersList.push(newUser);

  return response.sendStatus(200);
};

export const editUsers = (request, response) => {
  const {
    body,
    params: { id },
  } = request;

  const findUserIndex = usersList.findIndex((user) => user.id === id);

  usersList.splice(findUserIndex, 1, {
    ...usersList[findUserIndex],
    ...body,
  });

  return response.send({
    data: {
      message: "user has been updated",
    },
  });
};

export const deleteUserById = (request, response) => {
  const {
    params: { id },
  } = request;

  const findUserIndex = usersList.findIndex((user) => user.id === id);

  usersList.splice(findUserIndex, 1);

  return response.sendStatus(200);
};
