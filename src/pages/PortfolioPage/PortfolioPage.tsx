import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { Grid, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import { PortfolioTable } from '../../design-system/organisms/PortfolioTable';
import { Row } from '../../design-system/organisms/PortfolioTable/PortfolioTable';
import { MainPage } from '../MainPage/MainPage';
import { Typography } from '../../design-system/atoms/Typography';
import {
  useAllBetsByAddress,
  useLedgerData,
  useMarkets,
  useTotalSupplyForMarkets,
} from '../../api/queries';
import { findBetByMarketId, getMarkets } from '../../api/utils';
import { Loading } from '../../design-system/atoms/Loading';
import { Bet, Market, PortfolioAuction, PortfolioMarket, Role, TokenType } from '../../interfaces';
import {
  getLQTTokenId,
  getMarketLocalStorage,
  getMarketStateLabel,
  getNoTokenId,
  getRoundedDividedTokenQuantityById,
  getTokenQuantityById,
  getYesTokenId,
  questionToURL,
} from '../../utils/misc';
import { claimWinnings, withdrawAuction } from '../../contracts/Market';
import { logError } from '../../logger/logger';
import { roundToTwo, roundTwoAndTokenDown, tokenDivideDown } from '../../utils/math';
import {
  PortfolioSummary,
  Position,
} from '../../design-system/organisms/PortfolioSummary/PortfolioSummary';
import { CURRENCY_SYMBOL } from '../../globals';
import { calculatePoolShare } from '../../contracts/MarketCalculations';
import { useConditionalWallet } from '../../wallet/hooks';

type PortfolioPageProps = WithTranslation;

const EmptyBoxStyled = styled.div`
  padding: 10rem 0;
  text-align: center;
`;

const marketHeading: string[] = ['Market', 'Holdings', 'Price (Weekly ▲)', 'Total Value'];
const auctionHeading: string[] = ['Market', 'Probability', 'Amount'];

export const PortfolioPageComponent: React.FC<PortfolioPageProps> = ({ t }) => {
  const history = useHistory();
  const { data, isLoading } = useMarkets();
  const { activeAccount, connected } = useConditionalWallet();
  const theme = useTheme();
  const { addToast } = useToasts();
  const [markets, setMarkets] = useState<Row[] | null>(null);
  const [auctions, setAuctions] = useState<Row[] | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [, setCloseMarketId] = React.useState('');
  const { data: allBets } = useAllBetsByAddress(activeAccount?.address);
  const ledgers = useLedgerData();
  const { data: auctionSupply } = useTotalSupplyForMarkets(data);
  const isAuctionParticipant = (marketId: string, bets: Bet[] = []): boolean => {
    const marketBets = bets.filter((o) => o.marketId === marketId);
    return marketBets.length > 0;
  };

  const handleClose = () => setCloseMarketId('');

  const handleClaimWinnings = React.useCallback(
    async (marketId: string) => {
      if (activeAccount?.address && marketId) {
        try {
          const hash = await claimWinnings(marketId);
          if (hash) {
            handleClose();
            addToast(t('txSubmitted'), {
              appearance: 'success',
              autoDismiss: true,
            });
          }
        } catch (error: any) {
          logError(error);
          const errorText = error?.data?.[1]?.with?.string || error?.description || t('txFailed');
          addToast(errorText, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      }
    },
    [activeAccount?.address, addToast, t],
  );

  const handleWithdrawAuction = React.useCallback(
    async (marketId: string) => {
      if (activeAccount?.address && marketId) {
        try {
          await withdrawAuction(marketId);
          getMarketLocalStorage(true, marketId, 'portfolio', 'true');
        } catch (error: any) {
          logError(error);
          const errorText = error?.data?.[1]?.with?.string || error?.description || t('txFailed');
          addToast(errorText, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      }
    },
    [activeAccount?.address, addToast, t],
  );

  const filteredMarket = React.useCallback(
    (market: Market[]) => {
      return market.filter((item) => {
        if (activeAccount?.address) {
          if (item.adjudicator === activeAccount?.address) {
            return true;
          }
          if (ledgers) {
            const noToken = String(getNoTokenId(item.marketId));
            const yesToken = String(getYesTokenId(item.marketId));
            const tokens = ledgers.filter(
              (o) =>
                o.owner === activeAccount.address &&
                (o.tokenId === noToken || o.tokenId === yesToken),
            );
            return tokens.length > 0;
          }
        }
        return false;
      });
    },
    [ledgers, activeAccount],
  );

  const setMarketRows = React.useCallback(
    (market: Market[]): Row[] => {
      const MarketRowList: Row[] = [];
      const marketPosition: Position = {
        type: 'trading',
        value: 0,
        currency: CURRENCY_SYMBOL,
        weekly: '--',
      };
      market.forEach(async (item) => {
        const cardLink = questionToURL(item.question);
        const noToken = getNoTokenId(item.marketId);
        const yesToken = getYesTokenId(item.marketId);
        const tokens = ledgers?.filter(
          (o) =>
            o.owner === activeAccount?.address &&
            (o.tokenId === String(noToken) || o.tokenId === String(yesToken)),
        );
        if (tokens) {
          const weeklyChange = {
            yes: (
              <Typography
                component="span"
                color={
                  item.weekly?.tokenType === TokenType.yes
                    ? theme.palette.success.main
                    : theme.palette.error.main
                }
              >
                {' '}
                ({item.weekly?.tokenType === TokenType.yes ? '+' : '-'}
                {item.weekly?.change}%)
              </Typography>
            ),
            no: (
              <Typography
                component="span"
                color={
                  item.weekly?.tokenType === TokenType.no
                    ? theme.palette.success.main
                    : theme.palette.error.main
                }
              >
                {' '}
                ({item.weekly?.tokenType === TokenType.no ? '+' : '-'}
                {item.weekly?.change}%)
              </Typography>
            ),
          };
          const yesHoldings = getRoundedDividedTokenQuantityById(tokens, yesToken);
          const noHoldings = getRoundedDividedTokenQuantityById(tokens, noToken);
          const yesTotal = roundToTwo(yesHoldings * item.yesPrice);
          const noTotal = roundToTwo(noHoldings * roundToTwo(1 - item.yesPrice));
          const holdingWinner = item.winningPrediction === 'yes' ? !!yesHoldings : !!noHoldings;
          const role =
            item.adjudicator === activeAccount?.address ? Role.adjudicator : Role.participant;
          const status = getMarketStateLabel(item, t);
          const filterLoser = (values: any[]) =>
            item.winningPrediction
              ? item.winningPrediction === 'yes'
                ? values[0]
                : values[1]
              : values;

          const columns: PortfolioMarket = {
            question: [
              item.question,
              getMarketStateLabel(item, t) === 'Closed'
                ? t('portfolio:resolved', {
                    status: item.winningPrediction ? item.winningPrediction.toUpperCase() : 'error',
                  })
                : undefined,
            ],
            holdings: filterLoser([`${yesHoldings} Yes`, `${noHoldings} No `]),
            price: filterLoser([
              [
                `${roundToTwo(item.yesPrice)} ${CURRENCY_SYMBOL}`,
                item.weekly?.change ? weeklyChange.yes : null,
              ].filter(Boolean),
              [
                `${roundToTwo(1 - item.yesPrice)} ${CURRENCY_SYMBOL}`,
                item.weekly?.change ? weeklyChange.no : null,
              ].filter(Boolean),
            ]),
            total: filterLoser(
              tokens?.length ?? -1 > 0
                ? [`${yesTotal} ${CURRENCY_SYMBOL}`, `${noTotal} ${CURRENCY_SYMBOL}`]
                : [
                    `${item.yesPrice} ${CURRENCY_SYMBOL}`,
                    `${roundToTwo(1 - item.yesPrice)} ${CURRENCY_SYMBOL}`,
                  ],
            ),
          };
          marketPosition.value = roundToTwo(marketPosition.value + noTotal + yesTotal);
          if (yesHoldings === 0 && noHoldings === 0) {
            return;
          }
          if (
            (role === Role.participant || Role.adjudicator) &&
            status === 'Closed' &&
            isAuctionParticipant(item.marketId, allBets) &&
            !getMarketLocalStorage(false, item.marketId, 'portfolio')
          ) {
            MarketRowList.push({
              columns: Object.values(columns),
              rowAction: {
                label: t('portfolio:withdrawAuctionWin'),
                handleAction: () => handleWithdrawAuction(item.marketId),
              },
              handleClick: () => history.push(`/market/${item.marketId}/${cardLink}`),
            });
          } else if (item.winningPrediction && holdingWinner) {
            MarketRowList.push({
              columns: Object.values(columns),
              rowAction: {
                label: t('portfolio:claimWinnings'),
                handleAction: () => handleClaimWinnings(item.marketId),
              },
              handleClick: () => history.push(`/market/${item.marketId}/${cardLink}`),
            });
          } else {
            MarketRowList.push({
              columns: Object.values(columns),
              handleClick: () => history.push(`/market/${item.marketId}/${cardLink}`),
            });
          }
        }
      });
      setPositions((oldPositions) => {
        return oldPositions?.[0]?.value === marketPosition.value
          ? oldPositions
          : [marketPosition, oldPositions?.[1]];
      });
      return MarketRowList;
    },
    [
      ledgers,
      activeAccount?.address,
      theme.palette.success.main,
      theme.palette.error.main,
      t,
      allBets,
      handleWithdrawAuction,
      history,
      handleClaimWinnings,
    ],
  );

  const setAuctionRows = React.useCallback(
    (market: Market[]): Row[] => {
      const AuctionRowList: Row[] = [];
      const auctionPosition: Position = { type: 'liquidity', value: 0, currency: CURRENCY_SYMBOL };
      market.forEach(async (item) => {
        const noToken = getNoTokenId(item.marketId);
        const yesToken = getYesTokenId(item.marketId);
        const lqtToken = getLQTTokenId(item.marketId);
        const tokens = ledgers?.filter(
          (o) =>
            o.owner === activeAccount?.address &&
            (o.tokenId === String(lqtToken) ||
              o.tokenId === String(noToken) ||
              o.tokenId === String(yesToken)),
        );
        const role =
          item.adjudicator === activeAccount?.address ? Role.adjudicator : Role.participant;
        const status = getMarketStateLabel(item, t);
        const cardLink = questionToURL(item.question);
        const columns: PortfolioAuction = {
          question: item.question,
          probability: '--',
          quantity: '--',
        };

        if (activeAccount?.address && allBets) {
          const currentBet = findBetByMarketId(allBets, item.marketId);
          if (currentBet) {
            const liquidityTotal = tokenDivideDown(currentBet?.quantity);
            columns.probability = `${currentBet.probability} %`;
            columns.quantity = `${liquidityTotal} ${CURRENCY_SYMBOL}`;
            AuctionRowList.push({
              columns: Object.values(columns),
              handleClick: () => history.push(`/market/${item.marketId}/${cardLink}`),
              rowAction:
                (role === Role.participant || Role.adjudicator) &&
                (status === 'Active' || status === 'Closed') &&
                !getMarketLocalStorage(false, item.marketId, 'portfolio') &&
                isAuctionParticipant(item.marketId, allBets)
                  ? {
                      label: t('portfolio:withdrawAuctionWin'),
                      handleAction: () => handleWithdrawAuction(item.marketId),
                    }
                  : undefined,
            });
            auctionPosition.value = roundToTwo(auctionPosition.value + liquidityTotal);
          }
        }
        if (activeAccount?.address && tokens) {
          const yesPool = getTokenQuantityById(tokens, yesToken);
          const noPool = getTokenQuantityById(tokens, noToken);
          const tokenTotalSupply = auctionSupply?.find((i) => i.tokenId === lqtToken.toString());
          const lqtHoldings = getTokenQuantityById(tokens, lqtToken);
          if (lqtHoldings && tokenTotalSupply) {
            const poolShare = calculatePoolShare(
              lqtHoldings,
              Number(tokenTotalSupply?.totalSupply) ?? 0,
            );
            const totalValue =
              poolShare * yesPool * item.yesPrice + poolShare * noPool * (1 - item.yesPrice);
            const liquidityTotal = roundTwoAndTokenDown(totalValue);
            columns.probability = '--';
            columns.quantity = `${liquidityTotal} ${CURRENCY_SYMBOL}`;
            AuctionRowList.push({
              columns: Object.values(columns),
              handleClick: () => history.push(`/market/${item.marketId}/${cardLink}`),
              rowAction:
                (role === Role.participant || Role.adjudicator) &&
                (status === 'Active' || status === 'Closed') &&
                !getMarketLocalStorage(false, item.marketId, 'portfolio') &&
                isAuctionParticipant(item.marketId, allBets)
                  ? {
                      label: t('portfolio:withdrawAuctionWin'),
                      handleAction: () => handleWithdrawAuction(item.marketId),
                    }
                  : undefined,
            });
            auctionPosition.value = roundToTwo(auctionPosition.value + liquidityTotal);
          }
        }
      });
      setPositions((oldPositions) => {
        return oldPositions?.[1]?.value === auctionPosition.value
          ? oldPositions
          : [oldPositions?.[0], auctionPosition];
      });
      return AuctionRowList;
    },
    [ledgers, activeAccount?.address, t, allBets, history, handleWithdrawAuction, auctionSupply],
  );

  useEffect(() => {
    if (data) {
      const allMarkets = filteredMarket(getMarkets(data));
      setMarkets(setMarketRows(allMarkets));
      setAuctions(setAuctionRows(data));
    }
  }, [data, filteredMarket, setAuctionRows, setMarketRows]);

  if (!connected) {
    history.push('/');
    return <></>;
  }
  return (
    <MainPage>
      {isLoading && <Loading />}
      {data && (
        <>
          <Typography component="h1" size="h2" paddingY={5}>
            {t('portfolio:myPortfolio')}
          </Typography>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <PortfolioSummary positions={positions} />
            </Grid>
            {markets && markets.length > 0 && (
              <Grid item xs={12} width="100%">
                <PortfolioTable
                  title={t('portfolio:trading')}
                  heading={marketHeading}
                  rows={markets}
                />
              </Grid>
            )}
            {auctions && auctions.length > 0 && (
              <Grid item xs={12} width="100%">
                <PortfolioTable
                  title={t('portfolio:liquidity')}
                  heading={auctionHeading}
                  rows={auctions}
                />
              </Grid>
            )}
          </Grid>
          {(!markets || markets.length === 0) && (!auctions || auctions.length === 0) && (
            <EmptyBoxStyled>
              <Typography component="h3" size="h2">
                {t('portfolio:notActive')}
              </Typography>
              <div>
                <Link to="/">{t('portfolio:browseMarket')}</Link>{' '}
                {t('portfolio:toStartParticipant')}
              </div>
            </EmptyBoxStyled>
          )}
        </>
      )}
    </MainPage>
  );
};

export const PortfolioPage = withTranslation(['common', 'portfolio'])(PortfolioPageComponent);
