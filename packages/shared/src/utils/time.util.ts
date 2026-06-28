import { Nullary, Unary } from '@task/shared/types/functional.types';

export const nowAsZulu: Nullary<string> = () => new Date().toISOString();
export const nowAsTzZulu: Unary<string, string> = (timeZone) => nowAsZulu() + '[' + timeZone + ']';
