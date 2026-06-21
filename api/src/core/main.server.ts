import { pingRoute } from '#api/routes/ping.route.js';
import Fastify from 'fastify';


type ErrorToString = (error: any) => string;

const errorToString: ErrorToString = (error) => String(error?.message ?? error);

type ServerInstance = ReturnType<typeof Fastify>;

type StartSuccess = { success: true; server: ServerInstance; data: string };
type StartFailure = { success: false; server: ServerInstance; error: string };
type CreateFailure = { success: false; server: null; error: string };

type StartServer = (options: { port: number; host: string }) => Promise<StartSuccess | StartFailure | CreateFailure>;

export const startServer: StartServer = async ({ port, host }) => {
    try {
        const server = Fastify({ logger: true });

        server.register(pingRoute, { prefix: '/api/v1' });

        return server
            .listen({ port: port, host: host })
            .then((address): StartSuccess => ({ success: true, server, data: address }))
            .catch((error): StartFailure => ({ success: false, server, error: errorToString(error) }));
    } catch (error: unknown) {
        return { success: false, server: null, error: String(error) };
    }
};
