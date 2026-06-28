import { useSuspenseQuery } from '@tanstack/react-query';
import type { Nullable } from '@task/shared/types/core.types';
import type { Product } from '@task/shared/types/domain.types';
import { errorToString } from '@task/shared/utils/transform.utils';
import { Suspense } from 'react';

import { asArray } from '#web/core/common.utils.ts';
import { fetchAllProducts } from '#web/fetchers/product.fetchers.ts';

import CN from './Products.module.css';

export const ProductsPage = () => (
    <Suspense fallback={<div className={CN.pulsar}>Loading products...</div>}>
        <ProductList />
    </Suspense>
);

export const ProductList = () => {
    const {
        data: { json, ok },
    } = useSuspenseQuery({ queryKey: ['products', 'all'], queryFn: fetchAllProducts() });

    if (!ok || json?.error) {
        return <div className={CN.error}>An error occurred loading the products. {errorToString(json?.error)}.</div>;
    }

    const products: Nullable<Product[]> = json?.data;
    if (!products) return <div className={CN.error}>No products found.</div>;

    return (
        <div data-bem="ProductList">
            {asArray(products).map(({ id, name, price }) => {
                const onClick = () => console.warn('Not implemented.', 'Adding product', id, '...');
                return (
                    <div data-bem="ProductList__item" key={id}>
                        <div>{name}</div>
                        <div>${price}</div>
                        <button onClick={onClick} disabled={true}>
                            Add to Cart
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
