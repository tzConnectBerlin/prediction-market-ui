export const multiplyUp = (value: number, factor = 64): number => Math.floor(value * 2 ** factor);
export const divideDown = (value: number, factor = 64): number => value / 2 ** factor;
export const roundToTwo = (num: number): number => Math.round((num + Number.EPSILON) * 100) / 100;
export const tokenMultiplyUp = (value: number, factor = 1e6): number => value * factor;
export const tokenDivideDown = (value: number, factor = 1e6): number => value / factor;
export const roundTwoAndTokenDown = (value: number): number => roundToTwo(tokenDivideDown(value));
