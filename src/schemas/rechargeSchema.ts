import joi from 'joi';

const schema = joi.object({
  cardId: joi.number()
    .required()
    .messages({
      'number.base': 'Card ID must be a number',
      'any.required': 'Card ID is required'
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