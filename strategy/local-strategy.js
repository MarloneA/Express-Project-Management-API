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

    if (!findUser) throw new Error("user not found");
    done(null, findUser.id);
  } catch (error) {
    done(err, null);
  }
});

passport.use(
  new Strategy({ usernameField: "email" }, (email, password, done) => {
    try {
      const finduser = usersList.find((user) => user.email === email);

      if (!finduser) throw new Error("user not found");

      if (comparePassword(password, finduser.password)) {
        throw new Error("invalid credentials");
      }
      done(null, finduser);
    } catch (error) {
      done(error, null);
    }
  })
);

export default passport;
