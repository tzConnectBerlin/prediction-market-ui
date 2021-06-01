import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { DATETIME_FORMAT } from '../../../utils/globals';
import { MarketCard } from '../MarketCard';
import { Currency, MarketCardData, TokenType } from '../../../interfaces';
import { getMarketStateLabel } from '../../../utils/misc';
import { roundToTwo } from '../../../utils/math';

const StyledGrid = styled(Grid)`
  display: flex;
`;

export interface MarketCardListProps {
  cardList: MarketCardData[];
  timestampFormat?: string;
}

export const MarketCardList: React.FC<MarketCardListProps> = ({
  cardList,
  timestampFormat = DATETIME_FORMAT.SHORT_FORMAT,
}) => {
  const { t } = useTranslation(['common']);
  const history = useHistory();

  const getMarketList = () => {
    return cardList.map((card, index) => {
      const marketClosedText = getMarketStateLabel(card, t, timestampFormat);
      const yes = Number.isNaN(card.yesPrice) ? '--' : card.yesPrice;
      const no = Number.isNaN(card.yesPrice) ? '--' : roundToTwo(1 - card.yesPrice);
      const stats = [
        {
          type: t('volume'),
          value: card.volume ?? '--',
          currency: Currency.USD,
        },
      ];
      if (card?.winningPrediction) {
        stats.push({
          type: t('Winnings token'),
          value: card.winningPrediction.toUpperCase(),
          currency: Currency.USD,
        });
      }
      return (
        <StyledGrid item key={`${card?.ipfsHash}-${index}`}>
          <MarketCard
            title={card.question}
            hash={card.ipfsHash}
            cardState={t(card.state)}
            closeDate={marketClosedText}
            onClick={() => history.push(`/${t(card.state).toLowerCase()}/${card.marketId}`)}
            iconURL={card.iconURL}
            tokenList={[
              {
                type: TokenType.yes,
                value: yes,
              },
              {
                type: TokenType.no,
                value: no,
              },
            ]}
            statisticList={stats}
          />
        </StyledGrid>
      );
    });
  };

  return <Grid container>{getMarketList()}</Grid>;
};
