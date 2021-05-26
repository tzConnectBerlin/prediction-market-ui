import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { DATETIME_FORMAT } from '../../../utils/globals';
import { MarketCard } from '../MarketCard';
import { Currency, MarketCardData, MarketStateType, TokenType } from '../../../interfaces';

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
      const marketClosedText =
        card.state === MarketStateType.auctionRunning
          ? format(new Date(card.auctionEndDate), timestampFormat)
          : card?.state === MarketStateType.marketBootstrapped
          ? t('Active')
          : t('Closed');
      return (
        <StyledGrid item key={`${card?.ipfsHash}-${index}`}>
          <MarketCard
            title={card.question}
            hash={card.ipfsHash}
            cardState={t(card.state)}
            closeDate={marketClosedText}
            onClick={() => history.push(`/auction/${card.marketId}`)}
            iconURL={card.iconURL}
            tokenList={[
              {
                type: TokenType.yes,
                value: card.yesPrice,
              },
              {
                type: TokenType.no,
                value: 1 - card.yesPrice,
              },
            ]}
            statisticList={[
              {
                type: 'VOLUME',
                value: card.volume ?? 0,
                currency: Currency.USD,
              },
            ]}
          />
        </StyledGrid>
      );
    });
  };

  return <Grid container>{getMarketList()}</Grid>;
};
