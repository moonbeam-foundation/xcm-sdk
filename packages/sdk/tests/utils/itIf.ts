export function itIf(condition: boolean) {
  return condition ? it : it.skip;
}
