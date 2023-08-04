import Joi from 'joi';

export const ExpenseSchema = Joi.object({
  // id: Joi.string(),
  name: Joi.string().required(),
  type: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.optional()
  // created_at: Joi.string(),
  // updated_at: Joi.string()
});
