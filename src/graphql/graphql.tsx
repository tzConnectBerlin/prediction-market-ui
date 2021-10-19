import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };

const defaultOptions = {};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A floating point number that requires more precision than IEEE 754 binary 64 */
  BigFloat: any;
  /**
   * A signed eight-byte integer. The upper big integer values are greater than the
   * max value for a JavaScript number. Therefore all big integers will be output as
   * strings and not numbers.
   */
  BigInt: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
};

export type LedgerSubscriptionVariables = Exact<{
  owner: Maybe<Scalars['String']>;
}>;

export type TxContext = {
  __typename?: 'PublicTxContext';
  operationGroupNumber: number;
  operationNumber: number;
  contentNumber: number;
  txHash: string;
  blockInfo: { __typename?: 'PublicLevel'; bakedAt: string; block: number };
};

export type Token = {
  id: string;
  tokenId: string;
  quantity: string;
  owner: string;
  txContext: TxContext;
};

export type LedgerSubscription = {
  __typename?: 'Subscription';
  ledgers: Token[];
};

export type LedgerByOwnerAndTokensSubscriptionVariables = Exact<{
  owner: Maybe<Scalars['String']>;
  tokens: Maybe<Array<Scalars['BigFloat']> | Scalars['BigFloat']>;
}>;

export type LedgerByOwnerAndTokensSubscription = {
  __typename?: 'Subscription';
  ledgers: Token[];
};

export type LiveLedgerSubscriptionVariables = Exact<{ [key: string]: never }>;

export type LiveLedgerSubscription = {
  __typename?: 'Subscription';
  ledgers: Token[];
};

export type LedgerByOwnerSubscriptionVariables = Exact<{
  owner: Maybe<Scalars['String']>;
  tokens: Maybe<Array<Scalars['BigFloat']> | Scalars['BigFloat']>;
}>;

export type LedgerByOwnerSubscription = {
  __typename?: 'Subscription';
  ledgers: Token[];
};

export type MarketSubscriptionVariables = Exact<{ [key: string]: never }>;

export type MarketBootstrapped = {
  __typename?: 'PmmStorageMarketMapMarketbootstrapped';
  resolutionResolvedAtBlock?: number;
  marketBootstrappedBootstrappedAtBlock: string;
  auctionRewardCurrencyPool: string;
  liquidityRewardPool: string;
  marketCurrencyPool: string;
  bootstrapYesProbability: string;
  winningPrediction?: string;
};

export type AuctionRunning = {
  __typename?: 'PmmStorageMarketMapAuctionrunning';
  auctionRunningAuctionPeriodEnd: string;
  auctionRunningQuantity: string;
  auctionRunningYesPreference: string;
  auctionRunningUniswapContribution: string;
};

export type Market = {
  __typename?: 'PmmStorageMarketMapOrdered';
  id: string;
  metadataIpfsHash: string;
  metadataDescription: string;
  metadataAdjudicator: string;
  marketsState: string;
  marketId: string;
  txContext: TxContext;
  marketInfo: {
    __typename?: 'PmmStorageMarketMap';
    marketBootstrapped: Array<MarketBootstrapped>;
    auctionRunning: Array<AuctionRunning>;
  };
};

export type MarketSubscription = {
  __typename?: 'Subscription';
  markets: Array<Market>;
};

export type MarketBetsSubscriptionVariables = Exact<{
  marketId: Maybe<Scalars['BigFloat']>;
}>;

export type Bet = {
  __typename?: 'PmmStorageLiquidityProviderMapBet';
  probability: string;
  quantity: string;
};

export type BetDetails = {
  __typename?: 'PmmStorageLiquidityProviderMap';
  bets: Array<Bet>;
};

export type MarketBetsSubscription = {
  __typename?: 'Subscription';
  allPmmStorageLiquidityProviderMapLivesList: Array<{
    __typename?: 'PmmStorageLiquidityProviderMapLive';
    id: string;
    marketId: string;
    originator: string;
    betDetails: BetDetails;
    txContext: TxContext;
  }>;
};

