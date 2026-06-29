import { stringToInteger, stringToTrimmed } from '@task/shared/utils/transform.utils';

export const SERVER_HOST = stringToTrimmed(process.env.SERVER_HOST) || '0.0.0.0';
export const SERVER_PORT = stringToInteger(process.env.SERVER_PORT) || 3000;
export const SERVER_TIME_ZONE = stringToTrimmed(process.env.API_TIME_ZONE) || 'UTC';

const PG_USER = stringToTrimmed(process.env.POSTGRES_USER) || 'task_user';
const PG_PASS = stringToTrimmed(process.env.POSTGRES_PASSWORD) || 'task_pass';
const PG_DB = stringToTrimmed(process.env.POSTGRES_DB) || 'task_db';
const PG_HOST = stringToTrimmed(process.env.POSTGRES_HOST) || 'localhost';
const PG_PORT = stringToTrimmed(process.env.POSTGRES_PORT) || '5432';

export const DB_CONNECTION_STRING = `postgresql://${PG_USER}:${PG_PASS}@${PG_HOST}:${PG_PORT}/${PG_DB}`;
