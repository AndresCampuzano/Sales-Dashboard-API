import Joi from 'joi';

/**
 * Check if the body is valid according to the schema
 */
export const isSchemaValid = (
  schema: Joi.ObjectSchema,
  body: any
): Joi.ValidationResult => {
  return schema.validate(body);
};
