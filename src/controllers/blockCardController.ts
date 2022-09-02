import { Request, Response } from 'express';
import { Card, CardUpdateData, findById, update } from '../repositories/cardRepository';
import { confirmPassword, checkExpirationDate } from '../services/cardServices';
import { sendResponse } from '../repositories/responseRepository';

async function validateCard(cardId: number) {
  const card: Card = await findById(cardId);
  if (!card) throw { type: 'Not Found', message: 'Card not found' };
  if (!card.password) throw { type: 'Not Allowed', message: 'Card unactivated' };
  if (card.isBlocked) throw { type: 'Not Allowed', message: 'Card already blocked' };
  checkExpirationDate(card.expirationDate);
  return card;
}

async function blockCard(req: Request, res: Response) {
  const body: {
    cardId: number,
    password: string
  } = req.body;
  const card: Card = await validateCard(body.cardId);
  await confirmPassword(body.password, String(card.password));
  const updateData: CardUpdateData = {
    isBlocked: true
  };
  await update(card.id, updateData);
  return sendResponse({ type: 'Updated', message: 'Successfully blocked'}, res);
}

export default blockCard;