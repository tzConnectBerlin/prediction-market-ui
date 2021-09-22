import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Link,
  Grid,
  Divider,
  ListItemText,
  AccordionDetails,
  IconButton,
  Drawer,
  ListItemProps,
  ListItem,
  Fade,
  Accordion,
  AccordionSummary,
  Theme,
  useTheme,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { SxProps } from '@material-ui/core/node_modules/@material-ui/system';
import styled from '@emotion/styled';
import { Address } from '../../atoms/Address/Address';
import { SettingDialog } from '../../molecules/SettingDialog';
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

const StyledListItemText = styled(ListItemText)<{ theme: Theme }>`
  color: ${({ theme }) => theme.palette.primary.main};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  &.MuiAccordionDetails-root {
    padding: 8px 0px 16px 16px;
  }
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

const ListItemLinkStyles: SxProps<Theme> = { textDecoration: 'none' };

interface ListItemLinkProps extends ListItemProps {
  href: string;
}

const ListItemLink = ({ href, children, ...rest }: ListItemLinkProps) => {
  return (
    <Link component={RouterLink} to={href} sx={ListItemLinkStyles}>
      <ListItem {...rest}>{children}</ListItem>
    </Link>
  );
};

export interface MobileHeaderProps {
  handleClick?: () => void;
  userBalance?: number;
  stablecoinSymbol: string;
  walletAvailable: boolean;
  address?: string;
  profileLinks?: Links[];
  handleConnect: () => void | Promise<unknown>;
  handleSecondaryAction?: () => void | Promise<void>;
  secondaryActionText?: string;
  primaryActionText: string;
  actionText: string;
  handleCallback: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  handleClick,
  userBalance,
  stablecoinSymbol,
  walletAvailable,
  address,
  profileLinks,
  handleConnect,
  handleSecondaryAction,
  primaryActionText,
  secondaryActionText,
  actionText,
  handleCallback,
}) => {
  const [settings, setSettings] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const toggleSettings = React.useCallback(() => setSettings(!settings), [settings]);
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
      <Grid container item justifyContent="flex-end" xs={3}>
        <CustomIconButton onClick={handleOpen} aria-label="menu">
          <img src="/images/hamburger.svg" alt="open menu" />
        </CustomIconButton>
      </Grid>
      <Fade in={openMenu}>
        <FullSizeDrawer variant="persistent" anchor="right" open={openMenu}>
          <DrawerHeader theme={theme}>
            <CustomIconButton onClick={handleClose} aria-label="closeMenu">
              <img src="/images/close.svg" alt="close menu" />
            </CustomIconButton>
          </DrawerHeader>
          {secondaryActionText && (
            <Grid item display="flex" alignItems="center">
              <CustomButton
                variant="contained"
                backgroundVariant="secondary"
                label={secondaryActionText}
                onClick={handleSecondaryAction}
              />
            </Grid>
          )}
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
                <Grid item className="header-container">
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
                    size="subtitle2"
                    color="textSecondary"
                    paddingX="0.5rem"
                  >
                    {t('balance')}
                  </Typography>
                  <Typography component="div" size="subtitle2" paddingX="0.5rem">
                    {balance}
                  </Typography>
                </Grid>
                {profileLinks && profileLinks.length > 0 && (
                  <Grid item>
                    {profileLinks.map((link, index) => (
                      <React.Fragment key={`${link.label}-${index}`}>
                        <Divider />
                        <ListItemLink href={link.url} disableGutters>
                          <StyledListItemText primary={link.label} theme={theme} />
                        </ListItemLink>
                      </React.Fragment>
                    ))}
                  </Grid>
                )}
                <StyledDivider />
                <Grid container height={settings ? '20rem' : '3rem'} alignItems="center">
                  <Accordion expanded={settings} onChange={toggleSettings} elevation={0}>
                    <AccordionSummary>
                      <Typography component="div" color="primary" paddingX="0.5rem">
                        {t('slippageSettings')}
                      </Typography>
                    </AccordionSummary>
                    <StyledAccordionDetails>
                      <SettingDialog />
                    </StyledAccordionDetails>
                  </Accordion>
                </Grid>
                <StyledDivider />
                <Grid
                  item
                  container
                  paddingTop="0.5rem"
                  justifyContent="center"
                  alignContent="center"
                  alignItems="center"
                >
                  <CustomButton
                    label={actionText}
                    variant="contained"
                    backgroundVariant="secondary"
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

// , [
//   userBalance,
//   // stablecoinSymbol,
//   // handleOpen,
//   openMenu,
//   // theme,
//   // handleClose,
//   // secondaryActionText,
//   // handleSecondaryAction,
//   // walletAvailable,
//   // primaryActionText,
//   // isMobile,
//   // address,
//   // t,
//   // profileLinks,
//   // settings,
//   // toggleSettings,
//   // actionText,
//   // handleCallbackInner,
//   // handleConnect,
// ]);
