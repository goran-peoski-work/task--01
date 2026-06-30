export type Nil = null | undefined;
export type Nullable<T> = T | null | undefined;

export type AnyArray = unknown[];
export type AnyObject = Record<PropertyKey, unknown>;

export type TypeValidator<T> = ($: unknown) => $ is T;

// TODO: Rename to EitherResult to avoid confusion with Result from other libraries
export type Result<T, E> = { success: true; data: T; error?: Nil } | { success: false; data?: Nil; error: E };

export type Injected<T, D extends AnyObject> = [T] extends [void]
    ? { deps: [D] extends [never] ? never : D }
    : T & { deps: [D] extends [never] ? never : D };
