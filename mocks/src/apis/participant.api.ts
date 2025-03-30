import { typiaValidator } from '@hono/typia-validator';
import { Hono } from 'hono';
import { store } from '../store';
import { Response400Error, Response404Error } from './core/errors';
import { response200noContent } from './core/response';
import { excessOrDeficiencyDate } from './core/validators';
import { UpdateParticipantRequestValidate } from './serializers/build/update-participant.interface';

const router = new Hono();

router.patch(
  '/:uuid/:participant',
  typiaValidator('json', UpdateParticipantRequestValidate, (result) => {
    if (!result.success) {
      throw new Response400Error();
    }
  }),
  (c) => {
    const uuid = c.req.param('uuid');
    if (!(uuid in store)) {
      throw new Response404Error();
    }
    const participant = c.req.param('participant');
    const targetIndex = store[uuid].schedules.findIndex((item) => item.id === participant);
    if (targetIndex === -1) {
      throw new Response404Error();
    }
    const res = c.req.valid('json');
    excessOrDeficiencyDate(
      res.params.map((item) => item.date),
      store[uuid].candidateDate,
    );
    store[uuid].schedules[targetIndex] = {
      id: participant,
      ...res,
    };
    return response200noContent(c);
  },
);

export default router;
