import { usersList } from "../../../utils/constants.js";
import { hashPassword } from "../../../utils/helpers.js";

export const addUser = (user) => {
  if (!user) {
    throw new Error("could not resolve request");
  }

  const { password } = user;
  const safePassword = hashPassword(password);

  const newUser = {
    id: crypto.randomUUID(),
    ...user,
    password: safePassword,
  };

  usersList.push(newUser);
};
