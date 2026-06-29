import { Product } from '#shared/types/domain.types.js';

export const isProduct = ($: unknown): $ is Product =>
    null !== $ && 'object' === typeof $ && 'id' in $ && 'name' in $ && 'price' in $ && 'stock' in $;

export const isProductArray = ($: unknown): $ is Product[] => {
    if (!Array.isArray($)) return false;
    if (!$.length) return true;

    // NOTE: should be checking every item, better yet use a library like zod, but this will do for now
    return isProduct($[0]);
};
