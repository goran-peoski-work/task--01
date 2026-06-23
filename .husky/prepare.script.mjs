import { execSync } from 'node:child_process';

// NOTE: husky can cause issues with Dockerfile builds
// and is not really needed for building images and running containers,
// so take it out of the equation, in that case, run it while regular development

if ('0' !== process.env.HUSKY) {
    execSync('husky', { stdio: 'inherit' });
}
