import * as React from 'react';
import {
  Popover,
  Divider,
  Grid,
  ListItemProps,
  ListItem,
  ListItemText,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Theme,
  useTheme,
  Link,
} from '@material-ui/core';
import styled from '@emotion/styled';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Identicon } from '../../atoms/Identicon';
import { Typography } from '../../atoms/Typography';
import { Address } from '../../atoms/Address/Address';
import { CustomButton } from '../../atoms/Button';
import { Links } from '../../../interfaces';
import { roundToTwo } from '../../../utils/math';
import { Loading } from '../../atoms/Loading';
import { SettingDialog } from '../SettingDialog';

const StyledGrid = styled(Grid)<{ theme: Theme }>`
  padding: ${({ theme }) => theme.spacing(2)};

  .settings {
    padding-top: 0;
  }

  .header-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

interface ListItemLinkProps extends ListItemProps {
  href: string;
}

const ListItemLink = ({ href, children, ...rest }: ListItemLinkProps) => {
  return (
    <Link component={RouterLink} to={href} sx={{ textDecoration: 'none' }}>
      <ListItem {...rest}>{children}</ListItem>
    </Link>
  );
};

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
  handleAction: () => void | Promise<void>;
}

export const ProfilePopoverComponent: React.FC<ProfilePopoverProps> = ({
  address,
  isOpen,
  userBalance,
  stablecoinSymbol,
  anchorEl,
  links = [],
  onClose,
  handleAction,
  actionText,
}: ProfilePopoverProps) => {
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const id = isOpen ? 'profile-popover' : undefined;
  const [settings, setSettings] = React.useState(false);
  const balance =
    typeof userBalance === 'undefined' ? (
      <Loading size="xs" hasContainer={false} />
    ) : (
      `${roundToTwo(userBalance ?? 0)} ${stablecoinSymbol}`
    );
  const toggleSettings = React.useCallback(() => setSettings(!settings), [settings]);
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
        <Grid item className="header-container">
          <Identicon alt={address} seed={address} type="tzKtCat" iconSize="xl" />
          <Address address={address} trim trimSize="medium" customStyle={{ width: 'auto' }} />
        </Grid>
        <Grid item>
          <Typography
            component="div"
            size="subtitle2"
            color="textSecondary"
            sx={{ paddingX: theme.spacing(1) }}
          >
            {t('balance')}
          </Typography>
          <Typography component="div" size="subtitle2" sx={{ paddingX: theme.spacing(1) }}>
            {balance}
          </Typography>
        </Grid>
        {links.length > 0 && (
          <Grid item>
            {links.map((link, index) => (
              <React.Fragment key={`${link.label}-${index}`}>
                <Divider />
                <ListItemLink href={link.url} sx={{ paddingX: theme.spacing(1) }}>
                  <ListItemText primary={link.label} sx={{ color: theme.palette.primary.main }} />
                </ListItemLink>
              </React.Fragment>
            ))}
          </Grid>
        )}
        <Divider sx={{ marginLeft: theme.spacing(2) }} />
        <Grid className="settings">
          <Accordion expanded={settings} onChange={toggleSettings} elevation={0}>
            <AccordionSummary>
              <Typography component="div" color="primary" sx={{ paddingX: theme.spacing(1) }}>
                {t('slippageSettings')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SettingDialog />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Divider sx={{ marginLeft: theme.spacing(2) }} />
        <Grid item container justifyContent="center" alignContent="center" alignItems="center">
          <CustomButton
            label={actionText}
            variant="contained"
            backgroundVariant="secondary"
            size="medium"
            onClick={handleAction}
          />
        </Grid>
      </StyledGrid>
    </Popover>
  );
};

export const ProfilePopover = React.memo(ProfilePopoverComponent);
