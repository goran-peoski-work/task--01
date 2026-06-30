import { AddToCartRequestDto } from '#shared/dto/domain.dto.js';
import { Product } from '#shared/types/domain.types.js';

// NOTE: this confirms the DTO version of product type, one for the DB should be added (if/when necessary)
export const isProduct = ($: unknown): $ is Product =>
    null !== $ && 'object' === typeof $ && 'id' in $ && 'name' in $ && 'price' in $ && 'stock' in $;

// NOTE: this confirms the DTO version of product type, one for the DB should be added (if/when necessary)
export const isProductArray = ($: unknown): $ is Product[] => {
    if (!Array.isArray($)) return false;
    if (!$.length) return true;

    // NOTE: should be checking every item, better yet use a library like zod, but this will do for now
    return isProduct($[0]);
};

export const isAddToCartRequestDto = ($: unknown): $ is AddToCartRequestDto => isProduct($);
