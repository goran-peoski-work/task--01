import type { Nullable, NullaryAsync, Unary } from '@task/shared/src/functional.types.ts';
import * as React from 'react';

/**
 * A React component that can be rendered.
 */
export type Component<Props = void> = Props extends void ? () => React.ReactNode : (props: Props) => React.ReactNode;

/**
 * An object that has been created by parsing a JSON string, but not yet verified it is of the declared type.
 */
export type ParsedJson<T> = Nullable<Partial<T>>;

type FetchResult<T> = { ok: true; json: T } | { ok: false; message: string; json?: ParsedJson<T> };

/**
 * A function used to fetch data from the back end API.
 */
export type Fetcher<T, R> = Unary<T, NullaryAsync<FetchResult<R>>>;
export type SimpleFetcher<R> = Fetcher<void, R>;
