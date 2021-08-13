import React from 'react';
import { Card, CardContent, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import { useToasts } from 'react-toast-notifications';
import { MarketTradeType, Token } from '../../../interfaces';
import { MarketPosition, MarketPositionProps } from '../../molecules/MarketPosition';
import { claimWinnings, closeAuction } from '../../../contracts/Market';
import { logError } from '../../../logger/logger';
import Button from '../../atoms/Button';

export interface CloseOpenMarketProps {
  tokenList: Token[];
  outcomeItems: string[];
  marketId: string;
  connected: boolean;
}
export const CloseOpenMarketCard: React.FC<CloseOpenMarketProps> = ({
  tokenList,
  outcomeItems,
  marketId,
  connected,
}) => {
  const { addToast } = useToasts();
  const [, setCloseMarketId] = React.useState('');
  const handleClose = () => setCloseMarketId('');
  const theme = useTheme();
  const { activeAccount } = useWallet();
  const { t } = useTranslation('common');
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleCloseAuction = React.useCallback(
    async (id: string) => {
      if (activeAccount?.address && id) {
        try {
          await closeAuction(id, true);
        } catch (error) {
          logError(error);
          const errorText = error?.data[1]?.with?.string || t('txFailed');
          addToast(errorText, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      }
    },
    [activeAccount?.address, addToast, t],
  );
  const handleClaimWinnings = React.useCallback(
    async (handleId: string) => {
      if (activeAccount?.address && handleId) {
        try {
          const hash = await claimWinnings(handleId);
          if (hash) {
            handleClose();
          }
        } catch (error) {
          logError(error);
          const errorText = error?.data[1]?.with?.string || t('txFailed');
          addToast(errorText, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      }
    },
    [activeAccount?.address, addToast, t],
  );

  return (
    <Card>
      <CardContent>
        {!outcomeItems.length && (
          <Button
            style={{ width: '100%' }}
            label={t('claimWinningsPage')}
            onClick={() => handleClaimWinnings(marketId)}
          />
        )}
        {!outcomeItems.length && (
          <Button
            style={{ width: '100%' }}
            label={t('claimWinningsPage')}
            onClick={() => handleClaimWinnings(marketId)}
          />
        )}
      </CardContent>
    </Card>
  );
};
