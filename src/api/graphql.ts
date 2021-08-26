import { request, gql } from 'graphql-request';
import { gql as apolloGql } from '@apollo/client';
import { AddressTokens, AllBets, AllLedgers, AllMarketsLedgers, AllTokens } from '../interfaces';
import { GRAPHQL_API, MARKET_ADDRESS } from '../globals';

export const ALL_MARKETS_SUBSCRIPTIONS = apolloGql`
      subscription {
  markets: storageMarketMaps(
    orderBy: TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC
    condition: { deleted: false }
  ) {
    marketNodes: nodes {
      id
      deleted
      marketId: idxMarketsNat4
      metadataIpfsHash
      metadataDescription
      metadataAdjudicator
      state
      txContext {
        blockInfo: levelByLevel {
          block: _level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
      }
      storageMarketMapMarketBootstrappeds(condition: { deleted: false }) {
        nodes {
          auctionRewardCurrencyPool: currencyPoolCreatorRewardCurrencyPool
          liquidityRewardPool: currencyPoolCreatorRewardCurrencyPool
          marketCurrencyPool: currencyPoolMarketCurrencyPool
          bootstrapYesProbability: marketBootstrappedBootstrapYesProbability
          liquidityRewardSupplyUpdatedAtBlock: currencyPoolNat5
          winningPrediction
          resolutionResolvedAtBlock
          marketBootstrappedBootstrappedAtBlock
        }
      }
      storageMarketMapAuctionRunnings(condition: { deleted: false }) {
        nodes {
          auctionRunningAuctionPeriodEnd
          auctionRunningQuantity
          auctionRunningYesPreference
          auctionRunningUniswapContribution
        }
      }
    }
  }
}`;

export const MARKET_LEDGERS = apolloGql`
subscription {
  ledgers: storageLedgerMaps(
    orderBy: TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC
    condition: {
      deleted: false
      idxTokensOwner: "${MARKET_ADDRESS}"
    }
  ) {
    ledgerMaps: nodes {
      id
      tokenId: idxTokensTokenId
      quantity: tokensNat2
      owner: idxTokensOwner
      txContext {
        blockInfo: levelByLevel {
          block: _level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
      }
    }
  }
}
`;

const ALL_LEDGERS = apolloGql`
  {
    ledgers: storageLedgerMaps(condition: { deleted: false }) {
      ledgerMaps: nodes {
        id
        tokenId: idxTokensTokenId
        quantity: tokensNat2
        owner: idxTokensOwner
        txContext {
          blockInfo: levelByLevel {
            block: _level
            bakedAt
          }
          operationGroupNumber
          operationNumber
          contentNumber
        }
      }
    }
  }
`;

export const getAllLedgers = async (): Promise<AllLedgers> => {
  return request(
    GRAPHQL_API,
    gql`
      {
        ledgers: storageLedgerMaps(condition: { deleted: false }) {
          ledgerMaps: nodes {
            id
            tokenId: idxTokensTokenId
            quantity: tokensNat2
            owner: idxTokensOwner
            txContext {
              blockInfo: levelByLevel {
                block: _level
                bakedAt
              }
              operationGroupNumber
              operationNumber
              contentNumber
            }
          }
        }
      }
    `,
  );
};

export const getTokenLedger = async (tokens: number[], owner?: string): Promise<AddressTokens> => {
  return request<AddressTokens>(
    GRAPHQL_API,
    gql`
      query TokenLedger($owner: String, $tokens: [BigFloat!]) {
        tokenQuantity: storageLedgerMaps(
          condition: { deleted: false, idxTokensOwner: $owner }
          filter: { idxTokensTokenId: { in: $tokens } }
          orderBy: TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC
        ) {
          token: nodes {
            id
            tokenId: idxTokensTokenId
            quantity: tokensNat2
            owner: idxTokensOwner
            txContext {
              blockInfo: levelByLevel {
                block: _level
                bakedAt
              }
              operationGroupNumber
              operationNumber
              contentNumber
            }
          }
        }
      }
    `,
    {
      tokens,
      owner,
    },
  );
};

export const getAllTokenSupply = async (): Promise<AllTokens> => {
  return request(
    GRAPHQL_API,
    gql`
      {
        storageSupplyMaps(condition: { deleted: false }) {
          supplyMaps: nodes {
            id
            tokenId: idxTokensNat3
            totalSupply: tokensTotalSupply
            tokenReserve: tokensInReserve
            deleted
            txContext {
              blockInfo: levelByLevel {
                block: _level
                bakedAt
              }
              operationGroupNumber
              operationNumber
              contentNumber
            }
          }
        }
      }
    `,
  );
};

