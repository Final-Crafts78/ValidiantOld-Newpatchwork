/**
 * Entry Point — Node.js HTTP Server
 *
 * Boots the Hono app using @hono/node-server.
 * No Cloudflare Workers, no Wrangler — plain Node.js 18+.
 */

import 'dotenv/config';
import { serve } from '@hono/node-server';
import { app } from './app';

const port = Number(process.env.PORT) || 3000;

console.log('🚀 Starting Validiant Tracker API...');

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`✅ Server live → http://localhost:${info.port}`);
    console.log(`📦 Environment : ${process.env.NODE_ENV || 'development'}`);
    console.log(`🩺 Health check: http://localhost:${info.port}/health`);
  }
);
