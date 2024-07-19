export type SetOptional<Base, Keys extends keyof Base> = Omit<Base, Keys> &
  Partial<Pick<Base, Keys>>;
