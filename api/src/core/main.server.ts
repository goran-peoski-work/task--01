import { Nullable, Result } from '@task/shared/types/core.types';
import { UnaryAsync } from '@task/shared/types/functional.types';
import { errorToString } from '@task/shared/utils/transform.utils';
import Fastify from 'fastify';

import {
    serverErrorHandler,
    serverNotFoundHandler,
    serverPreSerializationHook,
} from '#api/core/interceptors.server.js';
import { routesV1 } from '#api/routes/version1.routes.js';

type ServerInstance = ReturnType<typeof Fastify>;

type StartServer = UnaryAsync<
    { port: number; host: string },
    Result<{ server: ServerInstance; address: string }, { server: Nullable<ServerInstance>; message: string }>
>;

export const startServer: StartServer = async ({ port, host }) => {
    let server;
    try {
        server = Fastify({
            logger: true,
            routerOptions: {
                ignoreTrailingSlash: true,
            },
        });

        server.addHook('preSerialization', serverPreSerializationHook);
        server.setErrorHandler(serverErrorHandler);
        server.setNotFoundHandler(serverNotFoundHandler);

        server.register(routesV1, { prefix: '/api/v1' });
    } catch (e: unknown) {
        return { success: false, error: { server, message: errorToString(e) } };
    }

    try {
        const address = await server.listen({ port, host });
        return { success: true, data: { server, address } };
    } catch (e: unknown) {
        return { success: false, error: { server, message: errorToString(e) } };
    }
};
