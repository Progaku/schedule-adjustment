import { HTTPException } from 'hono/http-exception';

export const BadRequestError = new Response('Bad Request', {
  status: 400,
});

export class Response400Error extends HTTPException {
  constructor() {
    super(400, { res: BadRequestError });
  }
}

export const NotFoundError = new Response('Not Found', {
  status: 404,
});

export class Response404Error extends HTTPException {
  constructor() {
    super(404, { res: NotFoundError });
  }
}

export const ExcessOrDeficiencyDateError = new Response('Excess Or Deficiency Date', {
  status: 400,
});

export class Response400ExcessOrDeficiencyDateError extends HTTPException {
  constructor() {
    super(400, { res: ExcessOrDeficiencyDateError });
  }
}
