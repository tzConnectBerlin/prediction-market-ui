import * as React from 'react';
import { Popover, Divider, Grid, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { Identicon } from '../../atoms/Identicon';
import { Typography } from '../../atoms/Typography';
import { Address } from '../../atoms/Address/Address';
import { CustomButton } from '../../atoms/Button';
import { Links } from '../../../interfaces';
import { roundToTwo } from '../../../utils/math';
import { Loading } from '../../atoms/Loading';
import { SettingDialog } from '../SettingDialog';

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
export interface ProfilePopoverProps {
  address: string;
  network: string;
  userBalance?: number;
  stablecoinSymbol: string;
  isOpen: boolean;
  actionText: string;
  anchorEl?: HTMLElement | null;
  links?: Links[];
  onClose: () => void | Promise<void>;
  handleAction?: () => void | Promise<void>;
  handleCallback: () => void;
}

const defaultLinks: Links[] = [];

export const ProfilePopoverComponent: React.FC<ProfilePopoverProps> = ({
  address,
  isOpen,
  userBalance,
  stablecoinSymbol,
  anchorEl,
  links = defaultLinks,
  onClose,
  handleAction,
  handleCallback,
  actionText,
}: ProfilePopoverProps) => {
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const id = isOpen ? 'profile-popover' : undefined;
  const customAddressStyle = { width: 'auto' };
  const balance =
    typeof userBalance === 'undefined' ? (
      <Loading size="xs" hasContainer={false} />
    ) : (
      `${roundToTwo(userBalance ?? 0)} ${stablecoinSymbol}`
    );

  return (
    <Popover
      id={id}
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <StyledGrid container direction="column" spacing={2} theme={theme}>
        <Grid item className="header-container" marginBottom="2.5rem">
          <Identicon alt={address} seed={address} type="tzKtCat" iconSize="xl" />
          {address && (
            <Address address={address} trim trimSize="medium" customStyle={customAddressStyle} />
          )}
        </Grid>
        <Grid item>
          <Typography
            component="div"
            size="h3"
            color={theme.palette.primary.main}
            paddingX="0.5rem"
          >
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
              {balance}
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
              {balance}
            </Typography>
          </Grid>
        </Grid>
        {links && links.length > 0 && (
          <Grid item marginTop="1.5rem">
            {links.map((link, index) => (
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
                    onClick={handleAction}
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
    </Popover>
  );
};

export const ProfilePopover = React.memo(ProfilePopoverComponent);
