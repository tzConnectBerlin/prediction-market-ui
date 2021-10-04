import * as React from 'react';
import { Grid, Divider, useTheme, Theme, Link } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Address } from '../../atoms/Address/Address';
import { SettingDialog } from '../SettingDialog';
import { Typography } from '../../atoms/Typography';
import { Loading } from '../../atoms/Loading';
import { roundToTwo } from '../../../utils/math';
import { CustomButton } from '../../atoms/Button';
import { Identicon } from '../../atoms/Identicon';
import { Links } from '../../../interfaces';
import { CURRENCY_SYMBOL } from '../../../globals';

const StyledGrid = styled(Grid)`
  padding: 1rem;
  .settings {
    padding-top: 0;
  }
  .header-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const StyledDivider = styled(Divider)`
  margin-left: 1rem;
`;

const StyledCustomButton = styled(CustomButton)`
  padding: 0.75rem;
`;

const PaddedStyledCustomButton = styled(StyledCustomButton)`
  margin-bottom: 1.5rem;
`;

const ListItemLinkStyles: SxProps<Theme> = { textDecoration: 'none' };

export interface MainMenuProps {
  openPositions?: number;
  userBalance?: number;
  stablecoinSymbol: string;
  address?: string;
  profileLinks?: Links[];
  handleSecondaryAction?: () => void | Promise<void>;
  handleProfileAction?: () => void;
  secondaryActionText?: string;
  actionText: string;
  handleCallback: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  openPositions,
  userBalance,
  stablecoinSymbol,
  address,
  profileLinks,
  handleSecondaryAction,
  handleProfileAction,
  secondaryActionText,
  actionText,
  handleCallback,
}) => {
  const theme = useTheme();
  const { t } = useTranslation(['common']);

  const balance =
    typeof userBalance === 'undefined' ? (
      <Loading size="xs" hasContainer={false} />
    ) : (
      `${roundToTwo(userBalance ?? 0)} ${stablecoinSymbol}`
    );

  const faucetUrl = `https://faucet.tzconnect.berlin?address=${address}`;
  const faucetLink = (
    <Link href={faucetUrl} sx={ListItemLinkStyles} target="_blank" rel="noopener">
      {t('faucetText')}
    </Link>
  );
  const customAddressStyle = { width: 'auto' };

  return (
    <StyledGrid container direction="column" spacing={2} theme={theme}>
      <Grid item className="header-container" marginBottom="2.5rem">
        <Identicon alt={address} seed={address} type="tzKtCat" iconSize="xl" />
        {address && (
          <Address address={address} trim trimSize="medium" customStyle={customAddressStyle} />
        )}
      </Grid>
      <Grid item>
        <Typography component="div" size="h3" color={theme.palette.primary.main} paddingX="0.5rem">
          {t('positionSummary')}
        </Typography>
        <Grid container display="flex" marginTop="1.5rem" justifyContent="space-between">
          <Typography paddingX="0.5rem" color={theme.palette.text.secondary}>
            {t('availableBalance')}
          </Typography>
          <Typography
            component="div"
            size="subtitle2"
            paddingX="0.5rem"
            color={theme.palette.grey[900]}
          >
            {balance} {userBalance === 0 && faucetLink}
          </Typography>
        </Grid>
        <Grid container display="flex" marginTop="1.5rem" justifyContent="space-between">
          <Typography paddingX="0.5rem" color={theme.palette.text.secondary}>
            {t('openPositions')}
          </Typography>
          <Typography
            component="div"
            size="subtitle2"
            paddingX="0.5rem"
            color={theme.palette.grey[900]}
          >
            {openPositions} {CURRENCY_SYMBOL}
          </Typography>
        </Grid>
      </Grid>
      {profileLinks && profileLinks.length > 0 && (
        <Grid item marginTop="1.5rem">
          {profileLinks.map((link, index) => (
            <React.Fragment key={`${link.label}-${index}`}>
              <Grid
                item
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginBottom="1.5rem"
              >
                <StyledCustomButton
                  fullWidth
                  lowercase
                  variant="contained"
                  backgroundVariant="secondary"
                  label={link.label}
                  onClick={handleProfileAction}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      )}
      <StyledDivider />
      <SettingDialog />
      <StyledDivider />
      <Grid
        item
        container
        paddingTop="0.5rem"
        justifyContent="center"
        flexDirection="column"
        alignContent="center"
        alignItems="center"
      >
        {secondaryActionText && (
          <PaddedStyledCustomButton
            lowercase
            fullWidth
            variant="contained"
            backgroundVariant="secondary"
            label={secondaryActionText}
            onClick={handleSecondaryAction}
          />
        )}
        <StyledCustomButton
          lowercase
          fullWidth
          label={actionText}
          variant="contained"
          backgroundVariant="primary"
          size="medium"
          onClick={handleCallback}
        />
      </Grid>
    </StyledGrid>
  );
};
