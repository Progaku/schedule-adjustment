import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { store } from './store';
import { HTTPException } from 'hono/http-exception';
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
