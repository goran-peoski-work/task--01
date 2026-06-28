import { stringToInteger, stringToTrimmed } from '@task/shared/utils/transform.utils';

export const SERVER_HOST = stringToTrimmed(process.env.SERVER_HOST) || '0.0.0.0';
export const SERVER_PORT = stringToInteger(process.env.SERVER_PORT) || 3000;
export const SERVER_TIME_ZONE = stringToTrimmed(process.env.API_TIME_ZONE) || 'UTC';
