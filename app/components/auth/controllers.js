import { createNewUser } from "./services.js";

export const registerUser = async (request, response) => {
  const { user, error } = await createNewUser({ ...request.body });

  if (error) {
    return response.status(400).send({
      error: error.message,
    });
  }

  return response.status(200).send({ user: user.id });
};

export const login = (request, response) => {
  response.status(200).send({
    isAuthenticated: request.isAuthenticated(),
    user: request.user,
  });
};

export const getAuthStatus = (request, response) => {
  return request.user
    ? response.status(200).send({
        isAuthenticated: request.isAuthenticated(),
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
