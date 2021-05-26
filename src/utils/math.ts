export const multiplyUp = (value: number, factor = 64): number => value * 2 ** factor;
export const divideDown = (value: number, factor = 64): number => value / 2 ** factor;
export const roundToTwo = (num: number): number => Math.round((num + Number.EPSILON) * 100) / 100;
