import { Request, Response } from 'express';
import { sendResponse } from '../repositories/responseRepository';
import * as paymentRepo from '../repositories/paymentRepository';
import * as rechargeRepo from '../repositories/rechargeRepository';
import { Business, findById as findBusiness } from '../repositories/businessRepository';
import { Card, TransactionTypes, findByCardDetails, findById as findCard } from '../repositories/cardRepository';
import { checkExpirationDate, confirmPassword, confirmCVC } from '../services/cardServices';

function checkCardState(card: Card | undefined): null {
  if (!card) throw { type: 'Not Found', message: 'Card not found' };
  if (!card.password) throw { type: 'Not Allowed', message: 'Card unactivated' };
  if (card.isBlocked) throw { type: 'Not Allowed', message: 'Card is blocked' };
  checkExpirationDate(card.expirationDate);
  return null;
}

async function validateCardById(cardId: number): Promise<Card> {
  const card: Card = await findCard(cardId);
  checkCardState(card);
  return card;
}

async function validateCardByData(
  cardNumber: string, cardHolder: string, expiration: string
): Promise<Card> {
  const card: Card = await findByCardDetails(cardNumber, cardHolder, expiration);
  checkCardState(card);
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

export async function payment(req: Request, res: Response) {
  const body: {
    cardId: number,
    password: string,
    businessId: number,
    amount: number
  } = req.body;
  const card: Card = await validateCardById(body.cardId);
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

export async function onlinePayment(req: Request, res: Response) {
  const body: {
    cardNumber: string,
    cardHolderName: string,
    securityCode: string,
    expirationDate: string,
    businessId: number,
    amount: number
  } = req.body;
  const card: Card = await validateCardByData(
    body.cardNumber,
    body.cardHolderName,
    body.expirationDate
  );
  confirmCVC(body.securityCode, card.securityCode);
  await validateBusiness(body.businessId, card.type);
  await checkCardBalance(card.id, body.amount);
  const insertData: paymentRepo.PaymentInsertData = {
    cardId: card.id,
    businessId: body.businessId,
    amount: body.amount,
  };
  await paymentRepo.insert(insertData);
  return sendResponse({ type: 'Created', message: 'Payment successful' }, res);
}
