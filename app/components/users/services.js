import { usersList } from "../../../utils/constants.js";
import { hashPassword } from "../../../utils/helpers.js";

export const filterUsersByParam = (params) => {
  const { filter, value } = params;

  const users = usersList.filter((user) => user[filter] === value);

  return { users, count: users.length };
};

export const searchUsersByQTerm = (params) => {
  const { q } = params;

  const searchResults = usersList.filter((user) =>
    user?.name.toLowerCase().includes(q.toLowerCase())
  );

  return { users: searchResults, count: searchResults.length };
};

export const createNewUser = (user) => {
  const safePassword = hashPassword(user.password);

  const newUser = {
    id: crypto.randomUUID(),
    ...user,
    password: safePassword,
  };

  usersList.push(newUser);

  return { data: usersList, error: null };
};

export const updateUser = (payload) => {
  const { id, body } = payload;

  const findUserIndex = usersList.findIndex((user) => user.id === id);

  usersList.splice(findUserIndex, 1, {
    ...usersList[findUserIndex],
    ...body,
  });

  return { data: usersList, error: null };
};

export const deleteUser = (id) => {
  const findUserIndex = usersList.findIndex((user) => user.id === id);

  usersList.splice(findUserIndex, 1);

  return { data: usersList, error: null };
};
