import joi from 'joi';

const schema = joi.object({
  cardNumber: joi.string()
    .pattern(/^[0-9-]+$/)
    .required()
    .messages({
      'string.base': 'Card number must be a text of numbers and dashes only',
      'string.pattern.base': 'Card number must be a text of numbers and dashes only',
      'any.required': 'Card number is required'
    }),
  cardHolderName: joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .required()
    .messages({
      'string.base': 'Card holder name must be a text',
      'string.pattern.base': 'Card holder name is composed of letters only',
      'any.required': 'Card holder name is required'
    }),
  expirationDate: joi.string()
    .pattern(/^[0-9]{2}\/[0-9]{2}$/)
    .required()
    .messages({
      'string.base': 'Expiration date must be on format MM/YY',
      'string.pattern.base': 'Expiration date must be on format MM/YY',
      'any.required': 'Expiration date is required'
    }),
  securityCode: joi.string()
    .pattern(/^[0-9]{3,4}$/)
    .required()
    .messages({
      'string.base': 'Security code must be a 3 or 4 digits number',
      'string.pattern.base': 'Security code must be a 3 or 4 digits number',
      'any.required': 'Security code is required'
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