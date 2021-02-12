import BigNumber from 'bignumber.js';

export interface ClosePositionReturn {
  aToSwap: BigNumber;
  aLeft: BigNumber;
  bReceived: BigNumber;
}

export interface ClosePositionBothReturn extends Omit<ClosePositionReturn, 'bReceived'> {
  bHeld: BigNumber;
}
