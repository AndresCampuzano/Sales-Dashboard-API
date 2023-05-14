import Joi from 'joi';

export const SaleSchema = Joi.object({
  // id: Joi.string(),
  client_id: Joi.string().required(),
  items: Joi.array()
    .items(
      Joi.object({
        item_id: Joi.string().required(),
        quantity: Joi.number().required(),
        color: Joi.string().required()
      })
    )
    .required()
  // created_at: Joi.string(),
  // updated_at: Joi.string()
});