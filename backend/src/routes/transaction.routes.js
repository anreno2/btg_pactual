import express from "express";
import { setSubcribe, getAllTransactions } from "../controllers/transactions.controller.js";

const router = express.Router();

router.post("/get-all-transactions", getAllTransactions);
router.post("/subscribe", setSubcribe);



export default router;