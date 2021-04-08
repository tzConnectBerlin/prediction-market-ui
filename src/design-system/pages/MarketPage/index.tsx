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
import { AuctionData, QuestionStateType, TokenType } from '../../../interfaces';
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
  winning?: number;
  answer?: TokenType;
  userYesBal?: number;
  userNoBal?: number;
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
    winning,
    answer,
    userNoBal,
    userYesBal,
  }) => (
    <>
      <Typography size="caption" component="div">
        {auction ? t('currentYesPrediction') : `${t('Yes')} ${t('price')}`}: {roundToTwo(yes!)}
      </Typography>
      {!auction && (
        <Typography size="caption" component="div">
          {`${t('No')} ${t('price')}`}: {roundToTwo(no!)}
        </Typography>
      )}
      {!auction && (
        <>
          {userYesBal ? (
            <Typography size="caption" component="div">
              {t('userYesBal')}: {roundToTwo(userYesBal)}
            </Typography>
          ) : undefined}
          {userNoBal ? (
            <Typography size="caption" component="div">
              {t('userNoBal')}: {roundToTwo(userNoBal)}
            </Typography>
          ) : undefined}
        </>
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
      {answer ? (
        <Typography size="caption" component="div">
          {t('answer')}: {t(answer)}
        </Typography>
      ) : undefined}
      {typeof winning !== 'undefined' && winning >= 0 ? (
        <Typography size="caption" component="div">
          {t('expectedWinnings')}: {roundToTwo(winning)}
        </Typography>
      ) : undefined}
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
          auctionCloseText: t('auction'),
          marketCloseText: t('market'),
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
          const auctionData = toAuctionData(marketData[hash]);
          acc.auctionOpen[hash] = {
            ...marketProps,
            onClick: () =>
              history.push(`/market/${marketAddress}/question/${hash}/submit-bid`, {
                ...questionData,
                ...marketData[hash],
                participants,
              }),
            content: <ExtraMarketContent {...auctionData} auction />,
          };
        } else {
          const yes: number = marketData[hash].price_yes
            ? roundToTwo(Number(marketData[hash].price_yes))
            : 0.5;
          const no: number = yes ? 1 - yes : 0.5;
          let liquidity = 0;
          let originalLiquidity = new BigNumber(0);
          if (
            Object.keys(marketData[hash].state).includes(
              QuestionStateType.questionAuctionWithdrawOpen,
            ) ||
            Object.keys(marketData[hash].state).includes(QuestionStateType.questionMarketClosed)
          ) {
            const lqtValues =
              typeof ledgerData !== 'undefined'
                ? Object.values(ledgerData[marketData[hash].tokens.lqt_token_id])
                : [];
            originalLiquidity = lqtValues.reduce((tokenAcc, item) => {
              return tokenAcc.plus(item);
            }, new BigNumber(0));
            liquidity = originalLiquidity.shiftedBy(-18).toNumber();
          }
          const userYesBal = userAddress
            ? new BigNumber(
                marketAddress &&
                typeof ledgerData !== 'undefined' &&
                ledgerData[marketData[hash].tokens.yes_token_id!][userAddress]
                  ? ledgerData[marketData[hash].tokens.yes_token_id!][userAddress]
                  : 0,
              )
                .shiftedBy(-18)
                .toNumber()
            : undefined;
          const userNoBal = userAddress
            ? new BigNumber(
                marketAddress &&
                typeof ledgerData !== 'undefined' &&
                ledgerData[marketData[hash].tokens.no_token_id!][userAddress]
                  ? ledgerData[marketData[hash].tokens.no_token_id!][userAddress]
                  : 0,
              )
                .shiftedBy(-18)
                .toNumber()
            : undefined;
          const newProps = {
            ...marketProps,
            onClick: () =>
              history.push(`/market/${marketAddress}/question/${hash}`, {
                ...questionData,
                ...marketData[hash],
                participants,
              }),
            content: (
              <ExtraMarketContent
                yes={yes}
                no={no}
                liquidity={liquidity}
                userNoBal={userNoBal}
                userYesBal={userYesBal}
              />
            ),
          };
          if (
            marketProps.auctionTimestamp < currentDate &&
            marketProps.marketTimestamp > currentDate
          ) {
            acc.marketOpen[hash] = newProps;
          } else if (currentDate >= marketProps.marketTimestamp) {
            marketProps.marketCloseText = t('market');
            const answer =
              marketData[hash].winning_token === marketData[hash].tokens.yes_token_id
                ? TokenType.yes
                : TokenType.no;
            if (marketData[hash].winning_token && marketData[hash].winning_token !== 'None') {
              const contractTokenBalance = new BigNumber(
                marketAddress &&
                typeof ledgerData !== 'undefined' &&
                ledgerData[marketData[hash].winning_token!][marketAddress]
                  ? ledgerData[marketData[hash].winning_token!][marketAddress]
                  : 0,
              );
              const userTokenBalance = new BigNumber(
                userAddress &&
                marketAddress &&
                typeof ledgerData !== 'undefined' &&
                ledgerData[marketData[hash].winning_token!][userAddress]
                  ? ledgerData[marketData[hash].winning_token!][userAddress]
                  : 0,
              );
              const userLQTBalance = new BigNumber(
                userAddress &&
                marketAddress &&
                typeof ledgerData !== 'undefined' &&
                ledgerData[marketData[hash].tokens.lqt_token_id!][userAddress]
                  ? ledgerData[marketData[hash].tokens.lqt_token_id!][userAddress]
                  : 0,
              );
              const userLQTWinnings = contractTokenBalance
                .multipliedBy(userLQTBalance)
                .dividedBy(originalLiquidity);
              const userTotal = userTokenBalance.plus(userLQTWinnings).shiftedBy(-18).toNumber();
              const newClosedProps = {
                ...marketProps,
                ...newProps,
                onClick: () =>
                  history.push(`/market/${marketAddress}/question/${hash}`, {
                    ...questionData,
                    ...marketData[hash],
                    participants,
                    answer,
                    winning: userTotal,
                  }),
                content: (
                  <ExtraMarketContent
                    yes={yes}
                    no={no}
                    userNoBal={userNoBal}
                    userYesBal={userYesBal}
                    liquidity={liquidity}
                    winning={userTotal}
                    answer={answer}
                  />
                ),
              };
              acc.marketClosed[hash] = newClosedProps;
            } else {
              acc.marketClosed[hash] = newProps;
            }
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
