import { Hono } from 'hono';
import { store } from '../store';
import { Response404Error } from './errors';
import { response200 } from './response';

const router = new Hono();

router.get('/:uuid', (c) => {
  const uuid = c.req.param('uuid');
  if (!(uuid in store)) {
    throw new Response404Error();
  }
  return response200(c, store[uuid]);
});

export default router;
