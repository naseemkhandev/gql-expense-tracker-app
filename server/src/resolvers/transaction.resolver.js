import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        const user = await context.getUser();
        if (!user) throw new Error("User not authenticated");

        const transactions = await Transaction.find({ userId: user._id });
        return transactions;
      } catch (error) {
        console.error("Error in fetching transactions: ", error);
        throw new Error(error);
      }
    },

    transaction: async (_, { id }) => {
      try {
        const transaction = await Transaction.findById(id);
        if (!transaction) throw new Error("Transaction not found");

        return transaction;
      } catch (error) {
        console.error("Error in fetching transaction by id: ", error);
        throw new Error(error);
      }
    },
  },

  Mutation: {},
};

export default transactionResolver;
