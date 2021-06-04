import React, { useEffect, useState } from 'react';
import { Grid, Paper, Theme, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { PortfolioTable } from '../../design-system/organisms/PortfolioTable';
import { Row } from '../../design-system/organisms/PortfolioTable/PortfolioTable';
import { MainPage } from '../MainPage/MainPage';
import { Typography } from '../../design-system/atoms/Typography';
import { useMarkets } from '../../api/queries';
import { getAuctions } from '../../api/utils';

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

const heading: string[] = ['Market', 'Status', 'Role', 'Shares', 'Share Price', 'Total', ''];

const rowList: Row[] = [
  {
    columns: [
      'Will Biden be President on January 21, 2022?',
      'Open',
      'Adjudicator',
      '10',
      '$ 0.95',
      '$ 0.95',
    ],
    rowAction: {
      label: 'Close Market',
      handleAction: () => console.log('hi'),
    },
  },
  {
    columns: [
      'Will Biden be President on January 21, 2022?',
      'Open',
      'Adjudicator',
      '10',
      '$ 0.95',
      '$ 0.95',
    ],
    rowAction: {
      label: 'Close Market',
      handleAction: () => console.log('hi'),
    },
  },
  {
    columns: [
      'Will Biden be President on January 21, 2022?',
      'Open',
      'Adjudicator',
      '10',
      '$ 0.95',
      '$ 0.95',
    ],
    rowAction: {
      label: 'Close Market',
      handleAction: () => console.log('hi'),
    },
  },
  {
    columns: [
      'Will Biden be President on January 21, 2022?',
      'Open',
      'Adjudicator',
      '10',
      '$ 0.95',
      '$ 0.95',
    ],
    rowAction: {
      label: 'Close Market',
      handleAction: () => console.log('hi'),
    },
  },
];

export const PortfolioPage: React.FC = () => {
  const theme = useTheme();
  const { data, isLoading } = useMarkets();
  const [markets, setMarkets] = useState(data);
  const [auctions, setActions] = useState(data);

  useEffect(() => {
    setMarkets(data);
    console.log(data);
    if (data) {
      const allAuctions = getAuctions(data);
      setActions(allAuctions);
    }
  }, [data]);

  return (
    <MainPage>
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
            <PortfolioTable title="Market" heading={heading} rows={rowList} />
          </Grid>
        )}
        {auctions && (
          <Grid item>
            <PortfolioTable title="Auction" heading={heading} rows={rowList} />
          </Grid>
        )}
      </Grid>
    </MainPage>
  );
};
