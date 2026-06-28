type ApiResponseVersion = undefined | 1; //   next time add | 2, then | 3

export type HttpCode = 200 | 201 | 400 | 401 | 403 | 404 | 422 | 500;

export type MetaResponse = {
    v?: ApiResponseVersion;
    hc: HttpCode;
    ts: undefined | string;
};

export type DataResponse<T = unknown> = {
    data: T;
};

export type ErrorResponse<T = unknown> = {
    type: 'error-string' | 'error-array' | 'error-object' | 'unknown';
    error: T;
};

export type ApiDataResponse<T = unknown> = { error: null } & DataResponse<T> & MetaResponse;
export type ApiErrorResponse<T = unknown> = { data: null } & ErrorResponse<T> & MetaResponse;

export type ApiResponse<T = unknown> = ApiDataResponse<T> | ApiErrorResponse<T>;
