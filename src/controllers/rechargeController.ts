import { Request, Response } from 'express';
import { sendResponse } from '../repositories/responseRepository';
import { insert } from '../repositories/rechargeRepository';
import { Card, findById } from '../repositories/cardRepository';
import { checkExpirationDate } from '../services/cardServices';

async function validateCard(cardId: number): Promise<null> {
  let card: Card = await findById(cardId);
  if (!card) throw { type: 'Not Found', message: 'Card not found' };
  if (!card.password) throw { type: 'Not Allowed', message: 'Card unactivated' };
  checkExpirationDate(card.expirationDate);
  return null;
}

async function recharge(req: Request, res: Response) {
  const body: {
    cardId: number,
    amount: number
  } = req.body;
  const companyId: number = res.locals.company.id;
  await validateCard(body.cardId);
  await insert(body);
  return sendResponse({ type: 'Created', message: 'Recharge successful' }, res);
}

export default recharge;