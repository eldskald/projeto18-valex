import joi from 'joi';

const schema = joi.object({
  employeeId: joi.number()
    .required()
    .messages({
      'number.base': 'Employee ID must be a number',
      'any.required': 'Employee ID is required'
    }),
  cardType: joi.any()
    .valid('groceries', 'restaurants', 'transport', 'education', 'health')
    .required()
    .messages({
      'any.only': 'Invalid card type',
      'any.required': 'Card type is required'
    })
});

export default schema;