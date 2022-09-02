import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../repositories/responseRepository';

async function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  return sendResponse(err, res);
}

export default errorHandler;