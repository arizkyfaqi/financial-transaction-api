import Joi from "joi";

export const topupSchema = Joi.object({
  amount: Joi.number().positive().required(),
});

export const paymentSchema = Joi.object({
  service_code: Joi.string().required(),
});
