import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '@tz-contrib/react-wallet-provider';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { Grid, Paper, Theme, useMediaQuery, useTheme } from '@material-ui/core';
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
  Market,
  MarketCardStatistic,
  PortfolioAuction,
  PortfolioMarket,
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
import { tokenDivideDown } from '../../utils/math';
import { MarketCard } from '../../design-system/organisms/MarketCard';

type PortfolioPageProps = WithTranslation;

interface PaperStyledProps {
  theme: Theme;
}

const PaperStyled = styled(Paper)<PaperStyledProps>`
  padding: 2rem;
  h1 {
    color: ${({ theme }) => theme.palette.primary.main};
    margin-bottom: 0.8rem;
  }
`;

const EmptyBoxStyled = styled.div`
  padding: 10rem 0;
  text-align: center;
`;

const marketHeading: string[] = ['Market', 'Status', 'Role', ''];
const auctionHeading: string[] = ['Auction', 'End Date', 'Role', 'Probability', 'Quantity', ''];

export const PortfolioPageComponent: React.FC<PortfolioPageProps> = ({ t }) => {
  const theme = useTheme();
  const history = useHistory();
  const { data, isLoading } = useMarkets();
  const { activeAccount, connected } = useWallet();
  const { addToast } = useToasts();
  const [markets, setMarkets] = useState<Row[] | null>(null);
  const [auctions, setAuctions] = useState<Row[] | null>(null);
  const [closeMarketId, setCloseMarketId] = React.useState('');
  const { data: allBets } = useAllBetsByAddress(activeAccount?.address);
  const { data: ledgers } = useLedgerData();
  const handleOpen = (marketId: string) => setCloseMarketId(marketId);
  const handleClose = () => setCloseMarketId('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClaimWinnings = async (marketId: string) => {
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
  };

  const handleWithdrawAuction = async (marketId: string) => {
    if (activeAccount?.address && marketId) {
      try {
        await withdrawAuction(marketId);
      } catch (error) {
        logError(error);
        const errorText = error?.data[1]?.with?.string || t('txFailed');
        addToast(errorText, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  };

  const handleResolveMarket = async (values: any) => {
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
  };

  const handleCloseAuction = async (marketId: string) => {
    if (activeAccount?.address && marketId) {
      try {
        await closeAuction(marketId, true);
      } catch (error) {
        logError(error);
        const errorText = error?.data[1]?.with?.string || t('txFailed');
        addToast(errorText, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  };

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
        const columns: PortfolioMarket = {
          question: item.question,
          status: getMarketStateLabel(item, t),
          role: item.adjudicator === activeAccount?.address ? Role.adjudicator : Role.participant,
        };
        if (columns.role === Role.adjudicator && columns.status === 'Active') {
          MarketRowList.push({
            columns: Object.values(columns),
            rowAction: {
              label: t('portfolio:closeMarket'),
              handleAction: () => handleOpen(item.marketId),
            },
            handleClick: () => history.push(`/market/${item.marketId}`),
          });
        } else if (columns.role === Role.participant && columns.status === 'Active') {
          MarketRowList.push({
            columns: Object.values(columns),
            rowAction: {
              label: t('portfolio:withdrawAuctionWin'),
              handleAction: () => handleWithdrawAuction(item.marketId),
            },
            handleClick: () => history.push(`/market/${item.marketId}`),
          });
        } else if (columns.status === 'Closed') {
          MarketRowList.push({
            columns: Object.values(columns),
            rowAction: {
              label: t('portfolio:claimWinnings'),
              handleAction: () => handleClaimWinnings(item.marketId),
            },
            handleClick: () => history.push(`/market/${item.marketId}`),
          });
        } else {
          MarketRowList.push({
            columns: Object.values(columns),
            handleClick: () => history.push(`/market/${item.marketId}`),
          });
        }
      });
      return MarketRowList;
    },
    [activeAccount, t],
  );

  const setAuctionRows = React.useCallback(
    (market: Market[]): Row[] => {
      const AuctionRowList: Row[] = [];
      market.forEach((item) => {
        const columns: PortfolioAuction = {
          question: item.question,
          endDate: getMarketStateLabel(item, t),
          role: item.adjudicator === activeAccount?.address ? Role.adjudicator : Role.participant,
          probability: '--',
          quantity: '--',
        };
        if (activeAccount?.address && allBets) {
          const currentBet = findBetByMarketId(allBets, item.marketId);
          if (currentBet) {
            columns.probability = `${currentBet.probability} %`;
            columns.quantity = `${tokenDivideDown(currentBet.quantity)} $`;
            if (columns.role === Role.adjudicator) {
              AuctionRowList.push({
                columns: Object.values(columns),
                rowAction: {
                  label: t('portfolio:closeAuction'),
                  handleAction: () => handleCloseAuction(item.marketId),
                },
                handleClick: () => history.push(`/auction/${item.marketId}`),
              });
            } else {
              AuctionRowList.push({
                columns: Object.values(columns),
                handleClick: () => history.push(`/auction/${item.marketId}`),
              });
            }
          }
        }
      });
      return AuctionRowList;
    },
    [activeAccount, t, allBets],
  );

  useEffect(() => {
    if (data) {
      const allMarkets = filteredMarket(getMarkets(data));
      const allAuctions = getAuctions(data);
      setAuctions(setAuctionRows(allAuctions));
      setMarkets(setMarketRows(allMarkets));
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
          <Typography component="h1" size="2rem" paddingY={5}>
            {t('portfolio:myPortfolio')}
          </Typography>
          <Grid container spacing={3} direction="column">
            {/* <Grid item container spacing={3}>
            <Grid item xs={12} sm={4}>
              <PaperStyled theme={theme}>
                <Typography component="h1" size="body2">
                  {t('portfolio:totalValue')}
                </Typography>
                295$
              </PaperStyled>
            </Grid>
            <Grid item xs={12} sm={4}>
              <PaperStyled theme={theme}>
                <Typography component="h1" size="body2">
                  {t('portfolio:marketPosition')}
                </Typography>
                295$
              </PaperStyled>
            </Grid>
            <Grid item xs={12} sm={4}>
              <PaperStyled theme={theme}>
                <Typography component="h1" size="body2">
                  {t('portfolio:auctionPosition')}
                </Typography>
                295$
              </PaperStyled>
            </Grid>
          </Grid> */}
            {markets && markets.length > 0 && (
              <Grid item>
                {isMobile ? (
                  markets.map((market) => {
                    const [title, ...marketCard] = market.columns.map((col, i) => ({
                      type: marketHeading[i],
                      value: col,
                    }));
                    return (
                      <MarketCard
                        key={title.value}
                        title={typeof title.value === 'string' ? title.value : ''}
                        statisticList={marketCard}
                        cardState="Market"
                        closeDate="false"
                      />
                    );
                  })
                ) : (
                  <PortfolioTable title="Market" heading={marketHeading} rows={markets} />
                )}
              </Grid>
            )}
            {auctions && auctions.length > 0 && (
              <Grid item>
                {isMobile ? (
                  auctions?.map((market) => {
                    const [title, date, ...marketCard] = market.columns.map((col, i) => ({
                      type: marketHeading[i],
                      value: col,
                    }));
                    return (
                      <MarketCard
                        key={title.value}
                        title={typeof title.value === 'string' ? title.value : ''}
                        statisticList={marketCard}
                        cardState="Auction"
                        closeDate={typeof date.value === 'string' ? date.value : ''}
                      />
                    );
                  })
                ) : (
                  <PortfolioTable title="Auction" heading={auctionHeading} rows={auctions} />
                )}
              </Grid>
            )}
          </Grid>
          {(!markets || markets.length === 0) && (!auctions || auctions.length === 0) && (
            <EmptyBoxStyled>
              <Typography component="h3" size="2rem">
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
