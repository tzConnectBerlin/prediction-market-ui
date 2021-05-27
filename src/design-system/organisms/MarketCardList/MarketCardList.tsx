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
                value: card.yesPrice,
              },
              {
                type: TokenType.no,
                value: roundToTwo(1 - card.yesPrice),
              },
            ]}
            statisticList={[
              {
                type: t('volume'),
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
