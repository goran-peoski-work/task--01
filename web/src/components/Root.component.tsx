import { QueryClient, QueryClientProvider, useSuspenseQuery } from '@tanstack/react-query';
import * as React from 'react';
import { StrictMode, Suspense } from 'react';

type Component<Props = void> = Props extends void ? () => React.ReactNode : (props: Props) => React.ReactNode;

const queryClient = new QueryClient();

type PingResponse = {
    success: true;
    data: string;
};

const isPingResponse = (value: unknown): value is PingResponse => {
    const { data, success } = (value as Partial<PingResponse>) ?? {};
    return true === success && 'string' === typeof data;
};

const pingApi: () => Promise<PingResponse> = async () => {
    const response = await fetch('/api/v1/ping');

    if (!response.ok) throw new Error(`Ping failed: ${response.status}`);

    const json: unknown = await response.json();
    if (isPingResponse(json)) return json;

    throw new Error('Bad ping' + String(json));
};

const PingContent: Component = () => {
    const { data: body } = useSuspenseQuery({
        queryKey: ['ping'],
        queryFn: pingApi,
    });

    return <div>Ping: {body.data}</div>;
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
