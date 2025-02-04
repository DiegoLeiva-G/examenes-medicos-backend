import * as crypto from 'crypto';
import { envs } from './envs.adapter';

const JWT_SEED = envs.JWT_SEED;

export const basicJWT = {
  generateToken: (payload: Record<string, unknown>, expiresIn: number = 60 * 60): string => {
    const header = { alg: 'HS256', typ: 'JWT' };

    const exp = Math.floor(Date.now() / 1000) + expiresIn;
    const payloadWithExp = { ...payload, exp };

    const headerEncoded = base64UrlEncode(JSON.stringify(header));
    const payloadEncoded = base64UrlEncode(JSON.stringify(payloadWithExp));

    const signature = crypto
      .createHmac('sha256', JWT_SEED)
      .update(`${headerEncoded}.${payloadEncoded}`)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    return `${headerEncoded}.${payloadEncoded}.${signature}`;
  },

  /**
   * Verifies a JWT token.
   * @param {string} token - The JWT token to verify.
   * @returns {Record<string, any> | null} The decoded payload if the token is valid, otherwise null.
   */
  validateToken: <T>(token: string): T | null => {
    const [headerEncoded, payloadEncoded, signature] = token.split('.');

    const signatureCheck = crypto
      .createHmac('sha256', JWT_SEED)
      .update(`${headerEncoded}.${payloadEncoded}`)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    if (signature !== signatureCheck) {
      return null;
    }

    const payload = JSON.parse(base64UrlDecode(payloadEncoded));

    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < currentTimestamp) {
      return null;
    }

    return payload;
  },
};

/**
 * Encodes a string or Buffer to Base64 URL-safe format.
 * @param {string | Buffer} data - The data to encode.
 * @returns {string} The Base64 URL-safe encoded string.
 */
function base64UrlEncode(data: string | Buffer): string {
  return Buffer.from(data).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * Decodes a Base64 URL-safe string.
 * @param {string} base64Url - The Base64 URL-safe encoded string.
 * @returns {string} The decoded string.
 */
function base64UrlDecode(base64Url: string): string {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((3 * base64Url.length) % 4);
  return Buffer.from(base64, 'base64').toString('utf8');
}
