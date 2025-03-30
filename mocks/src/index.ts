import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { store } from './store';

const app = new Hono();
app.use(
  '*',
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);

app.notFound((c) => {
  return c.text('not found page', 404);
});

const API = new Hono();

API.get('/', (c) => {
  return c.json(store);
});
app.route('/api', API);

serve(
  {
    fetch: app.fetch,
    port: 8080,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
