import express from "express";
import {
  deleteTransactionsById,
  getTransactionsByUserId,
  getTransactionsSummaryByUserId,
  postTransactions,
} from "../controllers/transactionControllers.js";

const router = express.Router();

router.post("/", postTransactions);

router.get("/:userId", getTransactionsByUserId);

router.delete("/:id", deleteTransactionsById);

router.get("/summary/:userId", getTransactionsSummaryByUserId);

export default router;
