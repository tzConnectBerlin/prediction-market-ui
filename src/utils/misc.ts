export const getPendingMarkets = (marketAddress: string): string[] => {
  return localStorage.getItem(`pending:${marketAddress}`)?.split(',') ?? [];
};

export const addPendingMarket = (marketAddress: string, questionAddress: string): void => {
  const prevPendingList = getPendingMarkets(marketAddress);
  prevPendingList.unshift(questionAddress);
  localStorage.setItem(`pending:${marketAddress}`, prevPendingList.join(','));
};

export const removePendingMarket = (marketAddress: string, questionAddress: string): void => {
  const prevPendingList = getPendingMarkets(marketAddress);
  const newList = prevPendingList.filter((o) => o !== questionAddress);
  localStorage.setItem(`pending:${marketAddress}`, newList.join(','));
};