export type TokenSupplyByTokenIdSubscriptionVariables = Exact<{
  tokens: Maybe<Array<Scalars['BigFloat']> | Scalars['BigFloat']>;
}>;

export type TokenSupplyByTokenIdSubscription = {
  __typename?: 'Subscription';
  supplyMaps: Array<{
    __typename?: 'PmmStorageSupplyMapLive';
    id: string;
    tokenId: string;
    totalSupply: string;
    tokenReserve: string;
    txContext: TxContext;
  }>;
};

export type UserBetsSubscriptionVariables = Exact<{
  originator: Maybe<Scalars['String']>;
}>;

export type UserBetsSubscription = MarketBetsSubscription;

export const LedgerDocument = gql`
  subscription Ledger($owner: String) {
    ledgers: allPmmStorageLedgerMapsList(
      orderBy: PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC
      condition: { deleted: false, idxTokensOwner: $owner }
    ) {
      id
      tokenId: idxTokensTokenId
      quantity: tokensNat
      owner: idxTokensOwner
      txContext: publicTxContextByTxContextId {
        blockInfo: publicLevelByLevel {
          block: level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
      }
    }
  }
`;

/**
 * __useLedgerSubscription__
 *
 * To run a query within a React component, call `useLedgerSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLedgerSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLedgerSubscription({
 *   variables: {
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useLedgerSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<LedgerSubscription, LedgerSubscriptionVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<LedgerSubscription, LedgerSubscriptionVariables>(
    LedgerDocument,
    options,
  );
}
export type LedgerSubscriptionHookResult = ReturnType<typeof useLedgerSubscription>;
export type LedgerSubscriptionResult = Apollo.SubscriptionResult<LedgerSubscription>;
export const LedgerByOwnerAndTokensDocument = gql`
  subscription LedgerByOwnerAndTokens($owner: String, $tokens: [BigFloat!]) {
    ledgers: allPmmStorageLedgerMapsList(
      orderBy: PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC
      condition: { deleted: false, idxTokensOwner: $owner }
      filter: { idxTokensTokenId: { in: $tokens } }
    ) {
      id
      tokenId: idxTokensTokenId
      quantity: tokensNat
      owner: idxTokensOwner
      txContext: publicTxContextByTxContextId {
        blockInfo: publicLevelByLevel {
          block: level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
      }
    }
  }
`;

/**
 * __useLedgerByOwnerAndTokensSubscription__
 *
 * To run a query within a React component, call `useLedgerByOwnerAndTokensSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLedgerByOwnerAndTokensSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLedgerByOwnerAndTokensSubscription({
 *   variables: {
 *      owner: // value for 'owner'
 *      tokens: // value for 'tokens'
 *   },
 * });
 */
export function useLedgerByOwnerAndTokensSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    LedgerByOwnerAndTokensSubscription,
    LedgerByOwnerAndTokensSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    LedgerByOwnerAndTokensSubscription,
    LedgerByOwnerAndTokensSubscriptionVariables
  >(LedgerByOwnerAndTokensDocument, options);
}
export type LedgerByOwnerAndTokensSubscriptionHookResult = ReturnType<
  typeof useLedgerByOwnerAndTokensSubscription
>;
export type LedgerByOwnerAndTokensSubscriptionResult =
  Apollo.SubscriptionResult<LedgerByOwnerAndTokensSubscription>;
export const LiveLedgerDocument = gql`
  subscription LiveLedger {
    ledgers: allPmmStorageLedgerMapLivesList(
      orderBy: PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC
    ) {
      id
      tokenId: idxTokensTokenId
      quantity: tokensNat
      owner: idxTokensOwner
      txContext: publicTxContextByTxContextId {
        blockInfo: publicLevelByLevel {
          block: level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
      }
    }
  }
`;

/**
 * __useLiveLedgerSubscription__
 *
 * To run a query within a React component, call `useLiveLedgerSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLiveLedgerSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLiveLedgerSubscription({
 *   variables: {
 *   },
 * });
 */
