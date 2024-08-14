import User from "../models/user.model.js";

const userResolver = {
  Query: {
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);

        if (!user) throw new Error("User not found");
        return user;
      } catch (error) {
        console.error("Error in fetching user by id: ", error);
        throw new Error(error);
      }
    },

    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();

        if (!user) throw new Error("User not found");
        return user;
      } catch (error) {
        console.error("Error in fetching authenticated user: ", error);
        throw new Error(error);
      }
    },
  },
};

export default userResolver;
