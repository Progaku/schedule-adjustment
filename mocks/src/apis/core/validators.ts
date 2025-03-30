import { Response400ExcessOrDeficiencyDateError } from './errors';

export function excessOrDeficiencyDate(target: string[], origin: string[]) {
  const targetSet = new Set(target);
  const originSet = new Set(origin);
  if (targetSet.difference(originSet).size > 0 || originSet.difference(targetSet).size > 0) {
    throw new Response400ExcessOrDeficiencyDateError();
  }
}
