import pg from 'pg';

import { DB_CONNECTION_STRING, SERVER_HOST, SERVER_PORT } from '#api/infra/env.server.js';
import { startServer } from '#api/infra/main.server.js';
import { pgProductRepo } from '#api/infra/pg.adapter.js';

const pgPool = new pg.Pool({
    connectionString: DB_CONNECTION_STRING,
});

const serverDeps = {
    productRepo: pgProductRepo({ deps: { pool: pgPool } }),
};

const result = await startServer({ port: SERVER_PORT, host: SERVER_HOST, deps: serverDeps });

if (result.success) {
    const log = result.data.server.log;
    log.info(`Listening @ ${result.data}...`);
} else {
    const log = result.error.server?.log;

    if (log) log.error(result.error);
    else console.error(result.error);

    process.exit(1);
}
