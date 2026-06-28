export type Nullable<T> = T | null | undefined;

export type Result<T, E = void> = { success: true; data: T } | { success: false; error: E };
