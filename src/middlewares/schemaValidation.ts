import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

function schemaValidation(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validate = schema.validate(req.body, { abortEarly: false })
    if (validate.error) {
      const message: string = validate.error.details.map(value => value.message).join('\n');
      throw { type: 'Wrong Body', message };
    }

    next();
  }
}

export default schemaValidation;