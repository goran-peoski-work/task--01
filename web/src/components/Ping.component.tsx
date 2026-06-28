import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

import type { Comp } from '#web/core/common.types.ts';
import { fetchPing } from '#web/fetchers/simple.fetchers.ts';

import CN from './Ping.module.css';

const PingContent: Comp = () => {
    const {
        data: { json, ok },
    } = useSuspenseQuery({
        queryKey: ['ping'],
        queryFn: fetchPing(),
    });

    if (!ok) return <p className={CN.error}>Ping didn't receive a pong</p>;
    if (!json?.data) return <p className={CN.error}>Ping received an empty pong</p>;

    return <p>Ping {json.data}</p>;
};

const PingLoading: Comp = () => <div>Pinging API server...</div>;

export const Ping: Comp = () => (
    <Suspense fallback={<PingLoading />}>
        <PingContent />
    </Suspense>
);
