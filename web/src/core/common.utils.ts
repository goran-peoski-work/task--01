import type { Nullable } from '@task/shared/types/core.types';

export const ALWAYS_EMPTY_ARRAY: readonly never[] = Object.freeze([]);
export const ALWAYS_EMPTY_OBJECT: Record<PropertyKey, never> = Object.freeze({});

type AsArray = <T = unknown>($: Nullable<T[]>) => T[] | typeof ALWAYS_EMPTY_ARRAY;
type AsObject = <T = unknown>($: Nullable<T>) => T | typeof ALWAYS_EMPTY_OBJECT;

export const asArray: AsArray = ($) => (Array.isArray($) ? $ : ALWAYS_EMPTY_ARRAY);
export const asObject: AsObject = ($) => $ ?? ALWAYS_EMPTY_OBJECT;
