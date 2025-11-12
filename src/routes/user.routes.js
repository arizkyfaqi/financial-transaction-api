import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const userRouter = Router();
userRouter.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and profile operations
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile fetched
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     photo:
 *                       type: string
 *                       example: /uploads/profile/user_1_1731000000.jpg
 */
userRouter.get("/profile", UserController.getProfile);

/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Module Membership]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: test
 *               last_name:
 *                 type: string
 *                 example: test
 *     responses:
 *       200:
 *         description: Successfully updated user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated
 *                 data:
 *                   $ref: '#/components/schemas/User'
 */
userRouter.put("/profile", UserController.updateProfile);

/**
 * @swagger
 * /api/user/profile/photo:
 *   put:
 *     summary: Update user profile photo
 *     tags: [Module Membership]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully uploaded profile photo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Photo updated successfully
 *                 photo:
 *                   type: string
 *                   example: /uploads/profile/user_1_1731000000.jpg
 */
userRouter.put(
  "/profile/photo",
  upload.single("photo"),
  UserController.updatePhoto
);

export default userRouter;
