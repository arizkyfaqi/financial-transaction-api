import { AuthService } from "../service/auth.service.js";
import { registerSchema, loginSchema } from "../validation/auth.validation.js";

export const AuthController = {
  async register(req, res) {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    try {
      const user = await AuthService.register(req.body);
      return res.json({ message: "Register success", user });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  async login(req, res) {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    try {
      const result = await AuthService.login(req.body.email, req.body.password);
      return res.json({ message: "Login success", ...result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
