import { Unary } from '@task/shared/types/functional.types';

/** Makes sure the type is a string without leading or trailing spaces */
export const stringToTrimmed: Unary<unknown, string> = ($) => String($ ?? '').trim();

/** Tries to use the error message if viable, otherwise simply converts the error object to a string */
export const errorToString: Unary<unknown, string> = ($) =>
    stringToTrimmed(($ as Error)?.message) || stringToTrimmed($);

/** Attempts to convert input to a trimmed string, then parse it into an integer. Should it fail, returns NaN */
export const stringToInteger: Unary<unknown, number> = ($) => Number.parseInt(stringToTrimmed($));
