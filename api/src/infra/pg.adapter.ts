import { isProduct } from '@task/shared/predicates/domain.predicates';
import { Injected, Result, TypeValidator } from '@task/shared/types/core.types';
import { Product } from '@task/shared/types/domain.types';
import { Unary } from '@task/shared/types/functional.types';
import { errorToString } from '@task/shared/utils/transform.utils';
import pg from 'pg';

import { ProductRepo } from '#api/ports/ProductRepo.port.js';

type DbQuery = <T>(
    options: Injected<{ text: string; values?: unknown[]; validator: TypeValidator<T> }, { pool: pg.Pool }>,
) => Promise<Result<T[], string>>;

const dbQuery: DbQuery = async ({ text, values, validator, deps: { pool } }) => {
    try {
        const result = await (Array.isArray(values) ? pool.query(text, values) : pool.query(text));

        const validationResult = validator(result.rows[0]);

        return validationResult
            ? { success: true, data: result.rows, error: null }
            : { success: false, data: null, error: 'Invalid result type' };
    } catch (e) {
        return { success: false, data: null, error: errorToString(e) || 'DB_ERROR @ dbQuery()' };
    }
};

type PgProductRepo = Unary<Injected<void, { pool: pg.Pool }>, ProductRepo>;

export const pgProductRepo: PgProductRepo = ({ deps }) => ({
    findAll: async () => {
        try {
            const text = 'SELECT * FROM products;';
            return dbQuery<Product>({ text, deps, validator: isProduct });
        } catch (e) {
            return { success: false, data: null, error: errorToString(e) || 'DB_ERROR @ pgProductRepo.findAll()' };
        }
    },

    findById: async ({ id }) => {
        const text = 'SELECT * FROM products WHERE id = $1;';
        return dbQuery<Product>({ text, values: [id], deps, validator: isProduct });
    },
});
