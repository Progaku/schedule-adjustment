import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import participantRouter from './apis/participant.api';
import { response500 } from './apis/response';

const app = new Hono();
app.use(
  '*',
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  console.error(err);
  return response500(c);
});

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
