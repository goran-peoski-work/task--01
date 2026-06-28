import type { ApiDataResponse, ApiErrorResponse, ApiResponse } from '@task/shared/types/communication.types';
import type { NullaryAsync } from '@task/shared/types/functional.types';
import { errorToString } from '@task/shared/utils/transform.utils';

import type { ParsedJson } from '#web/core/common.types.ts';

type FetcherOptions<D = unknown, E = unknown> = {
    path: string;
    validator: ($: unknown) => $ is ApiDataResponse<D> | ApiErrorResponse<E>;
    requestInit?: RequestInit;
};

type Fetcher = <D = unknown, E = unknown>(
    options: FetcherOptions<D, E>,
) => NullaryAsync<
    | { ok: true; status: number; json: ApiDataResponse<D> | ApiErrorResponse<E> }
    | { ok: false; status: number; json?: ParsedJson<ApiResponse<E>>; message: string }
>;

export const fetcher: Fetcher =
    ({ path, validator, requestInit }) =>
    async () => {
        let status = 0;

        let response;
        try {
            response = await fetch(path, requestInit);
            status = response.status;
        } catch (e) {
            return { ok: false, status, message: 'Fetch failed: ' + errorToString(e) };
        }

        if (!response.ok) return { ok: false, status, message: 'Fetch returned an error' };

        let json;
        try {
            json = await response.json();
        } catch (e) {
            return { ok: false, status, json, message: 'Body parse error: ' + errorToString(e) };
        }

        return validator(json) ? { ok: true, status, json } : { ok: false, status, json, message: 'Bad body' };
    };
