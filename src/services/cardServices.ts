import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { config } from 'dotenv';
config();

const SECRET = String(process.env.SECRET);
const cryptr = new Cryptr(SECRET);

export function generateCardNumber(): string {
  return faker.finance.creditCardNumber();
}

export function generateCardHolderName(name: string): string {
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

export function generateCVC(): string {
  return faker.finance.creditCardCVV();
}

export function generateExpirationDate(): string {
  return dayjs().add(5, 'year').format('MM/YY');
}

export function encryptCVC(code: string): string {
  return cryptr.encrypt(code);
}

export function confirmCVC(code: string, encryptedCode: string): null {
  const decryptedCode = cryptr.decrypt(encryptedCode);
  if (decryptedCode != code) throw { type: 'Unauthorized', message: 'Wrong security code' };
  return null;
}

export async function encryptPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function confirmPassword(password: string, passwordHash: string): Promise<null> {
  const result: boolean = await bcrypt.compare(password, passwordHash);
  if (!result) throw { type: 'Unauthorized', message: 'Wrong password' };
  return null;
}

export function checkExpirationDate(date: string): null {
  const today: string = dayjs().format('YY/MM');
  const reformattedDate: string = date.split('/').reverse().join('/');
  if (today > reformattedDate) throw { type: 'Not Allowed', message: 'Card expired' };
  return null;
}