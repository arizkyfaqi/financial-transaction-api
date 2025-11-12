import { prismaClient } from "../application/database.js";
import sharp from "sharp";
import path from "path";
import fs from "fs";

export class UserService {
  static async getProfile(userId) {
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    return user;
  }

  static async updateProfile(userId, data) {
    const user = await prismaClient.user.update({
      where: { id: userId },
      data,
    });
    return user;
  }

  static async updatePhoto(userId, fileBuffer) {
    const fileName = `user_${userId}_${Date.now()}.jpg`;

    const uploadDir = path.join(process.cwd(), "uploads/profile");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const outputPath = path.join(uploadDir, fileName);

    // Resize image pakai Sharp
    await sharp(fileBuffer)
      .resize(300, 300)
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    const photoPath = `/uploads/profile/${fileName}`;
    const user = await prismaClient.user.update({
      where: { id: userId },
      data: { photo: photoPath },
    });

    console.log("Saving photo to:", outputPath);

    return user;
  }
}
