import { request, gql } from 'graphql-request';
import { AllBets, AllMarkets, AllTokens } from '../interfaces';
import { GRAPHQL_API } from '../utils/globals';

export const getAllTokenSupply = async (): Promise<AllTokens> => {
  return request(
    GRAPHQL_API,
    gql`
      {
        storageSupplyMaps(condition: { deleted: false }) {
          supplyMaps: nodes {
            tokenId: idxTokensNat5
            totalSupply: tokensTotalSupply
            tokenReserve: tokensInReserve
            deleted
          }
        }
      }
    `,
  );
};

export const getAllMarkets = async (): Promise<AllMarkets> => {
  return request<AllMarkets>(
    GRAPHQL_API,
    gql`
      query {
        storageMarketMaps(orderBy: ID_DESC) {
          edges {
            node {
              id
              block: _level
              deleted
              marketId: idxMarketsNat7
              metadataIpfsHash
              metadataDescription
              metadataAdjudicator
              currency
              state
              storageMarketMapMarketBootstrappeds(condition: { deleted: false }) {
                edges {
                  node {
                    auctionRewardCurrencyPool: currencyPoolAuctionRewardCurrencyPool
                    liquidityRewardPool: currencyPoolNat14
                    marketCurrencyPool: currencyPoolMarketCurrencyPool
                    bootstrapYesProbability: marketBootstrappedBootstrapYesProbability
                    liquidityRewardSupplyUpdatedAtBlock: marketBootstrappedNat18
                    winningPrediction
                    resolutionResolvedAtBlock
                    marketBootstrappedBootstrappedAtBlock
                  }
                }
              }
              storageMarketMapAuctionRunnings(condition: { deleted: false }) {
                edges {
                  node {
                    auctionRunningAuctionPeriodEnd
                    auctionRunningQuantity
                    auctionRunningYesPreference
                    auctionRunningUniswapContribution
                  }
                }
              }
            }
          }
        }
      }
    `,
  );
};

export const getBidsByMarket = async (marketId: string): Promise<AllBets> => {
  return request<AllBets>(
    GRAPHQL_API,
    gql`
      query {
        storageLiquidityProviderMaps(
          condition: { idxMarketsMarketId: "${marketId}", deleted: false }
          orderBy: IDX_MARKETS_MARKET_ID_DESC
        ) {
          lqtProviderEdge: edges {
            lqtProviderNode: node {
              block: _level
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
            }
          }
        }
      }
    `,
  );
};
