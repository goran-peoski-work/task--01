import { SERVER_HOST, SERVER_PORT } from '#api/core/env.server.js';
import { startServer } from '#api/core/main.server.js';

const result = await startServer({ port: SERVER_PORT, host: SERVER_HOST });

if (result.success) {
    result.server.log.info(`Listening @ ${result.data}...`);
} else if (result.server) {
    result.server.log.error(result.error);
    process.exit(1);
} else {
    console.error(result.error);
    process.exit(1);
}
