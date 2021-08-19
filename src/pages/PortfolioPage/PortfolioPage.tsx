import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { Grid } from '@material-ui/core';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import { PortfolioTable } from '../../design-system/organisms/PortfolioTable';
import { Row } from '../../design-system/organisms/PortfolioTable/PortfolioTable';
import { MainPage } from '../MainPage/MainPage';
import { Typography } from '../../design-system/atoms/Typography';
import { useAllBetsByAddress, useLedgerData, useMarkets } from '../../api/queries';
import { findBetByMarketId, getAuctions, getMarkets } from '../../api/utils';
import { Loading } from '../../design-system/atoms/Loading';
import { Market, PortfolioAuction, PortfolioMarket } from '../../interfaces';
import {
  getMarketStateLabel,
  getNoTokenId,
  getTokenQuantityById,
  getYesTokenId,
} from '../../utils/misc';
import { claimWinnings } from '../../contracts/Market';
import { logError } from '../../logger/logger';
import { roundToTwo, tokenDivideDown } from '../../utils/math';
import {
  PortfolioSummary,
  Position,
} from '../../design-system/organisms/PortfolioSummary/PortfolioSummary';

type PortfolioPageProps = WithTranslation;

const EmptyBoxStyled = styled.div`
  padding: 10rem 0;
  text-align: center;
`;

const marketHeading: string[] = ['Market', 'Holdings', 'Price', 'Total Value'];
const auctionHeading: string[] = ['Market', 'Probability', 'Amount'];

export const PortfolioPageComponent: React.FC<PortfolioPageProps> = ({ t }) => {
  const history = useHistory();
  const { data, isLoading } = useMarkets();
  const { activeAccount, connected } = useWallet();
  const { addToast } = useToasts();
  const [markets, setMarkets] = useState<Row[] | null>(null);
  const [auctions, setAuctions] = useState<Row[] | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [, setCloseMarketId] = React.useState('');
  const { data: allBets } = useAllBetsByAddress(activeAccount?.address);
  const { data: ledgers } = useLedgerData();

  const handleClose = () => setCloseMarketId('');

  const handleClaimWinnings = React.useCallback(
    async (marketId: string) => {
      if (activeAccount?.address && marketId) {
        try {
          const hash = await claimWinnings(marketId);
          if (hash) {
            handleClose();
          }
        } catch (error) {
          logError(error);
          const errorText = error?.data?.[1]?.with?.string || t('txFailed');
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
      const marketPosition: Position = { type: 'trading', value: 0, currency: 'PMM' };
      market.forEach(async (item) => {
        const cardLink = item.question.toLowerCase().replaceAll(' ', '-').replaceAll('?', '');
        const noToken = getNoTokenId(item.marketId);
        const yesToken = getYesTokenId(item.marketId);
        const tokens = ledgers?.filter(
          (o) =>
            o.owner === activeAccount?.address &&
            (o.tokenId === String(noToken) || o.tokenId === String(yesToken)),
        );
        if (tokens) {
          const yesHoldings = roundToTwo(tokenDivideDown(getTokenQuantityById(tokens, yesToken)));
          const noHoldings = roundToTwo(tokenDivideDown(getTokenQuantityById(tokens, noToken)));
          const yesTotal = roundToTwo(yesHoldings * item.yesPrice);
          const noTotal = roundToTwo(noHoldings * roundToTwo(1 - item.yesPrice));

          const filterLoser = (values: string[]) =>
            item.winningPrediction
              ? item.winningPrediction === 'yes'
                ? values[0]
                : values[1]
              : values;

          const columns: PortfolioMarket = {
            question: [
              item.question,
              getMarketStateLabel(item, t) === 'Closed'
                ? `Resolved: ${item.winningPrediction}`.toUpperCase()
                : undefined,
            ],
            holdings: filterLoser([`${yesHoldings} Yes`, `${noHoldings} No `]),
            price: filterLoser([`${item.yesPrice} PMM`, `${roundToTwo(1 - item.yesPrice)} PMM`]),
            total: filterLoser(
              tokens?.length ?? -1 > 0
                ? [`${yesTotal} PMM`, `${noTotal} PMM`]
                : [`${item.yesPrice} PMM`, `${roundToTwo(1 - item.yesPrice)} PMM`],
            ),
          };
          marketPosition.value = roundToTwo(marketPosition.value + noTotal + yesTotal);
          if (item.winningPrediction) {
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
      setPositions((oldPositions) => [...oldPositions, marketPosition]);
      return MarketRowList;
    },
    [activeAccount, t, ledgers],
  );

  const setAuctionRows = React.useCallback(
    (market: Market[]): Row[] => {
      const AuctionRowList: Row[] = [];
      const auctionPosition: Position = { type: 'liquidity', value: 0, currency: 'PMM' };
      market.forEach((item) => {
        const cardLink = item.question.toLowerCase().replaceAll(' ', '-').replaceAll('?', '');
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
            columns.quantity = `${liquidityTotal} PMM`;
            AuctionRowList.push({
              columns: Object.values(columns),
              handleClick: () => history.push(`/market/${item.marketId}/${cardLink}`),
            });
            auctionPosition.value = roundToTwo(auctionPosition.value + liquidityTotal);
          }
        }
      });
      setPositions((oldPositions) => [...oldPositions, auctionPosition]);
      return AuctionRowList;
    },
    [activeAccount, t, allBets],
  );

  useEffect(() => {
    if (data) {
      const allMarkets = filteredMarket(getMarkets(data));
      const allAuctions = getAuctions(data);
      setMarkets(setMarketRows(allMarkets));
      setAuctions(setAuctionRows(allAuctions));
    }
  }, [data]);

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
              <Grid item>
                <PortfolioTable title="Trading Positions" heading={marketHeading} rows={markets} />
              </Grid>
            )}
            {auctions && auctions.length > 0 && (
              <Grid item>
                <PortfolioTable
                  title="Liquidity Positions"
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
