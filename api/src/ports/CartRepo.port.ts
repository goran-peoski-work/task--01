import { Injected, Result } from '@task/shared/types/core.types';
import { AddToCartRequestDto } from '@task/shared/types/domain.types';
import { UnaryAsync } from '@task/shared/types/functional.types';

export type CartRepo = {
    addProductToCart: UnaryAsync<AddToCartRequestDto, Result<boolean, string>>;
};

export type AddToCartUseCase = UnaryAsync<
    Injected<AddToCartRequestDto, { cartRepo: CartRepo }>,
    Result<boolean, string>
>;

export const addToCartUseCase: AddToCartUseCase = async ({ productId, quantity, userId, deps }) =>
    !Number.isInteger(quantity) || 1 > quantity
        ? { success: false, error: 'Invalid quantity: ' + String(quantity) }
        : deps.cartRepo.addProductToCart({ productId, quantity, userId });
