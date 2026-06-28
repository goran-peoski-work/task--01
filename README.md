# Task

This repository is structured as a monorepo containing a web front-end (`web/`), an API back-end (`api/`), and shared
packages (`packages/shared/`).

## For Local Development

Duplicate the `.env.example` file at the root, rename it to `.env`, and populate the necessary environment variables.
If you don't do that, code should still work with some sensible defaults, seen in the `.env.example`

Install all dependencies across the workspaces:

```bash
npm install
```

Start the development environment. Depending on the root `package.json` scripts, this is typically initiated via:

```bash
npm run dev
```

NOTE: The api will still try to start the database via Docker, as noted in the `package.json`:

```json
{
    "predev": "docker compose up -d db"
}
```

## Building and running using Docker Compose

The repository contains a `compose.yaml` file for executing the applications in isolated containers.

Build and start the services:

```bash
docker compose up --build
```

To run the containers in detached mode:

```bash
docker compose up --build -d
```

To stop and remove the containers:

```bash
docker compose down
```

## Code Style

The projects also use:

- **Static Analysis & Formatting**: ESLint and Prettier are configured at the root level (`eslint.config.js`,
  `.prettierrc.json`)
- **Pre-commit Hooks**: Husky (`.husky/`) and `lint-staged` (`lint-staged.config.js`) for automatically linting
  and formating staged files before a commit
