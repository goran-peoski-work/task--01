import { ApiResponse } from '@task/shared/types/communication.types';
import { FastifyError } from 'fastify';

export type RouteNotFoundApiResponse = ApiResponse<{ method: string; url: string }> & { hc: 404 };
export type RouteValidationErrorApiResponse = ApiResponse<FastifyError['validation']> & { hc: 400 };
export type ServerErrorApiResponse = ApiResponse<string>;
