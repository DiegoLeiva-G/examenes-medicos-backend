import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  API_PREFIX: get('DEFAULT_API_PREFIX').default('/api/v1').asString(),
  NODE_ENV: get('NODE_ENV').default('development').asString(),
  DOMAIN: get('DOMAIN').required().asString(),
  CLIENTS_BASE_URL: get('CLIENTS_BASE_URL').required().asArray(','),
  SESSION_NAME: get('SESSION_NAME').required().asString(),
};
