import Joi from 'joi';

export const ItemSchema = Joi.object({
  // id: Joi.string(),
  name: Joi.string().required(),
  price: Joi.number().required().positive(),
  description: Joi.string(),
  image: Joi.string().required(),
  available_colors: Joi.array().min(1).required().items(Joi.string())
  // created_at: Joi.string(),
  // updated_at: Joi.string()
}).options({ convert: false });
