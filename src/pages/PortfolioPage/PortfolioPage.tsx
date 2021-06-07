import React, { useEffect, useState } from 'react';
import { useWallet } from '@tz-contrib/react-wallet-provider';
import { useTranslation } from 'react-i18next';
import { Grid, Paper, Theme, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { PortfolioTable } from '../../design-system/organisms/PortfolioTable';
import { Row } from '../../design-system/organisms/PortfolioTable/PortfolioTable';
import { MainPage } from '../MainPage/MainPage';
import { Typography } from '../../design-system/atoms/Typography';
import { useMarkets } from '../../api/queries';
import { getAuctions, getMarkets, getNoTokenId, getYesTokenId } from '../../api/utils';
import { Loading } from '../../design-system/atoms/Loading';
import { Market, MarketStateType, PortfolioAuction, PortfolioMarket, Role } from '../../interfaces';
import { getMarketStateLabel } from '../../utils/misc';

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

export const PortfolioPage: React.FC = () => {
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const { data, isLoading } = useMarkets();
  const [markets, setMarkets] = useState<Row[] | null>(null);
  const [auctions, setActions] = useState<Row[] | null>(null);
  const { activeAccount } = useWallet();
  const [userAddress, setUserAddress] = useState('');

  const filterdMarket = (market: Market[]) => {
    return market.filter(
      (item) =>
        item.adjudicator === userAddress ||
        (getNoTokenId(item.marketId) && getYesTokenId(item.marketId)),
    );
  };
  const seMarketRows = (market: Market[]): Row[] => {
    const MarketRowList: Row[] = [];
    market.map((item) => {
      const columns: PortfolioMarket = {
        question: item.question,
        status: getMarketStateLabel(item, t),
        role: item.adjudicator === userAddress ? Role.adjudicator : Role.participand,
        shares: 19,
        sharePrice: '109$',
        total: '109$',
      };
      return MarketRowList.push({
        columns: Object.values(columns),
        rowAction: {
          label: 'Close Market',
          handleAction: () => console.log('market'),
        },
      });
    });
    return MarketRowList;
  };

  const seAuctionRows = (market: Market[]): Row[] => {
    const AuctionRowList: Row[] = [];
    market.map((item) => {
      const columns: PortfolioAuction = {
        question: item.question,
        endDate: getMarketStateLabel(item, t),
        role: item.adjudicator === userAddress ? Role.adjudicator : Role.participand,
        probability: '35%',
        quantity: '75$',
      };
      return AuctionRowList.push({
        columns: Object.values(columns),
        rowAction: {
          label: 'Close Auction',
          handleAction: () => console.log('auction'),
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
      setActions(seAuctionRows(allAuctions));
    }
    if (activeAccount?.address) {
      setUserAddress(activeAccount?.address);
      console.log(userAddress);
    }
  }, [data, activeAccount?.address]);

  return (
    <MainPage>
      {isLoading && <Loading />}
      {data && (
        <Grid container spacing={3} direction="column">
          <Grid item container spacing={3}>
            <Grid item xs={12} sm={4}>
              <PaperStyled theme={theme}>
                <Typography component="h1" size="body2">
                  Total Value
                </Typography>
                295$
              </PaperStyled>
            </Grid>
            <Grid item xs={12} sm={4}>
              <PaperStyled theme={theme}>
                <Typography component="h1" size="body2">
                  Total Value
                </Typography>
                295$
              </PaperStyled>
            </Grid>
            <Grid item xs={12} sm={4}>
              <PaperStyled theme={theme}>
                <Typography component="h1" size="body2">
                  Total Value
                </Typography>{' '}
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
