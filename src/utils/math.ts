export const multiplyUp = (value: number, factor = 18): number => value * 10 ** factor;
export const divideDown = (value: number, factor = 18): number => value / 10 ** factor;
export const roundToTwo = (num: number): number => Math.round((num + Number.EPSILON) * 100) / 100;
