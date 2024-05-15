export const authoriseUser = (request, response, next) => {
  if (!request.user) {
    return response.status(401).send({
      message: "unauthorized user",
    });
  }
  next();
};
