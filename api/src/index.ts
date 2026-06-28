import { SERVER_HOST, SERVER_PORT } from '#api/core/env.server.js';
import { startServer } from '#api/core/main.server.js';

const result = await startServer({ port: SERVER_PORT, host: SERVER_HOST });

if (result.success) {
    const log = result.data.server.log;
    log.info(`Listening @ ${result.data}...`);
} else {
    const log = result.error.server?.log;

    if (log) log.error(result.error);
    else console.error(result.error);

    process.exit(1);
}
