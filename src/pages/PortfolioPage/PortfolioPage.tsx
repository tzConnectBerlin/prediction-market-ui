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
import {
  Bet,
  Market,
  PortfolioAuction,
  PortfolioMarket,
  PortfolioRewards,
  Role,
} from '../../interfaces';
import { getMarketStateLabel, getNoTokenId, getYesTokenId } from '../../utils/misc';
import {
  claimWinnings,
  closeAuction,
  resolveMarket,
  withdrawAuction,
} from '../../contracts/Market';
import { logError } from '../../logger/logger';
import { ResolveMarketModal } from '../../design-system/organisms/ResolveMarketModal';
import { roundToTwo, tokenDivideDown } from '../../utils/math';

type PortfolioPageProps = WithTranslation;

const EmptyBoxStyled = styled.div`
  padding: 10rem 0;
  text-align: center;
`;

const marketHeading: string[] = ['Market', 'Holdings', 'Price', 'Total Value'];
const auctionHeading: string[] = ['Market', 'Probability', 'Amount'];
const rewardHeading: string[] = ['Market', 'Role', 'Amount'];

export const PortfolioPageComponent: React.FC<PortfolioPageProps> = ({ t }) => {
  const history = useHistory();
  const { data, isLoading } = useMarkets();
  const { activeAccount, connected } = useWallet();
  const { addToast } = useToasts();
  const [markets, setMarkets] = useState<Row[] | null>(null);
  const [auctions, setAuctions] = useState<Row[] | null>(null);
  const [rewards, setRewards] = useState<Row[] | null>(null);
  const [closeMarketId, setCloseMarketId] = React.useState('');
  const { data: allBets } = useAllBetsByAddress(activeAccount?.address);
  const { data: ledgers } = useLedgerData();
  const handleOpen = (marketId: string) => setCloseMarketId(marketId);
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
          const errorText = error?.data[1]?.with?.string || t('txFailed');
          addToast(errorText, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      }
    },
    [activeAccount?.address, addToast, t],
  );

  const handleResolveMarket = React.useCallback(
    async (values: any) => {
      if (activeAccount?.address && closeMarketId) {
        try {
          await resolveMarket(closeMarketId, values.outcome);
        } catch (error) {
          logError(error);
          const errorText = error?.data[1]?.with?.string || t('txFailed');
          addToast(errorText, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      }
    },
    [activeAccount?.address, addToast, closeMarketId, t],
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
      market.forEach((item) => {
        const cardLink = item.question.toLowerCase().replaceAll(' ', '-').replaceAll('?', '');
        const noToken = String(getNoTokenId(item.marketId));
        const yesToken = String(getYesTokenId(item.marketId));
        const tokens = ledgers?.filter(
          (o) =>
            o.owner === activeAccount?.address && (o.tokenId === noToken || o.tokenId === yesToken),
        );
        const holdingsYes = roundToTwo(Number.parseInt(tokens?.[0].quantity ?? '0', 10) / 1000000);
        const holdingsNo = roundToTwo(Number.parseInt(tokens?.[1].quantity ?? '0', 10) / 1000000);

        const columns: PortfolioMarket = {
          question: [
            item.question,
            getMarketStateLabel(item, t) === 'Closed' ? 'Closed' : undefined,
          ],
          holdings: [`${holdingsYes} Yes`, `${holdingsNo} No `],
          price: [`${item.yesPrice} PMM`, `${roundToTwo(1 - item.yesPrice)} PMM`],
          total:
            tokens?.length ?? -1 > 0
              ? [
                  `${roundToTwo(holdingsYes * item.yesPrice)} PMM`,
                  `${roundToTwo(holdingsNo * roundToTwo(1 - item.yesPrice))} PMM`,
                ]
              : [`${item.yesPrice} PMM`, `${roundToTwo(1 - item.yesPrice)} PMM`],
        };

        if (columns.question[1] === 'Closed') {
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
      });
      return MarketRowList;
    },
    [activeAccount, t, ledgers],
  );

  const setAuctionRows = React.useCallback(
    (market: Market[]): Row[] => {
      const AuctionRowList: Row[] = [];
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
            columns.probability = `${currentBet.probability} %`;
            columns.quantity = `${tokenDivideDown(currentBet.quantity)} PMM`;
            AuctionRowList.push({
              columns: Object.values(columns),
              handleClick: () => history.push(`/market/${item.marketId}/${cardLink}`),
            });
          }
        }
      });
      return AuctionRowList;
    },
    [activeAccount, t, allBets],
  );
  const setRewardRows = React.useCallback(
    (market: Market[]): Row[] => {
      const RewardRowList: Row[] = [];
      market.forEach((item) => {
        console.log(item);
        const cardLink = item.question.toLowerCase().replaceAll(' ', '-').replaceAll('?', '');
        const columns: PortfolioRewards = {
          question: item.question,
          role: item.adjudicator === activeAccount?.address ? Role.adjudicator : Role.participant,
          quantity: '--',
        };
        if (activeAccount?.address && allBets) {
          const currentBet = findBetByMarketId(allBets, item.marketId);
          if (currentBet) {
            columns.quantity = `${tokenDivideDown(currentBet.quantity)} PMM`;
            RewardRowList.push({
              columns: Object.values(columns),
              handleClick: () => history.push(`/market/${item.marketId}/${cardLink}`),
            });
          }
        }
      });
      return RewardRowList;
    },
    [activeAccount, t, allBets],
  );
  useEffect(() => {
    if (data) {
      const allMarkets = filteredMarket(getMarkets(data));
      const allAuctions = getAuctions(data);
      setAuctions(setAuctionRows(allAuctions));
      setMarkets(setMarketRows(allMarkets));
      setRewards(setRewardRows(allAuctions));
    }
  }, [data]);

  if (!connected) {
    history.push('/');
    return <></>;
  }

  return (
    <MainPage>
      <ResolveMarketModal
        open={!!closeMarketId}
        handleClose={handleClose}
        handleSubmit={handleResolveMarket}
      />
      {isLoading && <Loading />}
      {data && (
        <>
          <Typography component="h1" size="h2" paddingY={5}>
            {t('portfolio:myPortfolio')}
          </Typography>
          <Grid container spacing={3} direction="column">
            {markets && markets.length > 0 && (
              <Grid item>
                <PortfolioTable title="Market" heading={marketHeading} rows={markets} />
              </Grid>
            )}
            {auctions && auctions.length > 0 && (
              <Grid item>
                <PortfolioTable title="Auction" heading={auctionHeading} rows={auctions} />
              </Grid>
            )}
            {rewards && rewards.length > 0 && (
              <Grid item>
                <PortfolioTable title="Auction" heading={rewardHeading} rows={rewards} />
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
