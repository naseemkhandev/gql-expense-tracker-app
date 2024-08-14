import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["card", "cash"],
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["saving", "expense", "investment"],
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "Unknown",
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
