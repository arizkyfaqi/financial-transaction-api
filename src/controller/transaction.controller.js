import {
  topupSchema,
  paymentSchema,
} from "../validation/transaction.validation.js";
import { TransactionService } from "../service/transaction.services.js";

export class TransactionController {
  static async getBalance(req, res) {
    try {
      const userId = req.user.id;
      const balance = await TransactionService.getBalance(userId);
      res.json({ message: "Get Balance Berhasil", ...balance });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async topup(req, res) {
    try {
      const userId = req.user.id;
      const { error } = topupSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });

      const user = await TransactionService.topup(userId, req.body.amount);
      res.json({ message: "Topup Berhasil", balance: user.balance });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async payment(req, res) {
    try {
      const userId = req.user.id;
      const { error } = paymentSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });

      const transaction_result = await TransactionService.payment(
        userId,
        req.body.service_code
      );
      res.json({ message: "Transaksi berhasil", data: transaction_result });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async history(req, res) {
    try {
      const userId = req.user.id;
      const transactions = await TransactionService.getHistory(userId);
      res.json({ message: "Transaction history", data: transactions });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
