import type { ApiDataResponse, ApiErrorResponse, ApiResponse, HttpCode } from '#shared/types/communication.types.js';

export const isHttpCode = ($: unknown): $ is HttpCode =>
    'number' === typeof $ && 99 < $ && 600 > $ && Number.isInteger($);

export const isApiDataResponse = ($: unknown): $ is ApiDataResponse => {
    const { hc, data, error } = ($ ?? {}) as ApiResponse;
    return isHttpCode(hc) && null !== data && undefined !== data && null === error;
};

export const isApiErrorResponse = ($: unknown): $ is ApiErrorResponse => {
    const { hc, data, error } = ($ ?? {}) as ApiResponse;
    return isHttpCode(hc) && null !== error && undefined !== error && null === data;
};

export const isApiResponse = ($: unknown): $ is ApiResponse => isApiDataResponse($) || isApiErrorResponse($);
