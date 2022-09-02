import { Request, Response } from 'express';
import { Card, CardUpdateData, findById, update } from '../repositories/cardRepository';
import { confirmCVC, encryptPassword } from '../services/cardServices';
import { sendResponse } from '../repositories/responseRepository';

async function validateCard(cardId: number, cvc: string): Promise<Card> {
  const card: Card = await findById(cardId);
  if (!card) throw { type: 'Not Found', message: 'Card not found' };
  if (card.password) throw { type: 'Not Allowed', message: 'Card already activated' }
  confirmCVC(cvc, card.securityCode);
  return card;
}

async function activateCard(req: Request, res: Response) {
  const body: {
    cardId: number,
    cvc: string,
    password: string
  } = req.body;
  const card: Card = await validateCard(body.cardId, body.cvc);
  const passwordHash = await encryptPassword(body.password);
  const updateData: CardUpdateData = {
    password: passwordHash
  };
  await update(card.id, updateData);
  return sendResponse({ type: 'Updated', message: 'Successfully activated' }, res);
}

export default activateCard;