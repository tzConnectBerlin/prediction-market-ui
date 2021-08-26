import * as React from 'react';
import styled from '@emotion/styled';
import { Card, Grid, Theme, useTheme } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../atoms/Typography';
import { Address } from '../../atoms/Address/Address';

const StyledCard = styled(Card)`
  margin: 1em;
  padding: 1em;
  display: flex;
  max-width: 30rem;
  @media (min-width: 280px) {
    width: 75%;
    flex-direction: column;
  }
  @media (min-width: 600px) {
    width: 100%;
    flex-direction: row;
  }
`;

const CustomStylesAddress: SxProps<Theme> = {
  width: 'auto',
  marginBottom: '1rem',
  color: (theme) => theme.palette.text.secondary,
};

export interface MyAccountCardProps {
  /**
   * title of card
   */
  title: string;
  walletLabel: string;
  /**
   * wallet name
   */
  walletName?: string;
  keyLabel: string;
  /**
   * key/address hash
   */
  address: string;
  balanceLabel: string;
  /**
   * balance amount
   */
  balance: number;
  /**
   *
   */
  handleAddFunds?: () => void | Promise<void>;
  /**
   *
   */
  handleDisconnect?: () => void | Promise<void>;
}
export const MyAccountCard: React.FC<MyAccountCardProps> = ({
  title,
  walletLabel,
  walletName,
  keyLabel,
  address,
  balanceLabel,
  balance,
  handleDisconnect,
}) => {
  const theme = useTheme();
  const { t } = useTranslation(['common']);
  return (
    <StyledCard>
      <Grid container>
        <Grid item xs={12} sm={5} marginX="1rem">
          <Typography
            color={theme.palette.text.primary}
            component="h1"
            size="1.5rem"
            marginY="1rem"
          >
            {title}
          </Typography>
          <Typography color={theme.palette.primary.main}>{walletLabel}</Typography>
          <Typography marginBottom="1rem" color={theme.palette.text.secondary}>
            {walletName}
          </Typography>
          <Typography color={theme.palette.primary.main}>{keyLabel}</Typography>
          <Address address={address} trim trimSize="medium" customStyle={CustomStylesAddress} />
          <Typography color={theme.palette.primary.main}>{balanceLabel}</Typography>
          <Typography color={theme.palette.text.secondary} marginBottom="1rem">
            {balance}
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={5}
          margin="1rem"
          textAlign="right"
          direction="column"
          justifyContent="space-between"
        >
          <Typography color={theme.palette.primary.main} onClick={handleDisconnect}>
            {t('disconnectWallet')}
          </Typography>
          <Typography color={theme.palette.primary.main}>{t('addTez')}</Typography>
        </Grid>
      </Grid>
    </StyledCard>
  );
};
