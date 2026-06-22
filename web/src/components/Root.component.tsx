import { QueryClient, QueryClientProvider, useSuspenseQuery } from '@tanstack/react-query';
import * as React from 'react';
import { StrictMode, Suspense } from 'react';

type Component<Props = void> = Props extends void ? () => React.ReactNode : (props: Props) => React.ReactNode;

const queryClient = new QueryClient();

type PingResponse = {
    success: true;
    data: string;
};

type FetchResult = { ok: true; json: PingResponse } | { ok: false; message: string; json?: ParsedJson<PingResponse> };

type NullaryAsync<R> = () => Promise<R>;

type Nullable<T> = T | null | undefined;
type ParsedJson<T> = Nullable<Partial<T>>;

const isPingResponse = (value: ParsedJson<PingResponse>): value is PingResponse =>
    true === value?.success && 'string' === typeof value?.data;

const pingApi: NullaryAsync<FetchResult> = async () => {
    const response = await fetch('/api/v1/ping');

    if (!response.ok) return { ok: false, message: `Ping failed: ${response.status}` };

    const json = await response.json();
    if (isPingResponse(json)) return { ok: true, json: json };

    return { ok: false, message: 'Bad ping response', json };
};

const PingContent: Component = () => {
    const { data: body } = useSuspenseQuery({
        queryKey: ['ping'],
        queryFn: pingApi,
    });

    return <div>Ping: {body.json?.data}</div>;
};

const Ping: Component = () => (
    <Suspense fallback={<div>Loading ping...</div>}>
        <PingContent />
    </Suspense>
);

export const Root: Component = () => (
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <div>Hi</div>
            <Ping />
        </QueryClientProvider>
    </StrictMode>
);
