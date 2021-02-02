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
import { AuctionData, QuestionEntryMDWMap } from '../../../interfaces';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography';
import { ENABLE_SAME_MARKETS, ENABLE_SIMILAR_MARKETS } from '../../../utils/globals';
import { useMarketPathParams } from '../../../hooks/market';
import { MarketCardProps, MarketCard } from '../../molecules/MarketCard';
import { RootState } from '../../../redux/rootReducer';
import { filterSlice } from '../../../redux/slices/marketFilter';
import { getAllContractData, toAuctionData } from '../../../api/mdw';
import { roundToTwo } from '../../../utils/math';
import { useWallet } from '../../../wallet/hooks';

type MarketPageProps = WithTranslation;

interface MarketList {
  auctionOpen: { [key: string]: MarketCardProps };
  marketOpen: { [key: string]: MarketCardProps };
  marketClosed: { [key: string]: MarketCardProps };
  allData: QuestionEntryMDWMap;
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
  const marketHashes = {
    auction: new Array<string>(),
    other: new Array<string>(),
  };
  const dispatch = useDispatch();
  const {
    wallet: { pkh: userAddress },
  } = useWallet();
  const [myMarkets, setMyMarkets] = useState<string[]>([]);

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
  const { data: marketList, isLoading } = useQuery<MarketList, AxiosError, MarketList>(
    `contractQuestions-${marketAddress}`,
    async () => {
      const allMarketData = await getAllContractData();
      const metadata = await getIPFSDataByKeys(Object.keys(allMarketData));
      const newMarketList = metadata.reduce(
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
            acc.auctionOpen[hash] = marketProps;
            marketHashes.auction.push(hash);
          } else if (
            marketProps.auctionTimestamp < currentDate &&
            marketProps.marketTimestamp > currentDate
          ) {
            acc.marketOpen[hash] = marketProps;
            marketHashes.other.push(hash);
          } else if (currentDate >= marketProps.marketTimestamp) {
            marketProps.marketCloseText = t('marketClosed');
            acc.marketClosed[hash] = marketProps;
            marketHashes.other.push(hash);
          }
          acc.allData = allMarketData;
          return acc;
        },
        {
          auctionOpen: {},
          marketOpen: {},
          marketClosed: {},
          allData: {},
        } as MarketList,
      );

      if (Object.keys(newMarketList.marketOpen).length === 0) {
        dispatch(filterSlice.actions.toggleOpenMarkets(false));
      }

      Object.entries(allMarketData).forEach(([hash, newData]) => {
        if (marketHashes.auction.includes(hash)) {
          const qData = metadata?.find((o) => o.hash === hash);
          const propsData = newMarketList?.auctionOpen[hash];
          const auctionData = toAuctionData(newData);
          newMarketList.auctionOpen[hash] = {
            ...propsData,
            onClick: () =>
              history.push(`/market/${marketAddress}/question/${hash}/submit-bid`, {
                ...qData,
                ...newData,
              }),
            content: <ExtraMarketContent {...auctionData} auction />,
          };
        }

        if (marketHashes.other.includes(hash)) {
          const qData = metadata?.find((o) => o.hash === hash);
          const yes: number = newData.price_yes ? roundToTwo(Number(newData.price_yes)) : 0.5;
          const no: number = yes ? 1 - yes : 0.5;
          const newProps = {
            onClick: () =>
              history.push(`/market/${marketAddress}/question/${hash}`, {
                ...qData,
                ...newData,
              }),
            content: <ExtraMarketContent yes={yes} no={no} />,
          };
          if (newMarketList.marketOpen[hash]) {
            newMarketList.marketOpen[hash] = { ...newMarketList.marketOpen[hash], ...newProps };
          } else if (newMarketList.marketClosed[hash]) {
            newMarketList.marketClosed[hash] = { ...newMarketList.marketClosed[hash], ...newProps };
          }
        }
      });
      return newMarketList;
    },
  );

  useEffect(() => {
    if (userAddress && marketList?.allData) {
      Object.entries(marketList.allData).forEach(([hash, questionData]) => {
        if (questionData.owner === userAddress) {
          myMarkets.push(hash);
        }
        if (Object.keys(questionData.auction_bids).includes(userAddress)) {
          myMarkets.push(hash);
        }
      });
      setMyMarkets(myMarkets);
    }
  }, [marketList, userAddress]);

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
      {isLoading && <CircularProgress />}
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
                    ? myMarkets.includes(hash)
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
                    ? myMarkets.includes(hash)
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
                    ? myMarkets.includes(hash)
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
