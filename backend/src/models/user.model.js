import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cel: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 500000 },
  role: { type: String, enum: ["CLIENT", "ADMIN"], default: "CLIENT" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);