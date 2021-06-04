import { request, gql } from 'graphql-request';
import { AddressTokens, AllBets, AllLedgers, AllMarketsLedgers, AllTokens } from '../interfaces';
import { GRAPHQL_API, MARKET_ADDRESS } from '../utils/globals';

export const getAllLedgers = async (): Promise<AllLedgers> => {
  return request(
    GRAPHQL_API,
    gql`
      {
        ledgers: storageLedgerMaps(condition: { deleted: false }) {
          ledgerMaps: nodes {
            block: _level
            deleted
            owner: idxTokensOwner
            tokenId: idxTokensTokenId
            quantity: tokensNat4
          }
        }
      }
    `,
  );
};

export const getTokenLedger = async (
  tokens: number[],
  first?: number,
  owner?: string,
): Promise<AddressTokens> => {
  return request<AddressTokens>(
    GRAPHQL_API,
    gql`
      query TokenLedger($owner: String, $tokens: [BigFloat!], $first: Int) {
        tokenQuantity: storageLedgerMaps(
          condition: { deleted: false, idxTokensOwner: $owner }
          filter: { idxTokensTokenId: { in: $tokens } }
          orderBy: ID_DESC
          first: $first
        ) {
          token: nodes {
            id
            tokenId: idxTokensTokenId
            quantity: tokensNat4
            block: _level
          }
        }
      }
    `,
    {
      tokens,
      owner,
      first,
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

export const getAllMarkets = async (): Promise<AllMarketsLedgers> => {
  return request<AllMarketsLedgers>(
    GRAPHQL_API,
    gql`
      {
        markets: storageMarketMaps(orderBy: IDX_MARKETS_NAT_7_DESC, condition: { deleted: false }) {
          marketNodes: nodes {
            id
            block: _level
            deleted
            marketId: idxMarketsNat7
            metadataIpfsHash
            metadataDescription
            metadataAdjudicator
            state
            storageMarketMapMarketBootstrappeds(condition: { deleted: false }) {
              nodes {
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
          condition: { deleted: false, idxTokensOwner: "${MARKET_ADDRESS}" }
          orderBy: ID_DESC
        ) {
          ledgerMaps: nodes {
            block: _level
            deleted
            owner: idxTokensOwner
            tokenId: idxTokensTokenId
            quantity: tokensNat4
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
      query AuctionBets($marketId: BigFloat, idxMarketsOriginator: $originator) {
        storageLiquidityProviderMaps(
          condition: { idxMarketsMarketId: $marketId, deleted: false }
          orderBy: IDX_MARKETS_MARKET_ID_DESC
        ) {
          lqtProviderEdge: edges {
            lqtProviderNode: node {
              id
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
    {
      marketId,
      originator,
    },
  );
};