export const getTotalSupplyByMarket = async (LQTTokenId?: number): Promise<AllTokens> => {
  return request(
    GRAPHQL_API,
    gql`
      query MarketLiquidity($LQTTokenId: BigFloat) {
        storageSupplyMaps(
          condition: { idxTokensNat3: $LQTTokenId, deleted: false }
          orderBy: TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC
          first: 1
        ) {
          supplyMaps: nodes {
            id
            tokenId: idxTokensNat3
            totalSupply: tokensTotalSupply
            txContext {
              blockInfo: levelByLevel {
                block: _level
                bakedAt
              }
              operationGroupNumber
              operationNumber
              contentNumber
            }
            deleted
          }
        }
      }
    `,
    {
      LQTTokenId,
    },
  );
};

export const getAllMarkets = async (): Promise<AllMarketsLedgers> => {
  return request<AllMarketsLedgers>(
    GRAPHQL_API,
    gql`
      subscription {
        markets: storageMarketMaps(orderBy: TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC, condition: { deleted: false }) {
          marketNodes: nodes {
            id
            deleted
            marketId: idxMarketsNat4
            metadataIpfsHash
            metadataDescription
            metadataAdjudicator
            state
            txContext {
              blockInfo: levelByLevel {
                block: _level
                bakedAt
              }
              operationGroupNumber
              operationNumber
              contentNumber
            }
            storageMarketMapMarketBootstrappeds(condition: { deleted: false }) {
              nodes {
                auctionRewardCurrencyPool: currencyPoolCreatorRewardCurrencyPool
                liquidityRewardPool: currencyPoolCreatorRewardCurrencyPool
                marketCurrencyPool: currencyPoolMarketCurrencyPool
                bootstrapYesProbability: marketBootstrappedBootstrapYesProbability
                liquidityRewardSupplyUpdatedAtBlock: currencyPoolNat5
                winningPrediction
                resolutionResolvedAtBlock
                marketBootstrappedBootstrappedAtBlock
              }
            }
            storageMarketMapAuctionRunnings(condition: { deleted: false }) {
              nodes {
                auctionRunningAuctionPeriodEnd
                auctionRunningQuantity
                auctionRunningYesPreference
                auctionRunningUniswapContribution
              }
            }
          }
        }
        ledgers: storageLedgerMaps(
          orderBy: TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC,
          condition: { deleted: false, idxTokensOwner: "${MARKET_ADDRESS}" }
        ) {
          ledgerMaps: nodes {
            id
            tokenId: idxTokensTokenId
            quantity: tokensNat2
            owner: idxTokensOwner
            txContext {
              blockInfo: levelByLevel {
                block: _level
                bakedAt
              }
              operationGroupNumber
              operationNumber
              contentNumber
            }
          }
        }
      }
    `,
  );
};

export const getBidsByMarket = async (marketId?: string, originator?: string): Promise<AllBets> => {
  return request<AllBets>(
    GRAPHQL_API,
    gql`
      query AuctionBets($marketId: BigFloat, $originator: String) {
        storageLiquidityProviderMaps(
          condition: {
            idxMarketsMarketId: $marketId
            idxMarketsOriginator: $originator
            deleted: false
          }
          orderBy: IDX_MARKETS_MARKET_ID_DESC
        ) {
          lqtProviderEdge: edges {
            lqtProviderNode: node {
              id
              marketId: idxMarketsMarketId
              originator: idxMarketsOriginator
              bets: storageLiquidityProviderMapBets {
                totalBets: totalCount
                betEdges: edges {
                  bet: node {
                    probability: betPredictedProbability
                    quantity: betQuantity
                  }
                }
              }
              txContext {
                blockInfo: levelByLevel {
                  block: _level
                  bakedAt
                }
                operationGroupNumber
                operationNumber
                contentNumber
              }
            }
          }
        }
      }
    `,
    {
      marketId,
      originator,
    },
  );
};

export const getBetsByAddress = async (originator?: string): Promise<AllBets> => {
  return request<AllBets>(
    GRAPHQL_API,
    gql`
      query AuctionBets($originator: String) {
        storageLiquidityProviderMaps(
          condition: { idxMarketsOriginator: $originator, deleted: false }
          orderBy: IDX_MARKETS_MARKET_ID_DESC
        ) {
          lqtProviderEdge: edges {
            lqtProviderNode: node {
              id
              marketId: idxMarketsMarketId
              originator: idxMarketsOriginator
              bets: storageLiquidityProviderMapBets {
                totalBets: totalCount
                betEdges: edges {
                  bet: node {
                    probability: betPredictedProbability
                    quantity: betQuantity
                  }
                }
              }
              txContext {
                blockInfo: levelByLevel {
                  block: _level
                  bakedAt
                }
                operationGroupNumber
                operationNumber
                contentNumber
              }
            }
          }
        }
      }
    `,
    {
      originator,
    },
  );
};
