import { DataResponse, ErrorResponse } from '@task/shared/types/communication.types';
import { Product } from '@task/shared/types/domain.types';
import { BinaryAsync, NullaryAsync } from '@task/shared/types/functional.types';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

// FIXME: remove this and get proper database data
const HARDCODED_DATA_TEMPORARILY = [
    {
        id: 'e069a25c-0697-4c2c-9270-c881819f1eaf',
        createdAt: '2026-06-24T17:40:24.930Z',
        name: 'Wireless Optical Mouse',
        price: 29.99,
        stock: 150,
        isActive: true,
    },
    {
        id: '297fee6b-22d3-4c71-a4ba-ab6c291b6f36',
        createdAt: '2026-06-24T17:40:24.930Z',
        name: 'Mechanical Keyboard RGB',
        price: 89.5,
        stock: 85,
        isActive: true,
    },
    {
        id: '7e78568c-d858-4fa8-87f5-362411bd4e26',
        createdAt: '2026-06-24T17:40:24.930Z',
        name: '27-inch 4K IPS Monitor',
        price: 349.0,
        stock: 40,
        isActive: true,
    },
    {
        id: '263b6137-6c69-4c47-a3d4-9c40b39871fd',
        createdAt: '2026-06-24T17:40:24.930Z',
        name: 'USB-C Docking Station',
        price: 119.99,
        stock: 120,
        isActive: true,
    },
    {
        id: '263fdf00-fb2b-4996-954d-2496117530cb',
        createdAt: '2026-06-24T17:40:24.930Z',
        name: 'Noise Cancelling Headphones',
        price: 199.99,
        stock: 65,
        isActive: true,
    },
];

type GetAllProducts = NullaryAsync<DataResponse<Product[]>>;
type GetOneProduct = BinaryAsync<FastifyRequest, FastifyReply, DataResponse<Product | null> | ErrorResponse>;

export const productRoute: FastifyPluginAsync = async (instance) => {
    const getAllProducts: GetAllProducts = async () => ({ data: HARDCODED_DATA_TEMPORARILY });

    const getOneProduct: GetOneProduct = async (request) => {
        const { id } = (request.params ?? {}) as { id: string };

        const data = HARDCODED_DATA_TEMPORARILY.find(($) => id === $.id) ?? null;
        if (data) return { data };

        return { hc: 404, type: 'error-string', error: 'Product not found' };
    };

    instance.get('/all', getAllProducts);
    instance.get('/:id', getOneProduct);
};
