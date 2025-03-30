import { Context } from 'hono';

export function response200noContent(ctx: Context) {
  return ctx.text('ok', 200);
}

export function response500(ctx: Context) {
  return ctx.text('Internal Server Error', 500);
}
