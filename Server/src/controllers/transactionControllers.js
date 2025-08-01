import { connectDB } from "../configs/config.js";

export async function postTransactions(req, res) {
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !amount || !category || !user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction =
      await connectDB`INSERT INTO transactions (title, amount, category, user_id) 
        VALUES (${title}, ${amount}, ${category}, ${user_id}) 
        RETURNING *`;
    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error creating transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getTransactionsByUserId(req, res) {
  try {
    const { userId } = req.params;
    const transactions = await connectDB`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error fetching transactions", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteTransactionsById(req, res) {
  try {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }
    const transaction = await connectDB`
        DELETE FROM transactions WHERE id = ${id} 
        RETURNING       *`;
    if (transaction.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log("Error deleting transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getTransactionsSummaryByUserId(req, res) {
  try {
    const { userId } = req.params;
    const balanceResult = await connectDB`
    SELECT COALESCE(SUM(amount), 0) AS balance FROM transactions WHERE user_id = ${userId}`;

    const incomeResult = await connectDB`
    SELECT COALESCE(SUM(amount), 0) AS income FROM transactions WHERE user_id = ${userId} AND amount > 0`;

    const expenseResult = await connectDB`
    SELECT COALESCE(SUM(amount), 0) AS expense FROM transactions WHERE user_id = ${userId} AND amount < 0`;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expense: expenseResult[0].expense,
    });
  } catch (error) {
    console.log("Error fetching summary", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
