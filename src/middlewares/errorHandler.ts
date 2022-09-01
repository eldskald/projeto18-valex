import { Request, Response, NextFunction } from 'express';

async function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  switch (err.type) {
    case 'Unauthorized':
      res.status(401).send(err.message);
      break;
    case 'Conflict':
      res.status(409).send(err.message);
      break;
    case 'Not Found':
      res.status(404).send(err.message);
      break;
    case 'Wrong Body':
      res.status(422).send(err.message);
      break;
    default:
      console.log(err);
      res.sendStatus(500);
  }
}

export default errorHandler;