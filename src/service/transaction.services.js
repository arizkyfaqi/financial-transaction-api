import { prismaClient } from "../application/database.js";

export class TransactionService {
  static async getBalance(userId) {
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    return { balance: user.balance ?? 0 };
  }

  static async topup(userId, amount) {
    if (amount <= 0)
      throw new Error(
        "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0"
      );

    return await prismaClient.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { balance: { increment: amount } },
      });

      await tx.transaction.create({
        data: {
          userId,
          type: "TOPUP",
          amount,
        },
      });

      return updatedUser;
    });
  }

  static async payment(userId, service_code) {
    console.info("userId : ", userId);
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    // Cek Service
    const service_ = await prismaClient.service.findUnique({
      where: { service_code },
    });
    if (!service_) {
      return res.status(400).json({ message: "Service not found" });
    }

    // Ambil tarif dari service
    const amount = service_.service_tariff;

    // Cek saldo user
    if (user.balance < amount) {
      return res.status(400).json({ message: "Saldo tidak cukup" });
    }

    await prismaClient.$transaction(async (tx) => {
      //update saldo
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: amount } },
      });

      //simpan transaksi
      await tx.transaction.create({
        data: {
          userId,
          serviceId: service_.id,
          type: "PAYMENT",
          amount,
        },
        include: { service: true },
      });
    });

    const trx_dt = Date.now();
    const currentDate = new Date();
    const invoice_number = `INV-${trx_dt}-${userId}`;
    return {
      invoice_number,
      service_code,
      service_name: service_.service_name,
      transaction_type: "PAYMENT",
      total_amount: amount,
      created_on: currentDate,
    };
  }

  static async getHistory(userId) {
    return await prismaClient.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }
}
