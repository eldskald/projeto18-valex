import { Request, Response, NextFunction } from 'express';
import { findByApiKey } from '../repositories/companyRepository';

async function apiKeyValidation(req: Request, res: Response, next: NextFunction) {
  const apiKey = String(req.headers['x-api-key']);
  const company = await findByApiKey(apiKey);
  if (!company) throw { type: 'Unauthorized', message: 'Unauthorized'};
  res.locals.company = company;
  next();
}

export default apiKeyValidation;