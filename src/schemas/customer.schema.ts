import Joi from 'joi';

export const CustomerSchema = Joi.object({
  // id: Joi.string(),
  name: Joi.string().required(),
  instagram_account: Joi.string().required(),
  address: Joi.string().required(),
  department: Joi.string().required(),
  city: Joi.string().required(),
  phone: Joi.number().required().positive()
  // created_at: Joi.string(),
  // updated_at: Joi.string()
}).options({ convert: false });
