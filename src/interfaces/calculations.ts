export interface ClosePositionReturn {
  aToSwap: number;
  aLeft: number;
  bReceived: number;
}

export interface ClosePositionBothReturn extends Omit<ClosePositionReturn, 'bReceived'> {
  bHeld: number;
}
