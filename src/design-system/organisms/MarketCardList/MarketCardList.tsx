import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { DATETIME_FORMAT } from '../../../utils/globals';
import { MarketCard } from '../MarketCard';
import { MarketCardData, QuestionStateType } from '../../../interfaces';

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

  const getMarketList = (dataList: MarketCardData[]) => {
    return dataList.map((card, index) => {
      const marketClosedText =
        card.state === QuestionStateType.auctionRunning
          ? format(new Date(card.auctionEndDate), timestampFormat)
          : card.state === QuestionStateType.marketBootstrapped
          ? format(new Date(card.marketCloseDate), timestampFormat)
          : t('closed');
      return (
        <StyledGrid item key={`${card.hash}-${index}`}>
          <MarketCard
            title={card.question}
            hash={card.hash}
            iconURL={card.iconURL}
            cardState={t(card.state)}
            closeDate={marketClosedText}
            tokenList={card.tokens}
            statisticList={card.statistics}
            onClick={() => history.push(`/auction/${card.hash}`)}
          />
        </StyledGrid>
      );
    });
  };

  return <>{cardList && <Grid container>{getMarketList(cardList)}</Grid>}</>;
};
