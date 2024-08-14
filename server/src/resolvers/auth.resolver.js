import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

const authResolver = {
  Mutation: {
    register: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;

        if (!username || !name || !password || !gender)
          throw new Error("Please fill in all fields!");

        const existingUser = await User.findOne({ username });
        if (existingUser) throw new Error("User already registered!");

        const hashedPassword = await bcrypt.hash(password, 10);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const user = new User({
          username,
          name,
          gender,
          password: hashedPassword,
          profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });
        await user.save();
        await context.login(user);
        return user;
      } catch (error) {
        console.error("Error registering user:", error);
        throw new Error(error.message || "Internal server error!");
      }
    },
    login: async (_, { input }) => {},
    logout: async () => {},
  },
};

export default authResolver;
