import joi from 'joi';

const schema = joi.object({
  cardId: joi.number()
    .required()
    .messages({
      'number.base': 'Card ID must be a number',
      'any.required': 'Card ID is required'
    }),
  cvc: joi.string()
    .pattern(/^[0-9]{3,4}$/)
    .required()
    .messages({
      'string.base': 'Security code must be a 3 or 4 digits number',
      'string.pattern.base': 'Security code must be a 3 or 4 digits number',
      'any.required': 'Security code is required'
    }),
  password: joi.string()
    .pattern(/^[0-9]{4}$/)
    .required()
    .messages({
      'string.base': 'Password must be a 4 digits number',
      'string.pattern.base': 'Password must be a 4 digits number',
      'any.required': 'Password is required'
    })
});

export default schema;