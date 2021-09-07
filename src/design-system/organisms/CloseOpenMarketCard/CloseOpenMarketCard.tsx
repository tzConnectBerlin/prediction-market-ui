import * as React from 'react';
import { Card, CardContent, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { MarketStateType } from '../../../interfaces';
import Button from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { ResolveMarketModal } from '../ResolveMarketModal';

export interface CloseOpenMarketProps {
  marketId: string;
  marketPhase: MarketStateType;
  adjudicator?: string;
  address?: string;
  winningPrediction?: string;
  handleCloseAuction?: (id: string) => Promise<void>;
  handleResolveMarket?: (id: string) => Promise<void>;
  closeMarketId?: string;
  setCloseMarketId?: React.Dispatch<React.SetStateAction<string>>;
  auctionParticipant?: boolean;
}

const StyledCard = styled(Card)`
  margin-bottom: 1.5rem;
  padding: 1rem;
  padding-bottom: 0.5rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const CloseOpenMarketCard: React.FC<CloseOpenMarketProps> = ({
  adjudicator,
  address,
  winningPrediction,
  marketPhase,
  marketId,
  handleCloseAuction,
  handleResolveMarket,
  closeMarketId,
  setCloseMarketId,
  auctionParticipant,
}) => {
  const theme = useTheme();
  const handleClose = () => setCloseMarketId && setCloseMarketId('');
  const { t } = useTranslation('common');

  return marketPhase === MarketStateType.marketBootstrapped &&
    adjudicator !== address &&
    !winningPrediction ? null : (
    <StyledCard>
      {handleResolveMarket && auctionParticipant && (
        <ResolveMarketModal
          open={!!closeMarketId}
          handleClose={handleClose}
          handleSubmit={() => handleResolveMarket(marketId)}
        />
      )}
      <CardContent>
        {marketPhase === 'auction' && (
          <Typography marginBottom="1.5rem" size="14px">
            {t('closeAuction')}
          </Typography>
        )}
        {winningPrediction && (
          <StyledDiv>
            <Typography>{t('resolution')}</Typography>
            <Typography
              color={
                winningPrediction === 'yes' ? theme.palette.success.main : theme.palette.error.main
              }
            >
              {winningPrediction.charAt(0).toUpperCase() + winningPrediction.slice(1)}
            </Typography>
          </StyledDiv>
        )}
        {(!winningPrediction && adjudicator === address) ||
          (marketPhase === 'auction' && auctionParticipant && (
            <Button
              fullWidth
              label={marketPhase === 'auction' ? t('openMarketToTrade') : t('closeMarket')}
              onClick={
                marketPhase === 'auction'
                  ? () => handleCloseAuction && handleCloseAuction(marketId)
                  : () => setCloseMarketId && setCloseMarketId(marketId)
              }
            />
          ))}
      </CardContent>
    </StyledCard>
  );
};
