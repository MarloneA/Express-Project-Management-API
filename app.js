import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import routes from "./app/index.js";
import passport from "passport";
import cors from "cors";
import "./strategy/local-strategy.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";

export default function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ALLOW_URL,
      credentials: true,
    })
  );

  app.use(express.json()); // needed to parse http requests to json
  app.use(cookieParser()); // since http is stateless, we need cookie parser to read cookies from request header
  app.use(
    session({
      cookie: {
        maxAge: 60000 * 60,
        secure: false, //set to true when deploying to prod
        httpOnly: true,
      },
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET_KEY,
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
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
