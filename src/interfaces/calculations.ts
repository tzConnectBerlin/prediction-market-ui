export interface ClosePositionReturn {
  aToSwap: number;
  aLeft: number;
  bReceived: number;
  aToSwapWithSlippage: number;
}

export interface ClosePositionBothReturn
  extends Omit<ClosePositionReturn, 'bReceived' | 'aToSwapWithSlippage'> {
  bHeld: number;
}

export interface BuyPosition {
  price: number;
  swap: number;
  quantity: number;
}
