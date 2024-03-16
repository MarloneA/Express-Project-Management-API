import express from "express";
import routes from "./routes/index.js";

export default function createApp() {
  const app = express();

  app.use(express.json());
  app.use(routes);

  app.get("/", (request, response) => {
    response.status(200).send({
      msg: "Api is healthy",
    });
  });

  return app;
}
