import bcrypt from "bcrypt";
import { prismaClient } from "../application/database.js";
import { generateToken } from "../utils/jwt.js";

export const AuthService = {
  async register(data) {
    const hashed = await bcrypt.hash(data.password, 10);

    const user = await prismaClient.user.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: hashed,
      },
    });

    return user;
  },

  async login(email, password) {
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid password");

    const token = generateToken({ id: user.id, email: user.email });
    return { user, token };
  },
};
