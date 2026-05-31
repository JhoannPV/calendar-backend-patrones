import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  MAIL_HOST: get('MAIL_HOST').required().asString(),
  MAIL_PORT: get('MAIL_PORT').required().asPortNumber(),
  MAIL_USER: get('MAIL_USER').required().asString(),
  MAIL_PASS: get('MAIL_PASS').required().asString(),
  MAIL_FROM: get('MAIL_FROM').required().asString(),
  VAPID_PUBLIC_KEY: get('VAPID_PUBLIC_KEY').required().asString(),
  VAPID_PRIVATE_KEY: get('VAPID_PRIVATE_KEY').required().asString(),
  VAPID_SUBJECT: get('VAPID_SUBJECT').required().asString(),
};