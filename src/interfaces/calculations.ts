export interface ClosePositionReturn {
  aToSwap: number;
  aLeft: number;
  bReceived: number;
}

export interface ClosePositionBothReturn extends Omit<ClosePositionReturn, 'bReceived'> {
  bHeld: number;
}

export interface BuyPosition {
  price: number;
  swap: number;
  quantity: number;
}
