import { FastifyPluginCallback } from 'fastify';

import { pingRoute } from '#api/routes/ping.route.js';
import { productRoute } from '#api/routes/product.route.js';

export const routesV1: FastifyPluginCallback = async (instance) => {
    instance.register(pingRoute, { prefix: '/ping' });
    instance.register(productRoute, { prefix: '/product' });
};
