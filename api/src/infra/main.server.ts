import { Injected, Nullable, Result } from '@task/shared/types/core.types';
import { UnaryAsync } from '@task/shared/types/functional.types';
import { errorToString } from '@task/shared/utils/transform.utils';
import Fastify from 'fastify';

import {
    serverErrorHandler,
    serverNotFoundHandler,
    serverPreSerializationHook,
} from '#api/infra/interceptors.server.js';
import { routesV1 } from '#api/infra/routes/version1.routes.js';
import { ProductRepo } from '#api/ports/ProductRepo.port.js';

type ServerInstance = ReturnType<typeof Fastify>;

type StartServer = UnaryAsync<
    Injected<{ port: number; host: string }, { productRepo: ProductRepo }>,
    Result<{ server: ServerInstance; address: string }, { server: Nullable<ServerInstance>; message: string }>
>;

export const startServer: StartServer = async ({ port, host, deps: { productRepo } }) => {
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

        server.register(routesV1({ deps: { productRepo } }), { prefix: '/api/v1' });
    } catch (e) {
        return { success: false, error: { server, message: errorToString(e) } };
    }

    try {
        const address = await server.listen({ port, host });
        return { success: true, data: { server, address } };
    } catch (e) {
        return { success: false, error: { server, message: errorToString(e) } };
    }
};
