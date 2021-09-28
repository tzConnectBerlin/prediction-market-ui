import * as React from 'react';
import { Grid, Divider, IconButton, Drawer, Fade, Theme, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { AccountCircleRounded } from '@material-ui/icons';
import { Address } from '../../atoms/Address/Address';
import { SettingDialog } from '../SettingDialog';
import { Typography } from '../../atoms/Typography';
import { Loading } from '../../atoms/Loading';
import { roundToTwo } from '../../../utils/math';
import { CustomButton } from '../../atoms/Button';
import { Identicon } from '../../atoms/Identicon';
import { Links } from '../../../interfaces';

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

const CustomIconButton = styled(IconButton)`
  padding: 0;
  width: 25.5px;
  &:hover {
    background-color: transparent;
  }
`;

const FullSizeDrawer = styled(Drawer)`
  .MuiPaper-root {
    width: 100%;
    height: 100vh;
  }
`;
const StyledGridAvatar = styled(Grid)`
  cursor: pointer;
`;
interface HeaderDesignProps {
  theme: Theme;
}
const DrawerHeader = styled.div<HeaderDesignProps>`
  padding: ${({ theme }) => theme.spacing(2)};
  text-align: right;
`;

export interface MobileMenuProps {
  handleClick?: () => void;
  userBalance?: number;
  stablecoinSymbol: string;
  walletAvailable: boolean;
  address?: string;
  profileLinks?: Links[];
  handleConnect: () => void | Promise<unknown>;
  handleSecondaryAction?: () => void | Promise<void>;
  handleProfileAction?: () => void;
  secondaryActionText?: string;
  primaryActionText: string;
  actionText: string;
  handleCallback: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  handleClick,
  userBalance,
  stablecoinSymbol,
  walletAvailable,
  address,
  profileLinks,
  handleConnect,
  handleSecondaryAction,
  handleProfileAction,
  primaryActionText,
  secondaryActionText,
  actionText,
  handleCallback,
}) => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const theme = useTheme();
  const { t } = useTranslation(['common']);
  const buttonStyles = { marginLeft: 'inherit', width: 'max-content' };
  const handleOpen = React.useCallback(() => {
    setOpenMenu(true);
    if (handleClick) handleClick();
  }, [handleClick]);
  const handleClose = React.useCallback(() => {
    setOpenMenu(false);
    if (handleClick) handleClick();
  }, [handleClick]);
  const balance =
    typeof userBalance === 'undefined' ? (
      <Loading size="xs" hasContainer={false} />
    ) : (
      `${roundToTwo(userBalance ?? 0)} ${stablecoinSymbol}`
    );
  const customAddressStyle = { width: 'auto' };

  return (
    <>
      <Grid container item justifyContent="flex-end" xs={4}>
        {!walletAvailable && (
          <Grid item alignSelf="center">
            <AccountCircleRounded
              fontSize="large"
              color="primary"
              onClick={handleOpen}
              aria-label="menu"
            />
          </Grid>
        )}
        {walletAvailable && (
          <Identicon
            seed={address ?? ''}
            onClick={handleOpen}
            aria-label="menu"
            type="tzKtCat"
            alt="My Profile"
          />
        )}
      </Grid>
      <Fade in={openMenu}>
        <FullSizeDrawer variant="persistent" anchor="right" open={openMenu}>
          <DrawerHeader theme={theme}>
            <CustomIconButton onClick={handleClose} aria-label="closeMenu">
              <img src="/images/close.svg" alt="close menu" />
            </CustomIconButton>
          </DrawerHeader>
          {!walletAvailable && (
            <Grid item container justifyContent="center" alignContent="center" alignItems="center">
              <CustomButton
                onClick={() => {
                  handleConnect();
                }}
                label={primaryActionText}
                customStyle={buttonStyles}
              />
            </Grid>
          )}
          {walletAvailable && (
            <StyledGridAvatar item>
              <StyledGrid container direction="column" spacing={2} theme={theme}>
                <Grid item className="header-container" marginBottom="2.5rem">
                  <Identicon alt={address} seed={address} type="tzKtCat" iconSize="xl" />
                  {address && (
                    <Address
                      address={address}
                      trim
                      trimSize="medium"
                      customStyle={customAddressStyle}
                    />
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
            </StyledGridAvatar>
          )}
        </FullSizeDrawer>
      </Fade>
    </>
  );
};
