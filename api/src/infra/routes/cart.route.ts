import { isAddToCartRequestDto } from '@task/shared/predicates/domain.predicates';
import { EitherResponse } from '@task/shared/types/communication.types';
import { Injected } from '@task/shared/types/core.types';
import { BinaryAsync, Unary } from '@task/shared/types/functional.types';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

import { addToCartUseCase, CartRepo } from '#api/ports/CartRepo.port.js';

const HARDCODED_TEMPORARY_USER_ID = 'mock-session-user-id';

type AddToCart = BinaryAsync<FastifyRequest, FastifyReply, EitherResponse<boolean, string>>;
type CartRoute = Unary<Injected<void, { cartRepo: CartRepo }>, FastifyPluginAsync>;

export const cartRoute: CartRoute = ({ deps }) => {
    const addToCart: AddToCart = async (request) => {
        if (!isAddToCartRequestDto(request.body)) {
            return { hc: 422, type: 'error-string', error: 'Invalid request body' };
        }

        const { productId, quantity } = request.body;
        const userId = HARDCODED_TEMPORARY_USER_ID; // FIXME: take it from JWT, once users are added to the system

        const { data, error, success } = await addToCartUseCase({ productId, quantity, userId, deps });

        return success ? { hc: 200, data } : { hc: 422, type: 'error-string', error };
    };

    return async (instance) => {
        instance.post('/cart', addToCart);
    };
};
