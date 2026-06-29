import { Injected } from '@task/shared/types/core.types';
import { Unary } from '@task/shared/types/functional.types';
import { FastifyPluginCallback } from 'fastify';

import { pingRoute } from '#api/infra/routes/ping.route.js';
import { productRoute } from '#api/infra/routes/product.route.js';
import { ProductRepo } from '#api/ports/ProductRepo.port.js';

export const routesV1: Unary<Injected<void, { productRepo: ProductRepo }>, FastifyPluginCallback> =
    ({ deps }) =>
    async (instance) => {
        instance.register(pingRoute, { prefix: '/ping' });
        instance.register(productRoute({ deps }), { prefix: '/product' });
    };
