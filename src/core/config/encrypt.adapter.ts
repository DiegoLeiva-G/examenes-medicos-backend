import { createHash } from 'crypto';
import { envs } from './envs.adapter';

const salt = envs.ENCRYPT_SALT;

export const basicEncrypt = {
  hashPassword: (password: string): string => {
    return createHash('sha256')
      .update(salt + password)
      .digest('hex');
  },

  comparePassword: (password: string, hash: string): boolean => {
    const newHash = createHash('sha256')
      .update(salt + password)
      .digest('hex');

    return newHash === hash;
  },
};
