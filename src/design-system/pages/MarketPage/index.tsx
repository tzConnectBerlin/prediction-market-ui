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
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { getAuctionData, getQuestions } from '../../../api/market';
import { initMarketContract } from '../../../contracts/Market';
import { AuctionData } from '../../../interfaces';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography';
import { ENABLE_SAME_MARKETS, ENABLE_SIMILAR_MARKETS } from '../../../utils/globals';
import { useMarketPathParams } from '../../../hooks/market';
import { MarketCardProps, MarketCard } from '../../molecules/MarketCard';

type MarketPageProps = WithTranslation;

interface MarketList {
  auctionOpen: { [key: string]: MarketCardProps };
  marketOpen: { [key: string]: MarketCardProps };
  marketClosed: { [key: string]: MarketCardProps };
}

interface SelectionBoxState {
  auctions: boolean;
  allMarkets: boolean;
  openMarkets: boolean;
  closedMarkets: boolean;
}

export const MarketPageComponent: React.FC<MarketPageProps> = ({ t }) => {
  const history = useHistory();
  const marketHashes = {
    auction: new Array<string>(),
    other: new Array<string>(),
  };
  const [state, setState] = React.useState<SelectionBoxState>({
    auctions: true,
    allMarkets: false,
    openMarkets: true,
    closedMarkets: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newState: SelectionBoxState = state;
    if (event.target.name === 'allMarkets') {
      newState = {
        ...newState,
        closedMarkets: event.target.checked,
        openMarkets: event.target.checked,
        allMarkets: event.target.checked,
      };
    } else {
      newState = {
        ...newState,
        [event.target.name]: event.target.checked,
      };
    }
    if (newState.openMarkets && newState.closedMarkets) {
      newState = {
        ...newState,
        allMarkets: true,
      };
    }
    if (!newState.openMarkets || !newState.closedMarkets) {
      newState = {
        ...newState,
        allMarkets: false,
      };
    }
    setState(newState);
  };
  const AuctionInfo: React.FC<AuctionData> = ({ yes, participants }) => (
    <>
      <Typography size="caption" component="div">
        {t('currentYesPrediction')}: {yes}
      </Typography>
      <Typography size="caption" component="div">
        {t('participants')}: {participants}
      </Typography>
    </>
  );
  const { marketAddress } = useMarketPathParams();
  const { data: marketList, isLoading } = useQuery<MarketList, AxiosError, MarketList>(
    `contractQuestions-${marketAddress}`,
    async () => {
      const metadata = await getQuestions(marketAddress!, 1000);
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
          return acc;
        },
        {
          auctionOpen: {},
          marketOpen: {},
          marketClosed: {},
        } as MarketList,
      );
      marketAddress && (await initMarketContract(marketAddress));
      const auctionData =
        marketHashes.auction.length > 0 && (await getAuctionData(marketHashes.auction));
      if (auctionData !== false && newMarketList) {
        Object.keys(auctionData).forEach((hash: string) => {
          const qData = metadata?.find((o) => o.hash === hash);
          const propsData = newMarketList?.auctionOpen[hash];
          const newData = auctionData[hash];
          newMarketList.auctionOpen[hash] = {
            ...propsData,
            onClick: () =>
              history.push(`/market/${marketAddress}/question/${hash}/submit-bid`, {
                ...qData,
                ...newData,
              }),
            content: <AuctionInfo {...newData} />,
          };
        });
      }
      return newMarketList;
    },
  );

  const getPageTitle = (): string | undefined => {
    if (ENABLE_SAME_MARKETS || ENABLE_SIMILAR_MARKETS) {
      return marketAddress;
    }
  };

  const title = getPageTitle();
  return (
    <MainPage title={title ? t(`${title}`) : undefined}>
      {isLoading && <CircularProgress />}
      {marketList && (
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={state.auctions} onChange={handleChange} name="auctions" />}
            label={t('auctionOpen')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.allMarkets}
                onChange={handleChange}
                name="allMarkets"
                color="primary"
              />
            }
            label={t('allMarkets')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.openMarkets}
                onChange={handleChange}
                name="openMarkets"
                color="primary"
              />
            }
            label={t('openMarket')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.closedMarkets}
                onChange={handleChange}
                name="closedMarkets"
                color="primary"
              />
            }
            label={t('closedMarket')}
          />
        </FormGroup>
      )}
      {marketList && state.auctions && Object.entries(marketList.auctionOpen).length > 0 && (
        <Paper elevation={0}>
          <>
            <Typography component="span" size="h4">
              {t('auctionOpen')}
            </Typography>
            <Grid container spacing={1}>
              {Object.entries(marketList.auctionOpen).map(([hash, item]) => (
                <Grid item key={hash}>
                  <MarketCard {...item} />
                </Grid>
              ))}
            </Grid>
          </>
        </Paper>
      )}
      {marketList && state.openMarkets && Object.entries(marketList.marketOpen).length > 0 && (
        <Paper elevation={0}>
          <>
            <Typography component="span" size="h4">
              {t('openMarket')}
            </Typography>
            <Grid container spacing={1}>
              {Object.entries(marketList.marketOpen).map(([hash, item]) => (
                <Grid item key={hash}>
                  <MarketCard {...item} />
                </Grid>
              ))}
            </Grid>
          </>
        </Paper>
      )}
      {marketList && state.closedMarkets && Object.entries(marketList.marketClosed).length > 0 && (
        <Paper elevation={0}>
          <>
            <Typography component="span" size="h4">
              {t('closedMarket')}
            </Typography>
            <Grid container spacing={1}>
              {Object.entries(marketList.marketClosed).map(([hash, item]) => (
                <Grid item key={hash}>
                  <MarketCard {...item} />
                </Grid>
              ))}
            </Grid>
          </>
        </Paper>
      )}
    </MainPage>
  );
};

export const MarketPage = withTranslation(['common'])(MarketPageComponent);
