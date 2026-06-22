import type { Component } from '#web/core.types.ts';
import { fetchPing } from '#web/fetchers/ping.fetcher.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

import CN from './Ping.module.css';

const PingContent: Component = () => {
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

const PingLoading: Component = () => <div>Pinging API server...</div>;

export const Ping: Component = () => (
    <Suspense fallback={<PingLoading />}>
        <PingContent />
    </Suspense>
);
