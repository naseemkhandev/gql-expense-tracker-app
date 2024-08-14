import { transactions } from "../data/index.js";

const transactionResolver = {
  Query: {
    transactions: () => {
      return transactions;
    },
  },

  Mutation: {},
};

export default transactionResolver;
