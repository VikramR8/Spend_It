import express from "express";
import { PORT } from "./src/configs/config.js";
import rateLimiter from "./src/middlewares/rateLimit.js";
import  transactionRoute  from "./src/routes/transactionsRoutes.js";
import { initDB } from "./src/configs/config.js";

const app = express();

app.use(rateLimiter);
app.use(express.json());

app.use("/api/transactions", transactionRoute)

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
