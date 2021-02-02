import {
  Grid,
  Paper,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import React, { useEffect, useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIPFSDataByKeys } from '../../../api/market';
import { initMarketContract } from '../../../contracts/Market';
import {
  AuctionData,
  LedgerBalanceResponse,
  QuestionEntryMDWMap,
  QuestionMetaData,
} from '../../../interfaces';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography';
import { ENABLE_SAME_MARKETS, ENABLE_SIMILAR_MARKETS } from '../../../utils/globals';
import { useMarketPathParams } from '../../../hooks/market';
import { MarketCardProps, MarketCard } from '../../molecules/MarketCard';
import { RootState } from '../../../redux/rootReducer';
import { filterSlice } from '../../../redux/slices/marketFilter';
import { getAllContractData, getAllLedgerBalances, toAuctionData } from '../../../api/mdw';
import { roundToTwo } from '../../../utils/math';
import { useWallet } from '../../../wallet/hooks';

type MarketPageProps = WithTranslation;

interface MarketList {
  auctionOpen: { [key: string]: MarketCardProps };
  marketOpen: { [key: string]: MarketCardProps };
  marketClosed: { [key: string]: MarketCardProps };
}

interface ExtraDataCard extends Partial<AuctionData> {
  auction?: boolean;
}

/**
 *
 * TODO: Clean this component in next iteration
 */
export const MarketPageComponent: React.FC<MarketPageProps> = ({ t }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    wallet: { pkh: userAddress },
  } = useWallet();
  const [myMarkets, setMyMarkets] = useState(new Set<string>());

  const ExtraMarketContent: React.FC<ExtraDataCard> = ({ yes, no, auction, participants }) => (
    <>
      <Typography size="caption" component="div">
        {t(auction ? 'currentYesPrediction' : 'Yes')}: {yes}
      </Typography>
      {!auction && (
        <Typography size="caption" component="div">
          {t('No')}: {no}
        </Typography>
      )}
      {auction && (
        <Typography size="caption" component="div">
          {t('participants')}: {participants}
        </Typography>
      )}
    </>
  );
  const { marketAddress } = useMarketPathParams();

  const { data: marketData, isLoading: marketDataLoading } = useQuery<
    QuestionEntryMDWMap,
    AxiosError,
    QuestionEntryMDWMap
  >(['contractQuestions', marketAddress], async () => {
    return getAllContractData();
  });

  const { data: ipfsMetadata, isLoading: ipfsDataLoading } = useQuery<
    QuestionMetaData[] | undefined,
    AxiosError,
    QuestionMetaData[] | undefined
  >(
    ['contractMetaData', marketAddress],
    () => {
      return marketData && getIPFSDataByKeys(Object.keys(marketData));
    },
    {
      enabled: !!marketData,
    },
  );

  const { data: ledgerData, isLoading: ledgerDataLoading } = useQuery<
    LedgerBalanceResponse,
    AxiosError,
    LedgerBalanceResponse
  >(['contractLedgerBalance', marketAddress], () => {
    return getAllLedgerBalances();
  });

  const marketList =
    ipfsMetadata &&
    marketData &&
    ipfsMetadata.reduce(
      (acc, questionData) => {
        const { question, auctionEndDate, marketCloseDate, hash, iconURL } = questionData;
        const marketProps: MarketCardProps = {
          hash,
          auctionCloseText: t('auctionEndDate'),
          marketCloseText: t('marketCloseDate'),
          auctionTimestamp: new Date(auctionEndDate),
          marketTimestamp: new Date(marketCloseDate),
          title: question,
          iconURL,
          onClick: () =>
            history.push(`/market/${marketAddress}/question/${hash}`, {
              ...questionData,
            }),
        };
        const currentDate = new Date();
        if (marketProps.auctionTimestamp > currentDate) {
          const qData = ipfsMetadata.find((o) => o.hash === hash);
          const auctionData = toAuctionData(marketData[hash]);
          acc.auctionOpen[hash] = {
            ...marketProps,
            onClick: () =>
              history.push(`/market/${marketAddress}/question/${hash}/submit-bid`, {
                ...qData,
                ...marketData[hash],
              }),
            content: <ExtraMarketContent {...auctionData} auction />,
          };
        } else {
          const qData = ipfsMetadata.find((o) => o.hash === hash);
          const yes: number = marketData[hash].price_yes
            ? roundToTwo(Number(marketData[hash].price_yes))
            : 0.5;
          const no: number = yes ? 1 - yes : 0.5;
          const newProps = {
            ...marketProps,
            onClick: () =>
              history.push(`/market/${marketAddress}/question/${hash}`, {
                ...qData,
                ...marketData[hash],
              }),
            content: <ExtraMarketContent yes={yes} no={no} />,
          };
          if (
            marketProps.auctionTimestamp < currentDate &&
            marketProps.marketTimestamp > currentDate
          ) {
            acc.marketOpen[hash] = newProps;
          } else if (currentDate >= marketProps.marketTimestamp) {
            marketProps.marketCloseText = t('marketClosed');
            acc.marketClosed[hash] = newProps;
          }
        }
        return acc;
      },
      {
        auctionOpen: {},
        marketOpen: {},
        marketClosed: {},
      } as MarketList,
    );

  useEffect(() => {
    if (userAddress && marketData && ledgerData) {
      const hashSet = new Set<string>();
      Object.entries(marketData).forEach(([hash, questionData]) => {
        if (questionData.owner === userAddress) {
          hashSet.add(hash);
        }
        if (Object.keys(questionData.auction_bids).includes(userAddress)) {
          hashSet.add(hash);
        }
        if (
          ledgerData[questionData.tokens.yes_token_id] &&
          Object.keys(ledgerData[questionData.tokens.yes_token_id]).includes(userAddress)
        ) {
          hashSet.add(hash);
        }
        if (
          ledgerData[questionData.tokens.no_token_id] &&
          Object.keys(ledgerData[questionData.tokens.no_token_id]).includes(userAddress)
        ) {
          hashSet.add(hash);
        }
      });
      setMyMarkets(hashSet);
    }
  }, [marketData, userAddress, ledgerData]);

  useEffect(() => {
    marketAddress && initMarketContract(marketAddress);
  }, [marketAddress]);

  const getPageTitle = (): string | undefined => {
    if (ENABLE_SAME_MARKETS || ENABLE_SIMILAR_MARKETS) {
      return marketAddress;
    }
  };

  const title = getPageTitle();
  const filterData = useSelector((state: RootState) => state.marketFilter);

  return (
    <MainPage title={title ? t(`${title}`) : undefined}>
      {(marketDataLoading || ipfsDataLoading) && <CircularProgress />}
      {marketList && (
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={filterData.auctions}
                onChange={(event) => {
                  dispatch(filterSlice.actions.toggleAuctions(event.target.checked));
                }}
                name="auctions"
              />
            }
            label={t('auctionOpen')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterData.allMarkets}
                onChange={(event) => {
                  dispatch(filterSlice.actions.toggleAllMarkets(event.target.checked));
                }}
                name="allMarkets"
                color="primary"
              />
            }
            label={t('allMarkets')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterData.openMarkets}
                onChange={(event) => {
                  dispatch(filterSlice.actions.toggleOpenMarkets(event.target.checked));
                }}
                name="openMarkets"
                color="primary"
              />
            }
            label={t('openMarket')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterData.closedMarkets}
                onChange={(event) => {
                  dispatch(filterSlice.actions.toggleClosedMarkets(event.target.checked));
                }}
                name="closedMarkets"
                color="primary"
              />
            }
            label={t('closedMarket')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterData.onlyMyMarkets}
                onChange={(event) => {
                  dispatch(filterSlice.actions.toggleOnlyMyMarkets(event.target.checked));
                }}
                name="myMarkets"
                color="primary"
              />
            }
            label={t('myMarkets')}
            disabled={!userAddress}
          />
        </FormGroup>
      )}
      {marketList && filterData.auctions && Object.keys(marketList.auctionOpen).length > 0 && (
        <Paper elevation={0}>
          <Typography component="span" size="h4">
            {t('auctionOpen')}
          </Typography>
          <Grid container spacing={1}>
            {Object.entries(marketList.auctionOpen).map(([hash, item]) => (
              <Grid
                item
                key={hash}
                style={{
                  // eslint-disable-next-line no-nested-ternary
                  visibility: filterData.onlyMyMarkets
                    ? myMarkets.has(hash)
                      ? 'visible'
                      : 'hidden'
                    : 'visible',
                }}
              >
                <MarketCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
      {marketList && filterData.openMarkets && Object.keys(marketList.marketOpen).length > 0 && (
        <Paper elevation={0}>
          <Typography component="span" size="h4">
            {t('openMarket')}
          </Typography>
          <Grid container spacing={1}>
            {Object.entries(marketList.marketOpen).map(([hash, item]) => (
              <Grid
                item
                key={hash}
                style={{
                  // eslint-disable-next-line no-nested-ternary
                  visibility: filterData.onlyMyMarkets
                    ? myMarkets.has(hash)
                      ? 'visible'
                      : 'hidden'
                    : 'visible',
                }}
              >
                <MarketCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
      {marketList && filterData.closedMarkets && Object.keys(marketList.marketClosed).length > 0 && (
        <Paper elevation={0}>
          <Typography component="span" size="h4">
            {t('closedMarket')}
          </Typography>
          <Grid container spacing={1}>
            {Object.entries(marketList.marketClosed).map(([hash, item]) => (
              <Grid
                item
                key={hash}
                style={{
                  // eslint-disable-next-line no-nested-ternary
                  visibility: filterData.onlyMyMarkets
                    ? myMarkets.has(hash)
                      ? 'visible'
                      : 'hidden'
                    : 'visible',
                }}
              >
                <MarketCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </MainPage>
  );
};

export const MarketPage = withTranslation(['common'])(MarketPageComponent);
