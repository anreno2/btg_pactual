import express from "express";
import { getFunds } from "../controllers/fund.controller.js";

const router = express.Router();

router.get("/", getFunds);


export default router;