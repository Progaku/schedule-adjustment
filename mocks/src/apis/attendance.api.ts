import { typiaValidator } from '@hono/typia-validator';
import { Hono } from 'hono';
import { store } from '../store';
import { Response400Error, Response404Error } from './errors';
import { response200, response200noContent } from './response';
import { RegisterParticipantRequestValidate } from './serializers/build/register-participant.interface';

const router = new Hono();

router.get('/:uuid', (c) => {
  const uuid = c.req.param('uuid');
  if (!(uuid in store)) {
    throw new Response404Error();
  }
  return response200(c, store[uuid]);
});

router.post(
  '/:uuid',
  typiaValidator('json', RegisterParticipantRequestValidate, (result) => {
    if (!result.success) {
      throw new Response400Error();
    }
  }),
  (c) => {
    const uuid = c.req.param('uuid');
    if (!(uuid in store)) {
      throw new Response404Error();
    }
    const res = c.req.valid('json');
    store[uuid].schedules.push({
      id: crypto.randomUUID(),
      ...res,
    });
    return response200noContent(c);
  },
);

export default router;
