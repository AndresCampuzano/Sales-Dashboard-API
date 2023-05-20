import Joi from 'joi';

export const AdSchema = Joi.object({
  // id: Joi.string(),
  platform: Joi.string().required(),
  item_id: Joi.string().required(),
  item_color: Joi.string().required(),
  budget: Joi.number().required(),
  target_audience: Joi.string().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required()
  // created_at: Joi.string(),
  // updated_at: Joi.string()
});
