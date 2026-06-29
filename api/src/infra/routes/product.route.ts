import { EitherResponse } from '@task/shared/types/communication.types';
import { Injected } from '@task/shared/types/core.types';
import { Product } from '@task/shared/types/domain.types';
import { BinaryAsync, NullaryAsync, Unary } from '@task/shared/types/functional.types';
import { errorToString } from '@task/shared/utils/transform.utils';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

import { getAllProductsUseCase, getOneProductUseCase, ProductRepo } from '#api/ports/ProductRepo.port.js';

type GetAllProducts = NullaryAsync<EitherResponse<Product[], string>>;
type GetOneProduct = BinaryAsync<FastifyRequest, FastifyReply, EitherResponse<Product[], string>>;
type CreateProductRoute = Unary<Injected<void, { productRepo: ProductRepo }>, FastifyPluginAsync>;

export const productRoute: CreateProductRoute =
    ({ deps }) =>
    async (instance) => {
        const getAllProducts: GetAllProducts = async () => {
            const { data, error, success } = await getAllProductsUseCase({ deps });

            return success
                ? data.length
                    ? { data }
                    : { hc: 404, error: 'No products found' }
                : { type: 'error-string', error };
        };

        const getOneProduct: GetOneProduct = async (request) => {
            const { id } = (request.params ?? {}) as { id: string };

            const { data, error, success } = await getOneProductUseCase({ id, deps });

            return success
                ? data.length
                    ? { data }
                    : { hc: 404, error: 'Product not found' }
                : { type: 'error-string', error: errorToString(error) };
        };

        instance.get('/all', getAllProducts);
        instance.get('/:id', getOneProduct);
    };
