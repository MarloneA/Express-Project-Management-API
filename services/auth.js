import { hashPassword } from "../utils/helpers.js";
import { usersList } from "../utils/constants.js";

export const registerUser = (request, response) => {
  const {
    body: { email, password },
  } = request;

  const safePassword = hashPassword(password);

  const newUser = {
    id: crypto.randomUUID(),
    email,
    ...request.body,
    password: safePassword,
  };

  usersList.push(newUser);
  response.sendStatus(200);
};

export const login = (request, response) => {
  response.sendStatus(200);
};

export const getAuthStatus = (request, response) => {
  return request.user
    ? response.status(200).send({
        status: "authenticated",
        userId: request.user,
      })
    : response.status(401).send({ message: "Not Authenticated" });
};

export const logout = (request, response) => {

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
};
