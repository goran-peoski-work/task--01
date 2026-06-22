import { Ping } from '#web/components/Ping.component.tsx';
import type { Component } from '#web/core.types.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';

const queryClient = new QueryClient();

export const Root: Component = () => (
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <div>Welcome</div>
            <Ping />
        </QueryClientProvider>
    </StrictMode>
);
