import passport from "passport";
import { GraphQLLocalStrategy } from "graphql-passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

const configurePassport = async () => {
  passport.serializeUser((user, done) => {
    console.log("Serializing User".bgYellow);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing User".bgYellow);
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, {
            message: "Invalid username or password!",
          });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, {
            message: "Invalid username or password!",
          });
        }

        return done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );
};

export default configurePassport;
