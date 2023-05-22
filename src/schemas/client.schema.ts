import Joi from 'joi';

export const ClientSchema = Joi.object({
  // id: Joi.string(),
  name: Joi.string().required(),
  instagram_account: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  phone: Joi.number().required()
  // created_at: Joi.string(),
  // updated_at: Joi.string()
});
