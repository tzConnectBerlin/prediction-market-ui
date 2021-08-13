import React from 'react';
import { Card, CardContent, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import styled from '@emotion/styled';
import { useToasts } from 'react-toast-notifications';
import { MarketStateType, MarketTradeType, Token } from '../../../interfaces';
import { claimWinnings, closeAuction, resolveMarket } from '../../../contracts/Market';
import { logError } from '../../../logger/logger';
import Button from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { ResolveMarketModal } from '../ResolveMarketModal';

export interface CloseOpenMarketProps {
  marketId: string;
  marketPhase: MarketStateType;
  adjudicator?: string;
  winningPrediction?: string;
  // handleResolveMarket?: (x: string) => Promise<void>;
}

const StyledCard = styled(Card)`
  margin-bottom: 1.5rem;
`;
export const CloseOpenMarketCard: React.FC<CloseOpenMarketProps> = ({
  adjudicator,
  winningPrediction,
  // handleResolveMarket,
  marketPhase,
  marketId,
}) => {
  const { addToast } = useToasts();
  const [closeMarketId, setCloseMarketId] = React.useState('');
  const handleClose = () => setCloseMarketId('');
  const { activeAccount } = useWallet();
  const { t } = useTranslation('common');

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
  const handleResolveMarket = React.useCallback(
    async (values: any) => {
      if (activeAccount?.address && closeMarketId) {
        try {
          await resolveMarket(closeMarketId, values.outcome);
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
    [activeAccount?.address, addToast, closeMarketId, t],
  );
  console.log(marketPhase);
  return (
    <StyledCard>
      <ResolveMarketModal
        open={!!closeMarketId}
        handleClose={handleClose}
        handleSubmit={handleResolveMarket}
      />
      <CardContent>
        {marketPhase === 'auction' && adjudicator === activeAccount?.address && (
          <Typography>{t('closeAuction')}</Typography>
        )}
        {winningPrediction && <Typography>{winningPrediction}</Typography>}
        {!winningPrediction && adjudicator === activeAccount?.address && (
          <Button
            style={{ width: '100%' }}
            label={marketPhase === 'auction' ? t('openMarket') : t('closeMarket')}
            onClick={
              marketPhase === 'auction'
                ? () => handleCloseAuction(marketId)
                : () => setCloseMarketId(marketId)
            }
          />
        )}
      </CardContent>
    </StyledCard>
  );
};
