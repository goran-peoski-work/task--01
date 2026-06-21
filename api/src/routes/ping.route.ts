import { FastifyPluginAsync } from 'fastify';

type PingGetHandler = () => Promise<{
    success: true;
    data: string;
}>;

export const pingRoute: FastifyPluginAsync = async (instance) => {
    const pingGetHandler: PingGetHandler = async () => ({
        success: true,
        data: 'pong',
    });

    instance.get('/ping', pingGetHandler);
};
