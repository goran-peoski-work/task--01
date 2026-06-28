import type { Nullable } from '@task/shared/types/core.types';
import * as React from 'react';

/** A React component that can be rendered. Uses shorter name to disambiguate because React.Component exists */
export type Comp<Props = void> = Props extends void ? () => React.ReactNode : (props: Props) => React.ReactNode;

/** A React component that shouldn't be rendered. It deliberately must return null to make sure it's not rendered' */
export type CompSideEffect<Props = void> = Props extends void ? () => null : (props: Props) => null;

/** An object that has been created by parsing a JSON string, but not yet verified it is of the declared type. */
export type ParsedJson<T> = Nullable<Partial<T>>;
