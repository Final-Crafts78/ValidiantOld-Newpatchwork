# Validiant Tracker — Modernised

> All features from `validiant-tracker` (monolith) re-architected using the modern stack from `validiant-v2`.

## Stack

- **Runtime**: Node.js 18+
- **Package Manager**: pnpm (workspace monorepo)
- **Build System**: Turborepo
- **API**: Hono (replaces Express)
- **ORM**: Drizzle (replaces Sequelize)
- **Database**: PostgreSQL
- **Language**: TypeScript (replaces JavaScript)

## Monorepo Structure

```
.
├── apps/
│   └── api/          # Hono + Drizzle API server (all tracker features)
├── packages/
│   ├── config/       # Shared ESLint / TS configs
│   └── shared/       # Shared types, constants, utils
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.json
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Start API in dev mode
pnpm api:dev

# Push DB schema
pnpm api:db:push
```

## Migration Source

- Features ported from: [`validiant-tracker`](https://github.com/Final-Crafts78/validiant-tracker)
- Architecture modelled on: [`validiant-v2`](https://github.com/Final-Crafts78/validiant-v2)
