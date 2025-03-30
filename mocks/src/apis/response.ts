import { Context } from 'hono';

export function response500(ctx: Context) {
  return ctx.text('Internal Server Error', 500);
}
