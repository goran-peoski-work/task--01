import { isHttpCode } from '@task/shared/predicates/communication.predicates';
import { ApiResponse } from '@task/shared/types/communication.types';
import { nowAsTzZulu } from '@task/shared/utils/time.util';
import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { SERVER_TIME_ZONE } from '#api/core/env.server.js';
import {
    RouteNotFoundApiResponse,
    RouteValidationErrorApiResponse,
    ServerErrorApiResponse,
} from '#api/core/server.types.js';

type ServerPreSerializationHook = (request: FastifyRequest, reply: FastifyReply, payload: unknown) => Promise<unknown>;

export const serverPreSerializationHook: ServerPreSerializationHook = async (request, reply, payload) => {
    const { hc, ts, data, error, v } = (payload ?? {}) as ApiResponse;

    const hasHttpCode = isHttpCode(hc);
    if (hasHttpCode) reply.code(hc);

    return {
        v,
        hc: hasHttpCode ? hc : reply.statusCode,
        ts: ts ? ts : nowAsTzZulu(SERVER_TIME_ZONE),
        data: data ? data : null,
        error: error ? error : null,
    };
};

type ServerErrorHandler = (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => FastifyReply;

export const serverErrorHandler: ServerErrorHandler = (error, request, reply) => {
    const ts = nowAsTzZulu(SERVER_TIME_ZONE);

    const validationError = error.validation;
    if (validationError) {
        const payload: RouteValidationErrorApiResponse = {
            hc: 400,
            ts,
            type: Array.isArray(validationError) ? 'error-array' : 'unknown',
            data: null,
            error: validationError,
        };

        return reply.code(payload.hc).send(payload);
    }

    // TODO: log this as an error, we shouldn't be returning invalid HTTP status codes from routes
    // TODO: make a more robust check if it is actual HttpCode we've defined or one outside the scope
    const hc = isHttpCode(error.statusCode) ? error.statusCode : 500;

    const payload: ServerErrorApiResponse = {
        hc,
        ts,
        type: 'error-string',
        data: null,
        error: error.message,
    };

    return reply.code(payload.hc).send(payload);
};

type ServerNotFoundHandler = Parameters<FastifyInstance['setNotFoundHandler']>[1];

export const serverNotFoundHandler: ServerNotFoundHandler = (request, reply) => {
    const payload: RouteNotFoundApiResponse = {
        hc: 404,
        ts: nowAsTzZulu(SERVER_TIME_ZONE),
        type: 'error-object',
        data: null,
        error: {
            method: request.method,
            url: request.url,
        },
    };

    return reply.code(payload.hc).send(payload);
};
