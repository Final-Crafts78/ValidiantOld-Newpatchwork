/**
 * Hono Application Setup
 *
 * Adapted from validiant-v2 architecture.
 * Runs on Node.js via @hono/node-server (not Cloudflare Workers).
 *
 * Middleware stack:
 *   logger → prettyJSON (dev) → cors
 *
 * Routes (mounted in Phase 4):
 *   /api/v1/auth        → auth.routes.ts
 *   /api/v1/tasks       → task.routes.ts
 *   /api/v1/employees   → employee.routes.ts
 *   /api/v1/clients     → client.routes.ts
 *   /api/v1/upload      → upload.routes.ts
 *   /api/v1/dashboard   → dashboard.routes.ts
 *   /api/v1/locations   → location.routes.ts
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

// ─── Routes ──────────────────────────────────────────────────────────────────
// Uncommented progressively as phases complete:
// import authRoutes       from './routes/auth.routes';
// import taskRoutes       from './routes/task.routes';
// import employeeRoutes   from './routes/employee.routes';
// import clientRoutes     from './routes/client.routes';
// import uploadRoutes     from './routes/upload.routes';
// import dashboardRoutes  from './routes/dashboard.routes';
// import locationRoutes   from './routes/location.routes';

export const createApp = () => {
  const app = new Hono();

  // ── Middleware ──────────────────────────────────────────────────────────────

  app.use('*', logger());

  if (process.env.NODE_ENV === 'development') {
    app.use('*', prettyJSON());
  }

  app.use(
    '*',
    cors({
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
      allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
      maxAge: 86400,
    })
  );

  // ── Health Check ────────────────────────────────────────────────────────────

  app.get('/health', (c) => {
    return c.json({
      status: 'ok',
      service: 'validiant-tracker-api',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
    });
  });

  // ── API Routes (mounted in Phase 4) ────────────────────────────────────────
  // app.route('/api/v1/auth',       authRoutes);
  // app.route('/api/v1/tasks',      taskRoutes);
  // app.route('/api/v1/employees',  employeeRoutes);
  // app.route('/api/v1/clients',    clientRoutes);
  // app.route('/api/v1/upload',     uploadRoutes);
  // app.route('/api/v1/dashboard',  dashboardRoutes);
  // app.route('/api/v1/locations',  locationRoutes);

  // ── 404 Handler ─────────────────────────────────────────────────────────────

  app.notFound((c) => {
    return c.json(
      {
        success: false,
        error: 'Not Found',
        message: `Route '${c.req.method} ${c.req.path}' not found`,
      },
      404
    );
  });

  // ── Global Error Handler ────────────────────────────────────────────────────

  app.onError((err, c) => {
    console.error('[Error]', err);
    const isDev = process.env.NODE_ENV === 'development';
    return c.json(
      {
        success: false,
        error: err.name || 'Internal Server Error',
        message: err.message || 'An unexpected error occurred',
        ...(isDev && { stack: err.stack }),
      },
      500
    );
  });

  return app;
};

export const app = createApp();
export default app;
