const Joi = require('joi');

export const clientSchema = Joi.object({
  // id: Joi.string(),
  name: Joi.string().required(),
  instagram_account: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  phone: Joi.number().required(),
  country: Joi.string().required(),
  email: Joi.string()
  // created_at: Joi.string(),
  // updated_at: Joi.string()
});
