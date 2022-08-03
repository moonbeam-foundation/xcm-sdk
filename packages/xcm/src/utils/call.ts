import { isNil } from 'lodash';

type Fn = (...args: any[]) => any;

/**
 * I got PartialTuple and PartialParameters from here
 * https://medium.com/codex/currying-in-typescript-ca5226c85b85
 */

type PartialTuple<Tuple extends any[], Extracted extends any[] = []> =
  // If the tuple provided has at least one required value
  Tuple extends [infer Next, ...infer Rest]
    ? // recurse back in to this type with one less item
      // in the original tuple, and the latest extracted value
      // added to the extracted list as optional
      PartialTuple<Rest, [...Extracted, Next?]>
    : // else if there are no more values,
      // return an empty tuple so that too is a valid option
      [...Extracted, ...Tuple];

type PartialParameters<FN extends Fn> = PartialTuple<Parameters<FN>>;

function areArgsDefined(args: unknown[]): boolean {
  return args.every((arg) => !isNil(arg));
}

export async function call<F extends Fn>(
  fn: F,
  ...args: PartialParameters<F>
): Promise<Awaited<ReturnType<F> | undefined>> {
  if (!areArgsDefined(args)) {
    return undefined;
  }

  const res: ReturnType<F> = await fn(...args);

  return res;
}
