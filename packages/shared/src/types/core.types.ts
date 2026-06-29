export type Nullable<T> = T | null | undefined;

export type AnyArray = unknown[];
export type AnyObject = Record<PropertyKey, unknown>;

export type TypeValidator<T> = ($: unknown) => $ is T;

export type Result<T, E = void> = { success: true; data: T; error?: null } | { success: false; data?: null; error: E };

export type Injected<T, D extends AnyObject> = [T] extends [void]
    ? { deps: [D] extends [never] ? never : D }
    : T & { deps: [D] extends [never] ? never : D };
