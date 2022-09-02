import joi from 'joi';

const schema = joi.object({
  cardId: joi.number()
    .required()
    .messages({
      'number.base': 'Card ID must be a number',
      'any.required': 'Card ID is required'
    }),
  password: joi.string()
    .pattern(/^[0-9]{4}$/)
    .required()
    .messages({
      'string.base': 'Password must be a 4 digits number',
      'string.pattern.base': 'Password must be a 4 digits number',
      'any.required': 'Password is required'
    }),
  businessId: joi.number()
    .required()
    .messages({
      'number.base': 'Business ID must be a number',
      'any.required': 'Business ID is required'
    }),
  amount: joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Amount must be a positive integer',
      'number.integer': 'Amount must be a positive integer',
      'number.positive': 'Amount must be a positive integer',
      'any.required': 'Amount is required',
    })
});

export default schema;