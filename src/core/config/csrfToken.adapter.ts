import { randomBytes } from 'crypto';

export const generateCSRFToken = (length: number = 32): string => {
  return randomBytes(length).toString('hex');
};
