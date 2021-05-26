import { request, gql } from 'graphql-request';
import { AllMarkets, Market } from '../interfaces';
import { GRAPHQL_API } from '../utils/globals';
import { normalizeGraphMarkets } from './utils';

export const getAllMarkets = async (): Promise<Market[]> => {
  const allMarketData = await request<AllMarkets>(
    GRAPHQL_API,
    gql`
      query {
        storageMarketMaps(orderBy: ID_DESC) {
          edges {
            node {
              id
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
  return normalizeGraphMarkets(allMarketData);
};
