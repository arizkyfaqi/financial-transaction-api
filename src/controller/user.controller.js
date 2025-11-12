import { UserService } from "../service/user.service.js";
import { updateUserSchema } from "../validation/user.validation.js";

export class UserController {
  static async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await UserService.getProfile(userId);
      res.json({ message: "Profile fetched", data: user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateProfile(req, res) {
    try {
      const { error } = updateUserSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });
      const userId = req.user.id;
      const updated = await UserService.updateProfile(userId, req.body);
      res.json({ message: "Profile updated", data: updated });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updatePhoto(req, res) {
    try {
      const userId = req.user.id;
      if (!req.file)
        return res.status(400).json({ message: "No image uploaded" });

      const user = await UserService.updatePhoto(
        userId,
        req.file.buffer,
        req.file.originalname
      );
      res.json({ message: "Photo updated successfully", photo: user.photo });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
