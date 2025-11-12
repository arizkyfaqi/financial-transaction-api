import { prismaClient } from "../application/database.js";
import { createManyServicesSchema } from "../validation/service.validation.js";
import { createManyBannerSchema } from "../validation/service.validation.js";
import { logger } from "../application/logging.js";

export const getAllServices = async (req, res) => {
  try {
    const services = await prismaClient.service.findMany({
      orderBy: { id: "asc" },
    });

    res.json({
      message: "List of services",
      data: services,
    });
  } catch (error) {
    logger.error("Error fetching services:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createManyServices = async (req, res) => {
  try {
    const { error, value } = createManyServicesSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const result = await prismaClient.service.createMany({
      data: value,
      skipDuplicates: true,
    });

    res.status(201).json({
      message: `${result.count} services created successfully`,
    });
  } catch (error) {
    logger.error("Error creating services:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllBanner = async (req, res) => {
  try {
    const banner = await prismaClient.banner.findMany({
      orderBy: { id: "asc" },
    });

    res.json({
      message: "List of banner",
      data: banner,
    });
  } catch (error) {
    logger.error("Error fetching banner:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createManyBanner = async (req, res) => {
  try {
    const { error, value } = createManyBannerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const result = await prismaClient.banner.createMany({
      data: value,
      skipDuplicates: true,
    });

    res.status(201).json({
      message: `${result.count} services created successfully`,
    });
  } catch (error) {
    logger.error("Error creating services:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
