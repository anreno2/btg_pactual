import express from "express";
import cors from "cors";
import helmet from "helmet";
import fundRoutes from "./routes/fund.routes.js";
import authRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/funds", authMiddleware, fundRoutes);
app.use("/api/transactions", authMiddleware, transactionRoutes);



export default app;