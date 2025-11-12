import express from "express";
import authRoute from "./auth.routes.js";
import transactionRoute from "./transaction.routes.js";
import serviceRoute from "./service.routes.js";
import userRouter from "./user.routes.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRouter);
router.use("/service", serviceRoute);
router.use("/transactions", transactionRoute);

export default router;
