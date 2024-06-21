import passport from "passport";
import { Strategy } from "passport-local";

import { comparePassword } from "../utils/helpers.js";
import {
  findUserByUniqueEmail,
  findUserByUniqueId,
} from "../app/components/users/services.js";

passport.serializeUser((user, done) => {
  console.log("user serializer: ", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserByUniqueId(id);

    if (!user) {
      return done(null, false, { message: "user not found" });
    }
    done(null, user.id);
  } catch (error) {
    done(err, null);
  }
});

passport.use(
  new Strategy(
    { usernameField: "email", passReqToCallback: true },
    async (request, email, password, done) => {
      try {
        const user = await findUserByUniqueEmail(email);

        if (!user) {
          request.res.status(400).send({
            message: "user not found",
          });
          done(null, false);
        }

        if (!comparePassword(password, user.password)) {
          request.res.status(400).send({ message: "invalid credentials" });
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;
