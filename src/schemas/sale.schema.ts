import Joi from 'joi';

export const SaleSchema = Joi.object({
  // id: Joi.string(),
  client_id: Joi.string().required(),
  // README: client_snapshot is saved in the BE
  items: Joi.array()
    .min(1).required()
    .items(
      Joi.object({
        item_id: Joi.string().required(),
        color: Joi.string().required(),
        price: Joi.number().required().positive()
      })
    )
  // created_at: Joi.string(),
  // updated_at: Joi.string()
}).options({ convert: false });
