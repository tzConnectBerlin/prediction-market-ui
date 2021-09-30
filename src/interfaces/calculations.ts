export interface ClosePositionReturn {
  aToSwap: number;
  aLeft: number;
  bReceived: number;
  bReceivedWithSlippage: number;
}

export interface ClosePositionBothReturn
  extends Omit<ClosePositionReturn, 'bReceived' | 'bReceivedWithSlippage'> {
  bHeld: number;
}

export interface BuyPosition {
  price: number;
  swap: number;
  quantity: number;
}
