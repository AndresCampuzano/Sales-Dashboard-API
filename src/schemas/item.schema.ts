import Joi from 'joi';

export const ItemSchema = Joi.object({
  // id: Joi.string(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string(),
  image: Joi.string().required(),
  available_colors: Joi.array().items(Joi.string())
  // created_at: Joi.string(),
  // updated_at: Joi.string()
});
