import React, { useEffect, useState } from 'react';
import { useWallet } from '@tz-contrib/react-wallet-provider';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { Grid, Paper, Theme, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { PortfolioTable } from '../../design-system/organisms/PortfolioTable';
import { Row } from '../../design-system/organisms/PortfolioTable/PortfolioTable';
import { MainPage } from '../MainPage/MainPage';
import { Typography } from '../../design-system/atoms/Typography';
import { useMarkets } from '../../api/queries';
import { getAuctions, getMarkets, getNoTokenId, getYesTokenId } from '../../api/utils';
import { Loading } from '../../design-system/atoms/Loading';
import { Market, PortfolioAuction, PortfolioMarket, Role } from '../../interfaces';
import { getMarketStateLabel } from '../../utils/misc';
import { claimWinnings, closeAuction } from '../../contracts/Market';
import { logError } from '../../logger/logger';

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

const marketHeading: string[] = ['Market', 'Status', 'Role', 'Shares', 'Share Price', 'Total', ''];
const auctionHeading: string[] = ['Auction', 'End Date', 'Role', 'Probability', 'Quantity', ''];

export const PortfolioPageComponent: React.FC<PortfolioPageProps> = ({ t }) => {
  const theme = useTheme();
  const { data, isLoading } = useMarkets();
  const { activeAccount } = useWallet();
  const { addToast } = useToasts();
  const [markets, setMarkets] = useState<Row[] | null>(null);
  const [auctions, setActions] = useState<Row[] | null>(null);

  const handleClaimWinnings = async (marketId: string) => {
    if (activeAccount?.address && marketId) {
      try {
        await claimWinnings(marketId);
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

  const filterdMarket = (market: Market[]) => {
    return market.filter(
      (item) =>
        item.adjudicator === activeAccount?.address ||
        (getNoTokenId(item.marketId) && getYesTokenId(item.marketId)),
    );
  };

  const seMarketRows = (market: Market[]): Row[] => {
    const MarketRowList: Row[] = [];
    market.map((item) => {
      const columns: PortfolioMarket = {
        question: item.question,
        status: getMarketStateLabel(item, t),
        role: item.adjudicator === activeAccount?.address ? Role.adjudicator : Role.participant,
        shares: 19,
        sharePrice: '109$',
        total: '109$',
      };
      return MarketRowList.push({
        columns: Object.values(columns),
        rowAction: {
          label:
            columns.status === 'Closed' ? t('portfolio:claimWinnings') : t('portfolio:closeMarket'),
          handleAction:
            columns.status === 'Closed'
              ? () => handleClaimWinnings(item.marketId)
              : () => console.log('Close Market'),
        },
      });
    });
    return MarketRowList;
  };

  const setAuctionRows = (market: Market[]): Row[] => {
    const AuctionRowList: Row[] = [];
    market.map((item) => {
      const columns: PortfolioAuction = {
        question: item.question,
        endDate: getMarketStateLabel(item, t),
        role: item.adjudicator === activeAccount?.address ? Role.adjudicator : Role.participant,
        probability: '35%',
        quantity: '75$',
      };
      return AuctionRowList.push({
        columns: Object.values(columns),
        rowAction: {
          label: t('portfolio:closeAuction'),
          handleAction: () => handleCloseAuction(item.marketId),
        },
      });
    });
    return AuctionRowList;
  };

  useEffect(() => {
    if (data) {
      const allMarkets = filterdMarket(getMarkets(data));
      setMarkets(seMarketRows(allMarkets));
      const allAuctions = filterdMarket(getAuctions(data));
      setActions(setAuctionRows(allAuctions));
    }
  }, data);

  return (
    <MainPage>
      {isLoading && <Loading />}
      {data && (
        <Grid container spacing={3} direction="column">
          <Grid item container spacing={3}>
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
          </Grid>
          {markets && (
            <Grid item>
              <PortfolioTable title="Market" heading={marketHeading} rows={markets} />
            </Grid>
          )}
          {auctions && (
            <Grid item>
              <PortfolioTable title="Auction" heading={auctionHeading} rows={auctions} />
            </Grid>
          )}
        </Grid>
      )}
    </MainPage>
  );
};

export const PortfolioPage = withTranslation(['common', 'portfolio'])(PortfolioPageComponent);
