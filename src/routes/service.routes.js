import express from "express";
import {
  getAllServices,
  createManyServices,
  createManyBanner,
  getAllBanner,
} from "../controller/service.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
authMiddleware;

const serviceRoute = express.Router();
/**
 * @swagger
 * tags:
 *   name: Service
 *   description: API get service list
 */

/**
 * @swagger
 * /api/service/banner:
 *   get:
 *     summary: Get all list banner
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan list banner
 */
serviceRoute.get("/banner", getAllBanner);

serviceRoute.use(authMiddleware);

/**
 * @swagger
 * /api/service/:
 *   get:
 *     summary: Get all list service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan list service
 */
serviceRoute.get("/", getAllServices);
serviceRoute.post("/", createManyServices);

serviceRoute.post("/banner", createManyBanner);

export default serviceRoute;
