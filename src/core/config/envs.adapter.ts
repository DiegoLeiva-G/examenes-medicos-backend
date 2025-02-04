import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  API_PREFIX: get('DEFAULT_API_PREFIX').default('/api/v1').asString(),
  ENCRYPT_SALT: get('ENCRYPT_SALT').default('1234567890').asString(),
  NODE_ENV: get('NODE_ENV').default('development').asString(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  DOMAIN: get('DOMAIN').required().asString(),
  SESSION_NAME: get('SESSION_NAME').required().asString(),
  DB_SERVER: get('DB_SERVER').required().asString(),
  DB_PORT: get('DB_PORT').required().asString(),
  DB_USER: get('DB_USER').required().asString(),
  DB_PASSWORD: get('DB_PASSWORD').required().asString(),
  CLIENTS_BASE_URL: get('CLIENTS_BASE_URL').required().asArray(','),
  CSRF_TOKEN_NAME: get('CSRF_TOKEN_NAME').required().asString(),
  CLIENT_ID: get('CLIENT_ID').required().asString(),
  CLIENT_SECRET: get('CLIENT_SECRET').required().asString(),
  GRANT_TYPE: get('GRANT_TYPE').required().asString(),
  AUTHORIZE_REDIRECT_URI: get('AUTHORIZE_REDIRECT_URI').required().asString(),
  AUTHORIZE_URL_CU: get('AUTHORIZE_URL_CU').required().asString(),
  TOKEN_URL_CU: get('TOKEN_URL_CU').required().asString(),
  USER_INFO_URL_CU: get('USER_INFO_URL_CU').required().asString(),
  // To seed
  DEFAULT_SA_DNI: get('DEFAULT_SA_DNI').default('11111111-2').asString(),
  DEFAULT_SA_NAME: get('DEFAULT_SA_NAME').default('sa').asString(),
  DEFAULT_SA_PASSWORD: get('DEFAULT_SA_PASSWORD').default('123456').asString(),
  DRIVE_ID_SEED: get('DRIVE_ID_SEED').default('add-env').asString(),
};
