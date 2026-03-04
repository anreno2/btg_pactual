import mongoose from "mongoose";
import Fund from "../src/models/fund.model.js";
import dotenv from "dotenv";

dotenv.config();

const funds = [
  { name: "FPV_BTG_PACTUAL_RECAUDADORA", minimumAmount: 75000, category: "FPV" },
  { name: "FPV_BTG_PACTUAL_ECOPETROL", minimumAmount: 125000, category: "FPV" },
  { name: "DEUDAPRIVADA", minimumAmount: 50000, category: "FIC" },
  { name: "FDO-ACCIONES", minimumAmount: 250000, category: "FIC" },
  { name: "FPV_BTG_PACTUAL_DINAMICA", minimumAmount: 100000, category: "FPV" }
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://anreno_db_user:c8vzo1FjScOKyPaF@cluster0.zuu6gqv.mongodb.net/?appName=Cluster0");
  await Fund.deleteMany();
  await Fund.insertMany(funds);
  console.log("Fondos insertados");
  process.exit();
};

seed();