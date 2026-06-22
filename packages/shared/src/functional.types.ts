export type Nullable<T> = T | null | undefined;

export type SideEffect = () => void;
export type Nullary<R> = () => R;
export type Unary<A, R> = (a: A) => R;
export type Binary<A, B, R> = (a: A, b: B) => R;

export type SideEffectAsync = () => Promise<void>;
export type NullaryAsync<R> = () => Promise<R>;
export type UnaryAsync<A, R> = (a: A) => Promise<R>;
export type BinaryAsync<A, B, R> = (a: A, b: B) => Promise<R>;
