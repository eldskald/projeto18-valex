import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import dayjs from 'dayjs';
import { config } from 'dotenv';
import { Employee, findById } from '../repositories/employeeRepository';
import * as cardRepository from '../repositories/cardRepository';
config();

const SECRET = String(process.env.SECRET);
const cryptr = new Cryptr(SECRET);

async function validateEmployee(employeeId: number, companyId: number) {
  const employee: Employee = await findById(employeeId);
  if (!employee) throw { type: 'Not Found', message: 'Employee not found' };
  if (employee.companyId != companyId) throw { type: 'Unauthorized', message: 'Not your employee' };
  return employee;
}

async function validateCardType(type: cardRepository.TransactionTypes, employeeId: number) {
  const card: cardRepository.Card = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
  if (card) throw { type: 'Conflict', message: 'Employee already has this card' };
}

function generateCardNumber(): string {
  return faker.finance.creditCardNumber();
}

function generateCardHolderName(name: string): string {
  let words: string[] = name.split(' ');
  words = words.map((word, index) => {
    const aux = word.toUpperCase();
    if (index === 0 || index === words.length - 1) {
      return aux;
    } else {
      return aux[0];
    }
  });
  return words.join(' ');
}

function generateCVV(): string {
  return cryptr.encrypt(faker.finance.creditCardCVV());
}

function generateExpirationDate(): string {
  return dayjs().add(5, 'year').format('MM/YY');
}

export async function createCard(req: Request, res: Response) {
  const body: {
    employeeId: number,
    cardType: cardRepository.TransactionTypes,
  } = req.body;
  const companyId: number = res.locals.company.id;

  const employee: Employee = await validateEmployee(body.employeeId, companyId);
  await validateCardType(body.cardType, body.employeeId);

  const insertData: cardRepository.CardInsertData = {
    employeeId: body.employeeId,
    number: generateCardNumber(),
    cardholderName: generateCardHolderName(employee.fullName),
    securityCode: generateCVV(),
    expirationDate: generateExpirationDate(),
    isVirtual: false,
    isBlocked: false,
    type: body.cardType
  }
  await cardRepository.insert(insertData);

  return res.sendStatus(201);
}