export function useLiveLedgerSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    LiveLedgerSubscription,
    LiveLedgerSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<LiveLedgerSubscription, LiveLedgerSubscriptionVariables>(
    LiveLedgerDocument,
    options,
  );
}
export type LiveLedgerSubscriptionHookResult = ReturnType<typeof useLiveLedgerSubscription>;
export type LiveLedgerSubscriptionResult = Apollo.SubscriptionResult<LiveLedgerSubscription>;
export const LedgerByOwnerDocument = gql`
  subscription LedgerByOwner($owner: String, $tokens: [BigFloat!]) {
    ledgers: allPmmStorageLedgerMapLivesList(
      orderBy: PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC
      condition: { idxTokensOwner: $owner }
      filter: { idxTokensTokenId: { in: $tokens } }
    ) {
      id
      tokenId: idxTokensTokenId
      quantity: tokensNat
      owner: idxTokensOwner
      txContext: publicTxContextByTxContextId {
        blockInfo: publicLevelByLevel {
          block: level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
      }
    }
  }
`;

/**
 * __useLedgerByOwnerSubscription__
 *
 * To run a query within a React component, call `useLedgerByOwnerSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLedgerByOwnerSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLedgerByOwnerSubscription({
 *   variables: {
 *      owner: // value for 'owner'
 *      tokens: // value for 'tokens'
 *   },
 * });
 */
export function useLedgerByOwnerSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    LedgerByOwnerSubscription,
    LedgerByOwnerSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<LedgerByOwnerSubscription, LedgerByOwnerSubscriptionVariables>(
    LedgerByOwnerDocument,
    options,
  );
}
export type LedgerByOwnerSubscriptionHookResult = ReturnType<typeof useLedgerByOwnerSubscription>;
export type LedgerByOwnerSubscriptionResult = Apollo.SubscriptionResult<LedgerByOwnerSubscription>;
export const MarketDocument = gql`
  subscription Market {
    markets: allPmmStorageMarketMapOrderedsList {
      id
      marketId: idxMarketsNat
      metadataIpfsHash
      metadataDescription
      metadataAdjudicator
      marketsState
      txContext: publicTxContextByTxContextId {
        blockInfo: publicLevelByLevel {
          block: level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
      }
      marketInfo: pmmStorageMarketMapById {
        marketBootstrapped: pmmStorageMarketMapMarketbootstrappedsByStorageMarketMapIdList {
          auctionRewardCurrencyPool: currencyPoolCreatorRewardCurrencyPool
          liquidityRewardPool: currencyPoolCreatorRewardCurrencyPool
          marketCurrencyPool: currencyPoolMarketCurrencyPool
          bootstrapYesProbability: marketBootstrappedBootstrapYesProbability
          winningPrediction: resolutionWinningPrediction
          resolutionResolvedAtBlock
          marketBootstrappedBootstrappedAtBlock
        }
        auctionRunning: pmmStorageMarketMapAuctionrunningsByStorageMarketMapIdList {
          auctionRunningAuctionPeriodEnd
          auctionRunningQuantity
          auctionRunningYesPreference
          auctionRunningUniswapContribution
        }
      }
    }
  }
`;

/**
 * __useMarketSubscription__
 *
 * To run a query within a React component, call `useMarketSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMarketSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMarketSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<MarketSubscription, MarketSubscriptionVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<MarketSubscription, MarketSubscriptionVariables>(
    MarketDocument,
    options,
  );
}
export type MarketSubscriptionHookResult = ReturnType<typeof useMarketSubscription>;
export type MarketSubscriptionResult = Apollo.SubscriptionResult<MarketSubscription>;
export const MarketBetsDocument = gql`
  subscription MarketBets($marketId: BigFloat) {
    allPmmStorageLiquidityProviderMapLivesList(
      condition: { idxMarketsMarketId: $marketId }
      orderBy: IDX_MARKETS_MARKET_ID_DESC
    ) {
      id
      marketId: idxMarketsMarketId
      originator: idxMarketsOriginator
      betDetails: pmmStorageLiquidityProviderMapById {
        bets: pmmStorageLiquidityProviderMapBetsByStorageLiquidityProviderMapIdList {
          probability: betPredictedProbability
          quantity: betQuantity
        }
      }
      txContext: publicTxContextByTxContextId {
        blockInfo: publicLevelByLevel {
          block: level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
        txHash: operationHash
      }
    }
  }
`;

/**
 * __useMarketBetsSubscription__
 *
 * To run a query within a React component, call `useMarketBetsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMarketBetsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketBetsSubscription({
 *   variables: {
 *      marketId: // value for 'marketId'
 *   },
 * });
 */
