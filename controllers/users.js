import {
  filterUsersByParam,
  searchUsersByQTerm,
  createNewUser,
  updateUser,
  deleteUser,
} from "../services/users/index.js";
import { usersList } from "../utils/constants.js";

export const getUsersService = (request, response) => {
  const {
    query: { filter, value },
  } = request;

  if (filter && value) {
    const { users, count } = filterUsersByParam({ filter, value });

    return response.status(200).send({
      data: {
        users,
        count,
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
    const { users, count } = searchUsersByQTerm({ q });

    return response.status(200).send({
      users,
      count,
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
  const { data, error } = createNewUser(body);

  return response.sendStatus(200);
};

export const editUsers = (request, response) => {
  const {
    body,
    params: { id },
  } = request;

  const { data, error } = updateUser({ id, body });

  return response.status(200).send({
    data: {
      message: "user has been updated",
    },
  });
};

export const deleteUserById = (request, response) => {
  const {
    params: { id },
  } = request;

  const { data, error } = deleteUser({ id });

  return response.sendStatus(200);
};
