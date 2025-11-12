import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { TransactionController } from "../controller/transaction.controller.js";

const transactionRouter = express.Router();
transactionRouter.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: API untuk transaksi keuangan
 */

/**
 * @swagger
 * /api/transactions/balance:
 *   get:
 *     summary: Cek saldo pengguna
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan saldo pengguna
 */
transactionRouter.get("/balance", TransactionController.getBalance);

/**
 * @swagger
 * /api/transactions/topup:
 *   post:
 *     summary: Top up saldo pengguna
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100000
 *     responses:
 *       200:
 *         description: Top up berhasil
 */
transactionRouter.post("/topup", TransactionController.topup);

/**
 * @swagger
 * /api/transactions/pay:
 *   post:
 *     summary: Melakukan pembayaran (PULSA, LISTRIK, PDAM)
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_code:
 *                 type: string
 *                 example: PULSA
 *     responses:
 *       200:
 *         description: Pembayaran berhasil
 *       400:
 *         description: Saldo tidak cukup
 */
transactionRouter.post("/pay", TransactionController.payment);

/**
 * @swagger
 * /api/transactions/history:
 *   get:
 *     summary: Melihat riwayat transaksi pengguna
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil menampilkan riwayat transaksi
 */
transactionRouter.get("/history", TransactionController.history);

export default transactionRouter;
