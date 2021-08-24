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
} from '@material-ui/core';
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
import { useStore } from '../../../store/store';

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

const ListItemLink = (props: ListItemProps<'a', { button?: true; disableGutters?: true }>) => {
  return <ListItem button disableGutters component="a" {...props} />;
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
      <StyledGrid container direction="column" spacing={2}>
        <Grid item className="header-container">
          <Identicon alt={address} seed={address} type="tzKtCat" iconSize="xl" />
          <Address address={address} trim trimSize="medium" customStyle={{ width: 'auto' }} />
        </Grid>
        <Grid item>
          <Typography component="div" size="subtitle2" color="textSecondary" paddingX="0.5rem">
            {t('balance')}
          </Typography>
          <Typography component="div" size="subtitle2" paddingX="0.5rem">
            {balance}
          </Typography>
        </Grid>
        {links.length > 0 && (
          <Grid item>
            {links.map((link, index) => (
              <React.Fragment key={`${link.label}-${index}`}>
                <Divider />
                <ListItemLink href={link.url}>
                  <StyledListItemText primary={link.label} theme={theme} />
                </ListItemLink>
              </React.Fragment>
            ))}
          </Grid>
        )}
        <StyledDivider />
        <Grid className="settings">
          <Accordion expanded={settings} onChange={toggleSettings} elevation={0}>
            <AccordionSummary>
              <Typography component="div" color="primary" paddingX="0.5rem">
                {t('slippageSettings')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SettingDialog />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <StyledDivider />
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
