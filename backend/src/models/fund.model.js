import mongoose from "mongoose";

const fundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  minimumAmount: { type: Number, required: true },
  category: { type: String, enum: ["FPV", "FIC"], required: true }
});

export default mongoose.model("Fund", fundSchema);