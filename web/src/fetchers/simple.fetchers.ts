import { fetcher } from '#web/core/fetcher.util.ts';
import { isApiResponse } from '@task/shared/predicates/communication.predicates';
import type { ApiResponse } from '@task/shared/types/communication.types';

const isPingResponse = ($: unknown): $ is ApiResponse<string> =>
    isApiResponse($) && 'string' === typeof ($ as ApiResponse).data;

export const fetchPing = () =>
    fetcher<string, string>({
        path: '/api/v1/ping',
        validator: isPingResponse,
        requestInit: { cache: 'no-cache' },
    });
