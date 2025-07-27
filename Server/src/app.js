import express from "express";
import { PORT } from "./configs/config.js";
import rateLimiter from "./middlewares/rateLimit.js";
import  transactionRoute  from "./routes/transactionsRoutes.js";
import { initDB } from "./configs/config.js";

const app = express();

app.use(rateLimiter);
app.use(express.json());

app.use("/api/transactions", transactionRoute)

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
