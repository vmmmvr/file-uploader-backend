import jwt from 'jsonwebtoken';
import { ENV } from '../../config';

const JWT_SECRET = ENV.JWT_SECRET || 'mysecretkey';
const JWT_EXPIRATION = ENV.JWT_EXPIRATION || '1h';

export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}
