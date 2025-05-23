import { typiaValidator } from '@hono/typia-validator';
import { Hono } from 'hono';
import { store } from '../store';
import { Response400Error, Response404Error } from './core/errors';
import { response200, response200noContent } from './core/response';
import { excessOrDeficiencyDate } from './core/validators';
import { RegisterAttendanceRequestValidate } from './serializers/build/register-attendance.interface';
import { RegisterParticipantRequestValidate } from './serializers/build/register-participant.interface';
import { UpdateAttendanceRequestValidate } from './serializers/build/update-attendance.interface';

const router = new Hono();

router.post(
  '',
  typiaValidator('json', RegisterAttendanceRequestValidate, (result) => {
    if (!result.success) {
      throw new Response400Error();
    }
  }),
  (c) => {
    const res = c.req.valid('json');
    const uuid = crypto.randomUUID();
    store[uuid] = {
      ...res,
      schedules: [],
    };
    return response200(c, { uuid });
  },
);

router.get('/:uuid', (c) => {
  const uuid = c.req.param('uuid');
  if (!(uuid in store)) {
    throw new Response404Error();
  }
  return response200(c, store[uuid]);
});

router.patch(
  '/:uuid',
  typiaValidator('json', UpdateAttendanceRequestValidate, (result) => {
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
    store[uuid].title = res.title;
    store[uuid].description = res.description;
    return response200noContent(c);
  },
);

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

    excessOrDeficiencyDate(
      res.params.map((item) => item.date),
      store[uuid].candidateDate,
    );

    store[uuid].schedules.push({
      id: crypto.randomUUID(),
      ...res,
    });
    return response200noContent(c);
  },
);

export default router;
