import type { ParsedJson, SimpleFetcher } from '#web/core.types.ts';

type PingResponse = {
    success: true;
    data: string;
};

const isPingResponse = (value: ParsedJson<PingResponse>): value is PingResponse =>
    true === value?.success && 'string' === typeof value?.data;

export const fetchPing: SimpleFetcher<PingResponse> = () => async () => {
    const response = await fetch('/api/v1/ping', { cache: 'no-cache' });

    if (!response.ok) return { ok: false, message: `Fetch failed: ${response.status}` };

    const json = await response.json();
    if (isPingResponse(json)) return { ok: true, json };

    return { ok: false, message: 'Bad body response', json };
};
