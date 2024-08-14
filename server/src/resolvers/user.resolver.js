import { users } from "../data/index.js";

const userResolver = {
  Query: {
    users: () => {
      return users;
    },
  },
};

export default userResolver;
