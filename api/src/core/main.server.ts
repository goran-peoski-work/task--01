import {
    serverErrorHandler,
    serverNotFoundHandler,
    serverPreSerializationHook,
} from '#api/core/interceptors.server.js';
import { routesV1 } from '#api/routes/version1.routes.js';
import { UnaryAsync } from '@task/shared/types/functional.types';
import { errorToString } from '@task/shared/utils/transform.utils';
import Fastify from 'fastify';

type StartServerOptions = { port: number; host: string };

type ServerInstance = ReturnType<typeof Fastify>;
type StartResult =
    | { success: true; server: ServerInstance; data: string }
    | { success: false; server: ServerInstance; error: string }
    | { success: false; server: null; error: string };

type StartServer = UnaryAsync<StartServerOptions, StartResult>;

export const startServer: StartServer = async ({ port, host }) => {
    try {
        const server = Fastify({
            logger: true,
            routerOptions: {
                ignoreTrailingSlash: true,
            },
        });

        server.addHook('preSerialization', serverPreSerializationHook);
        server.setErrorHandler(serverErrorHandler);
        server.setNotFoundHandler(serverNotFoundHandler);

        server.register(routesV1, { prefix: '/api/v1' });

        return server
            .listen({ port, host })
            .then((address): StartResult => ({ success: true, server, data: address }))
            .catch((error): StartResult => ({ success: false, server, error: errorToString(error) }));
    } catch (error: unknown) {
        return { success: false, server: null, error: String(error) };
    }
};
