import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import attendanceRouter from './apis/attendance.api';
import { response500 } from './apis/core/response';
import participantRouter from './apis/participant.api';
import { store } from './store';

const LOGGING_STORE_MATHOD = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

const app = new Hono();
app.use(
  '*',
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);
app.use(async (c, next) => {
  await next();
  if (LOGGING_STORE_MATHOD.has(c.req.method)) {
    console.dir(store, { depth: null });
  }
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  console.error(err);
  return response500(c);
});

app.route('/api', attendanceRouter);
app.route('/api', participantRouter);

serve(
  {
    fetch: app.fetch,
    port: 8080,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
