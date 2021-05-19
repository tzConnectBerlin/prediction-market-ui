import axios from 'axios';
import { request, gql } from 'graphql-request';
import { Market, MarketCardData } from '../interfaces';
import { GRAPHQL_API } from '../utils/globals';

interface AllMarkets {
  storageMarketMaps: {
    edges: Market[];
  };
}

export const getAllMarketCard = async (): Promise<MarketCardData[]> => {
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
            }
          }
        }
      }
    `,
  );
  return (await axios.get('markets.json')).data;
};

const removeDuplicateMarkets = ({ storageMarketMaps: { edges } }: AllMarkets) => {};
