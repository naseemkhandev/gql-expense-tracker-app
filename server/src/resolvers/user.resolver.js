import { users } from "../data/index.js";

const userResolver = {
  Query: {
    users: () => {
      return users;
    },
  },

  Mutation: {},
};

export default userResolver;
