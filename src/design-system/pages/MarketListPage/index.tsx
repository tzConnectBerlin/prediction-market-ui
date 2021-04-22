import { Grid } from '@material-ui/core';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useMarketCards } from '../../../api/queries';
import { DATETIME_FORMAT } from '../../../utils/globals';
import { MarketCard } from '../../organisms/MarketCard';
import { MarketCardData, QuestionStateType } from '../../../interfaces';

const StyledGrid = styled(Grid)`
  display: flex;
`;

export const MarketListPage: React.FC = () => {
  const { data, status } = useMarketCards();
  const timestampFormat = DATETIME_FORMAT.MEDIUM_FORMAT;
  const { t } = useTranslation(['common']);

  const getMarketList = (dataList: MarketCardData[]) => {
    return dataList.map((card, i) => {
      const marketClosedText =
        card.state === QuestionStateType.questionAuctionOpen
          ? format(new Date(card.auctionEndDate), timestampFormat)
          : card.state === QuestionStateType.questionAuctionWithdrawOpen
          ? format(new Date(card.marketCloseDate), timestampFormat)
          : 'Closed';
      return (
        <StyledGrid item key={i}>
          <MarketCard
            title={card.question}
            hash={card.hash}
            iconURL={card.iconURL}
            cardState={t(card.state)}
            closeDate={marketClosedText}
            tokenList={card.tokens}
            statisticList={card.statisticks}
          />
        </StyledGrid>
      );
    });
  };

  return (
    <>
      {status === 'loading' && <div>Loading</div>}
      {data && <Grid container>{getMarketList(data)}</Grid>}
    </>
  );
};
