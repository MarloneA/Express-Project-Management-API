import {
  searchUsersByQTerm,
  createNewUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from "./services.js";

export const getUsers = async (request, response) => {
  const {
    query: { filter, value },
  } = request;

  const { users, count, error } = await getAllUsers({ filter, value });

  if (error) {
    return response.status(400).send({
      data: {
        error: error.message,
      },
    });
  }

  return response.status(200).send({
    data: {
      users,
      count,
    },
  });
};

export const searchUsersByQuery = async (request, response) => {
  const {
    query: { q },
  } = request;

  const { users, count, error } = await searchUsersByQTerm({ q });

  if (error) {
    return response.status(400).send({
      data: {
        error: error.message,
      },
    });
  }

  return response.status(200).send({
    users,
    count,
  });
};

export const createUsers = async (request, response) => {
  const { user, error } = await createNewUser({ ...request.body });

  if (error) {
    return response.status(400).send({
      error: error.message,
    });
  }

  return response.status(200).send({ user: user.id });
};

export const editUsers = async (request, response) => {
  const {
    body,
    params: { id },
  } = request;

  const { user, error } = await updateUser({ id, body });

  if (error) {
    return response.status(400).send({
      error: error.message,
    });
  }

  return response.status(200).send({
    data: {
      message: "user has been updated",
      user,
    },
  });
};

export const deleteUserById = async (request, response) => {
  const {
    params: { id },
  } = request;

  const { user, error } = await deleteUser({ id });

  if (error) {
    return response.status(400).send({
      error: error.message,
    });
  }

  return response.status(200).send({
    user,
  });
};
