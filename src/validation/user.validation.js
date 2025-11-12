import Joi from "joi";

export const updateUserSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
});
