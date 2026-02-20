/**
 * Drizzle Kit Configuration
 *
 * Commands:
 *   pnpm db:generate  → Generate migration files from schema
 *   pnpm db:push      → Push schema to database (no migration files)
 *   pnpm db:migrate   → Apply pending migrations
 *   pnpm db:studio    → Open Drizzle Studio GUI
 */

import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL environment variable is not set. Check your .env file.'
  );
}

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config;