export function useMarketBetsSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    MarketBetsSubscription,
    MarketBetsSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<MarketBetsSubscription, MarketBetsSubscriptionVariables>(
    MarketBetsDocument,
    options,
  );
}
export type MarketBetsSubscriptionHookResult = ReturnType<typeof useMarketBetsSubscription>;
export type MarketBetsSubscriptionResult = Apollo.SubscriptionResult<MarketBetsSubscription>;
export const TokenSupplyByTokenIdDocument = gql`
  subscription TokenSupplyByTokenId($tokens: [BigFloat!]) {
    supplyMaps: allPmmStorageSupplyMapLivesList(filter: { idxTokensNat: { in: $tokens } }) {
      id
      tokenId: idxTokensNat
      totalSupply: tokensTotalSupply
      tokenReserve: tokensInReserve
      txContext: publicTxContextByTxContextId {
        blockInfo: publicLevelByLevel {
          block: level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
        txHash: operationHash
      }
    }
  }
`;

/**
 * __useTokenSupplyByTokenIdSubscription__
 *
 * To run a query within a React component, call `useTokenSupplyByTokenIdSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTokenSupplyByTokenIdSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTokenSupplyByTokenIdSubscription({
 *   variables: {
 *      tokens: // value for 'tokens'
 *   },
 * });
 */
export function useTokenSupplyByTokenIdSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    TokenSupplyByTokenIdSubscription,
    TokenSupplyByTokenIdSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    TokenSupplyByTokenIdSubscription,
    TokenSupplyByTokenIdSubscriptionVariables
  >(TokenSupplyByTokenIdDocument, options);
}
export type TokenSupplyByTokenIdSubscriptionHookResult = ReturnType<
  typeof useTokenSupplyByTokenIdSubscription
>;
export type TokenSupplyByTokenIdSubscriptionResult =
  Apollo.SubscriptionResult<TokenSupplyByTokenIdSubscription>;
export const UserBetsDocument = gql`
  subscription UserBets($originator: String) {
    allPmmStorageLiquidityProviderMapLivesList(
      condition: { idxMarketsOriginator: $originator }
      orderBy: IDX_MARKETS_MARKET_ID_DESC
    ) {
      id
      marketId: idxMarketsMarketId
      originator: idxMarketsOriginator
      betDetails: pmmStorageLiquidityProviderMapById {
        bets: pmmStorageLiquidityProviderMapBetsByStorageLiquidityProviderMapIdList {
          probability: betPredictedProbability
          quantity: betQuantity
        }
      }
      txContext: publicTxContextByTxContextId {
        blockInfo: publicLevelByLevel {
          block: level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
        txHash: operationHash
      }
    }
  }
`;

/**
 * __useUserBetsSubscription__
 *
 * To run a query within a React component, call `useUserBetsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserBetsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserBetsSubscription({
 *   variables: {
 *      originator: // value for 'originator'
 *   },
 * });
 */
export function useUserBetsSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<UserBetsSubscription, UserBetsSubscriptionVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<UserBetsSubscription, UserBetsSubscriptionVariables>(
    UserBetsDocument,
    options,
  );
}
export type UserBetsSubscriptionHookResult = ReturnType<typeof useUserBetsSubscription>;
export type UserBetsSubscriptionResult = Apollo.SubscriptionResult<UserBetsSubscription>;
