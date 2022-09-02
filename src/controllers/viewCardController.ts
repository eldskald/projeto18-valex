import { Request, Response } from 'express';
import * as paymentRepo from '../repositories/paymentRepository';
import * as rechargeRepo from '../repositories/rechargeRepository';
import { Card, findById } from '../repositories/cardRepository';
import { sendResponse } from '../repositories/responseRepository';

function validateParam(param: string): number {
  const id = parseInt(param);
  if (!id) throw { type: 'Unprocessable', message: 'Invalid card ID' };
  return id;
}

async function validateCard(cardId: number): Promise<null> {
  const card: Card = await findById(cardId);
  if (!card) throw { type: 'Not Found', message: 'Card not found' };
  return null;
}

function calculateBalance(
  recharges: rechargeRepo.Recharge[], payments: paymentRepo.Payment[]
): number {
  let balance: number = 0;
  for (const recharge of recharges) balance += recharge.amount;
  for (const payment of payments) balance -= payment.amount;
  return balance;
}

async function viewCard(req: Request, res: Response) {
  const cardId: number = await validateParam(req.params.id);
  await validateCard(cardId);
  const recharges: rechargeRepo.Recharge[] = await rechargeRepo.findByCardId(cardId);
  const payments: paymentRepo.Payment[] = await paymentRepo.findByCardId(cardId);
  const data = {
    balance: calculateBalance(recharges, payments),
    transactions: payments,
    recharges
  };
  return sendResponse({ type: 'Ok', message: data }, res);
}

export default viewCard;