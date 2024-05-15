import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import routes from "./app/index.js";
import passport from "passport";
import cors from "cors";
import "./strategy/local-strategy.js";

export default function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ALLOW_URL,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000 * 60,
        secure: false, //set to true when deploying to prod
        httpOnly: true,
      },
      name: process.env.SESSION_NAME,
    })
  );
  app.get("/", (request, response) => {
    response.status(200).send({
      msg: "Api is healthy",
    });
  });
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(routes);

  return app;
}

// notes
// - http is stateless
//   - we need cookieParser to read cookies from request header
// - cookies and signed cookies? what are the differences? how to access both
