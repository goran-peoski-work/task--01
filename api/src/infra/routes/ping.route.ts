import { DataResponse } from '@task/shared/types/communication.types';
import { NullaryAsync } from '@task/shared/types/functional.types';
import { FastifyPluginAsync } from 'fastify';

export const pingRoute: FastifyPluginAsync = async (instance) => {
    const getPing: NullaryAsync<DataResponse<string>> = async () => ({ data: 'pong' });

    instance.get('', getPing);
};
