export type XTokensWeightLimit =
  | number
  | { Limited: number }
  | { Limited: { refTime: number; proofSize: number } };
