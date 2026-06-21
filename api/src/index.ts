import { startServer } from '#api/core/main.server.js';

const result = await startServer({ port: 3000, host: '0.0.0.0' });

if (result.success) {
    result.server.log.info(`Listening @ ${result.data}...`);
} else if (result.server) {
    result.server.log.error(result.error);
    process.exit(1);
} else {
    console.error(result.error);
    process.exit(1);
}
