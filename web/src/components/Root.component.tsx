import { DocumentTitle } from '#web/components/DocumentTitle.component.tsx';
import { Ping } from '#web/components/Ping.component.tsx';
import { ProductsPage } from '#web/components/Products.component.tsx';

import type { Comp } from '#web/core/common.types.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';

const queryClient = new QueryClient();

export const Root: Comp = () => (
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <DocumentTitle />
            <div>Welcome</div>
            <Ping />
            <ProductsPage />
        </QueryClientProvider>
    </StrictMode>
);
