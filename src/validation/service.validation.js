import Joi from "joi";

export const createManyServicesSchema = Joi.array().items(
  Joi.object({
    service_code: Joi.string().required(),
    service_name: Joi.string().required(),
    service_icon: Joi.string().allow(null, ""),
    service_tariff: Joi.number().integer().min(0).required(),
  })
);

export const createManyBannerSchema = Joi.array().items(
  Joi.object({
    banner_name: Joi.string().required(),
    banner_image: Joi.string().required(),
    description: Joi.string().required(),
  })
);
