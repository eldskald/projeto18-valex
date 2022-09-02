import { Request, Response } from 'express';
import { Employee, findById } from '../repositories/employeeRepository';
import {
  Card, TransactionTypes, CardInsertData, findByTypeAndEmployeeId, insert
} from '../repositories/cardRepository';
import {
  generateCardNumber, generateCardHolderName, generateCVC, generateExpirationDate, encryptCVC
} from '../services/cardServices';
import { sendResponse } from '../repositories/responseRepository';

async function validateEmployee(employeeId: number, companyId: number): Promise<Employee> {
  const employee: Employee = await findById(employeeId);
  if (!employee) throw { type: 'Not Found', message: 'Employee not found' };
  if (employee.companyId != companyId) throw { type: 'Unauthorized', message: 'Not your employee' };
  return employee;
}

async function validateCardType(type: TransactionTypes, employeeId: number): Promise<null> {
  const card: Card = await findByTypeAndEmployeeId(type, employeeId);
  if (card) throw { type: 'Conflict', message: 'Employee already has this card' };
  return null;
}

async function createCard(req: Request, res: Response) {
  const body: {
    employeeId: number,
    cardType: TransactionTypes,
  } = req.body;
  const companyId: number = res.locals.company.id;

  const employee: Employee = await validateEmployee(body.employeeId, companyId);
  await validateCardType(body.cardType, body.employeeId);

  const generatedCard = {
    number: generateCardNumber(),
    cardholderName: generateCardHolderName(employee.fullName),
    securityCode: generateCVC(),
    expirationDate: generateExpirationDate(),
    type: body.cardType
  };

  const insertData: CardInsertData = {
    employeeId: body.employeeId,
    number: generatedCard.number,
    cardholderName: generatedCard.cardholderName,
    securityCode: encryptCVC(generatedCard.securityCode),
    expirationDate: generatedCard.expirationDate,
    isVirtual: false,
    isBlocked: false,
    type: body.cardType
  }
  const cardId: number = await insert(insertData);

  return sendResponse({ type: 'Created', message: {cardId, ...generatedCard} }, res)
}

export default createCard;