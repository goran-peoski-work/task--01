import { Injected, Result } from '@task/shared/types/core.types';
import { Product } from '@task/shared/types/domain.types';
import { NullaryAsync, UnaryAsync } from '@task/shared/types/functional.types';

export type ProductRepo = {
    findAll: NullaryAsync<Result<Product[], string>>;
    findById: UnaryAsync<{ id: string }, Result<Product[], string>>;
};

type ProductDeps = { productRepo: ProductRepo };
type GetAllProductsUseCase = UnaryAsync<Injected<void, ProductDeps>, Result<Product[], string>>;
type GetOneProductUseCase = UnaryAsync<Injected<{ id: string }, ProductDeps>, Result<Product[], string>>;

export const getAllProductsUseCase: GetAllProductsUseCase = async ({ deps }) => deps.productRepo.findAll();
export const getOneProductUseCase: GetOneProductUseCase = async ({ id, deps }) => deps.productRepo.findById({ id });
