import passport from "passport";
import { Strategy } from "passport-local";

import { usersList } from "../utils/constants.js";
import { comparePassword } from "../utils/helpers.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const findUser = usersList.find((user) => user.id === id);

    if (!findUser) {
      return done(null, false, { message: "user not found" });
    }
    done(null, findUser.id);
  } catch (error) {
    done(err, null);
  }
});

passport.use(
  new Strategy(
    { usernameField: "email", passReqToCallback: true },
    (request, email, password, done) => {
      try {
        const finduser = usersList.find((user) => user.email === email);
        if (!finduser) {
          request.res.status(400).send({
            message: "user not found",
          });
          done(null, false);
        }

        if (!comparePassword(password, finduser.password)) {
          request.res.status(400).send({ message: "invalid credentials" });
          return done(null, false);
        }
        done(null, finduser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;
