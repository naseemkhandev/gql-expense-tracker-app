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

  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });

        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.error("Error in creating transaction: ", error);
        throw new Error(error);
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );

        if (!updatedTransaction) throw new Error("Transaction not found");
        return updatedTransaction;
      } catch (error) {
        console.error("Error in updating transaction: ", error);
        throw new Error(error);
      }
    },
    deleteTransaction: async (_, { id }) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) throw new Error("Transaction not found");
        return deletedTransaction;
      } catch (error) {
        console.error("Error in deleting transaction: ", error);
        throw new Error(error);
      }
    },
  },
};

export default transactionResolver;
