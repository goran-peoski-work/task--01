import { isApiDataResponse, isApiErrorResponse } from '@task/shared/predicates/communication.predicates';
import type { ApiDataResponse, ApiErrorResponse, ApiResponse } from '@task/shared/types/communication.types';
import type { Product } from '@task/shared/types/domain.types';

import { fetcher } from '#web/core/fetcher.util.ts';

const isProductsResponse = ($: unknown): $ is ApiDataResponse<Product[]> | ApiErrorResponse =>
    (isApiDataResponse($) && Array.isArray(($ as ApiResponse).data)) || isApiErrorResponse($);

export const fetchAllProducts = () =>
    fetcher<Product[]>({
        path: '/api/v1/product/all',
        validator: isProductsResponse,
    });
