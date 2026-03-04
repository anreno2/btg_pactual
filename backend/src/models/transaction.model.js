import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fundId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fund",
    required: true
  },
  status: { type: Boolean, enum: [true, false], default: true },
  amount: { type: Number, required: true},
  notification: { type: String }
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);