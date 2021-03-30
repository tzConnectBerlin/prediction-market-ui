import {
  Grid,
  Paper,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';
import { initMarketContract } from '../../../contracts/Market';
import { AuctionData, QuestionStateType } from '../../../interfaces';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography';
import { ENABLE_SAME_MARKETS, ENABLE_SIMILAR_MARKETS } from '../../../utils/globals';
import { useMarketPathParams } from '../../../hooks/market';
import { MarketCardProps, MarketCard } from '../../molecules/MarketCard';
import { RootState } from '../../../redux/rootReducer';
import { filterSlice } from '../../../redux/slices/marketFilter';
import { toAuctionData } from '../../../api/mdw';
import { roundToTwo } from '../../../utils/math';
import { useWallet } from '../../../wallet/hooks';
import { useContractQuestions, useIPFSData, useLedgerBalances } from '../../../api/queries';

type MarketPageProps = WithTranslation;

interface MarketList {
  auctionOpen: { [key: string]: MarketCardProps };
  marketOpen: { [key: string]: MarketCardProps };
  marketClosed: { [key: string]: MarketCardProps };
}

interface ExtraDataCard extends Partial<AuctionData> {
  auction?: boolean;
  liquidity?: number;
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

  const ExtraMarketContent: React.FC<ExtraDataCard> = ({
    yes,
    no,
    auction,
    participants,
    liquidity,
  }) => (
    <>
      <Typography size="caption" component="div">
        {t(auction ? 'currentYesPrediction' : 'Yes')}: {roundToTwo(yes!)}
      </Typography>
      {!auction && (
        <Typography size="caption" component="div">
          {t('No')}: {roundToTwo(no!)}
        </Typography>
      )}
      {!auction && liquidity ? (
        <Typography size="caption" component="div">
          {t('marketLiquidity')}: {roundToTwo(liquidity)}
        </Typography>
      ) : undefined}
      {auction && (
        <Typography size="caption" component="div">
          {t('participants')}: {participants}
        </Typography>
      )}
    </>
  );
  const { marketAddress } = useMarketPathParams();
  const { data: marketData, isLoading: marketDataLoading } = useContractQuestions();
  const { data: ipfsMetadata, isLoading: ipfsDataLoading } = useIPFSData(marketData);
  const { data: ledgerData } = useLedgerBalances();
  const marketList =
    ipfsMetadata &&
    marketData &&
    ipfsMetadata.reduce(
      (acc, questionData) => {
        const { question, auctionEndDate, marketCloseDate, hash, iconURL } = questionData;
        const yesHolders =
          ledgerData &&
          marketData[hash].tokens.yes_token_id &&
          ledgerData[marketData[hash].tokens.yes_token_id]
            ? Object.keys(ledgerData[marketData[hash].tokens.yes_token_id])
            : [];
        const noHolders =
          ledgerData &&
          marketData[hash].tokens.no_token_id &&
          ledgerData[marketData[hash].tokens.no_token_id]
            ? Object.keys(ledgerData[marketData[hash].tokens.no_token_id])
            : [];
        const participants = [...yesHolders, ...noHolders];
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
                participants,
              }),
            content: <ExtraMarketContent {...auctionData} auction />,
          };
        } else {
          const qData = ipfsMetadata.find((o) => o.hash === hash);
          const yes: number = marketData[hash].price_yes
            ? roundToTwo(Number(marketData[hash].price_yes))
            : 0.5;
          const no: number = yes ? 1 - yes : 0.5;
          let liquidity = 0;
          if (
            Object.keys(marketData[hash].state).includes(
              QuestionStateType.questionAuctionWithdrawOpen,
            )
          ) {
            const yesTokens =
              marketAddress && typeof ledgerData !== 'undefined'
                ? ledgerData[marketData[hash].tokens.yes_token_id][marketAddress]
                : 0;
            const noTokens =
              marketAddress && typeof ledgerData !== 'undefined'
                ? ledgerData[marketData[hash].tokens.yes_token_id][marketAddress]
                : 0;
            liquidity = new BigNumber(yesTokens).plus(noTokens).shiftedBy(-18).toNumber();
          }
          const newProps = {
            ...marketProps,
            onClick: () =>
              history.push(`/market/${marketAddress}/question/${hash}`, {
                ...qData,
                ...marketData[hash],
                participants,
              }),
            content: <ExtraMarketContent yes={yes} no={no} liquidity={liquidity} />,
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
                  display: filterData.onlyMyMarkets
                    ? myMarkets.has(hash)
                      ? 'block'
                      : 'none'
                    : 'block',
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
                  display: filterData.onlyMyMarkets
                    ? myMarkets.has(hash)
                      ? 'block'
                      : 'none'
                    : 'block',
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
                  display: filterData.onlyMyMarkets
                    ? myMarkets.has(hash)
                      ? 'block'
                      : 'none'
                    : 'block',
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
