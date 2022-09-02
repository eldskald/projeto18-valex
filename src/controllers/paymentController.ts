import { Request, Response } from 'express';
import { sendResponse } from '../repositories/responseRepository';
import * as paymentRepo from '../repositories/paymentRepository';
import * as rechargeRepo from '../repositories/rechargeRepository';
import { Business, findById as findBusiness } from '../repositories/businessRepository';
import { Card, TransactionTypes, findById as findCard } from '../repositories/cardRepository';
import { checkExpirationDate, confirmPassword } from '../services/cardServices';

async function validateCard(cardId: number): Promise<Card> {
  let card: Card = await findCard(cardId);
  if (!card) throw { type: 'Not Found', message: 'Card not found' };
  if (!card.password) throw { type: 'Not Allowed', message: 'Card unactivated' };
  if (card.isBlocked) throw { type: 'Not Allowed', message: 'Card is blocked' };
  checkExpirationDate(card.expirationDate);
  return card;
}

async function validateBusiness(businessId: number, cardType: TransactionTypes): Promise<null> {
  let business: Business = await findBusiness(businessId);
  if (!business) throw { type: 'Not Found', message: 'Business not found' };
  if (business.type != cardType) throw { type: 'Not Allowed', message: 'Wrong card type' };
  return null;
}

async function getCardBalance(cardId: number): Promise<number> {
  const recharges: rechargeRepo.Recharge[] = await rechargeRepo.findByCardId(cardId);
  const payments: paymentRepo.Payment[] = await paymentRepo.findByCardId(cardId);
  let balance: number = 0;
  for (const recharge of recharges) balance += recharge.amount;
  for (const payment of payments) balance -= payment.amount;
  return balance;
}

async function checkCardBalance(cardId: number, amount: number): Promise<null> {
  const balance: number = await getCardBalance(cardId);
  if (balance < amount) throw { type: 'Not Allowed', message: 'Not enough balance' };
  return null;
}

async function payment(req: Request, res: Response) {
  const body: {
    cardId: number,
    password: string,
    businessId: number,
    amount: number
  } = req.body;
  const card: Card = await validateCard(body.cardId);
  await confirmPassword(body.password, String(card.password));
  await validateBusiness(body.businessId, card.type);
  await checkCardBalance(body.cardId, body.amount);
  const insertData: paymentRepo.PaymentInsertData = {
    cardId: body.cardId,
    businessId: body.businessId,
    amount: body.amount,
  };
  await paymentRepo.insert(insertData);
  return sendResponse({ type: 'Created', message: 'Payment successful' }, res);
}

export default payment;