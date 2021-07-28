import { Grid, useTheme } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { DATETIME_FORMAT } from '../../../utils/globals';
import { MarketCard } from '../MarketCard';
import { Currency, MarketCardData, MarketCardToken, TokenType } from '../../../interfaces';
import { getMarketStateLabel } from '../../../utils/misc';
import { roundToTwo } from '../../../utils/math';

const StyledGrid = styled(Grid)`
  display: flex;
`;

export interface MarketCardListProps {
  cardList: MarketCardData[];
  timestampFormat?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const MarketCardList: React.FC<MarketCardListProps> = ({
  cardList,
  timestampFormat = DATETIME_FORMAT.MEDIUM_FORMAT,
}) => {
  const { t } = useTranslation(['common']);
  const history = useHistory();
  const theme = useTheme();

  const getMarketList = () => {
    return cardList.map((card, index) => {
      const marketClosedText = getMarketStateLabel(card, t, timestampFormat);
      const yes = Number.isNaN(card.yesPrice) ? '--' : card.yesPrice;
      const no = Number.isNaN(card.yesPrice) ? '--' : roundToTwo(1 - card.yesPrice);
      const stats = [];
      if (card?.winningPrediction) {
        stats.push({
          type: t('Winner'),
          value: card.winningPrediction.toUpperCase(),
          currency: Currency.USD,
        });
      } else {
        stats.push({
          type: t('volume'),
          value: card.volume ?? '--',
          currency: Currency.USD,
        });
      }

      let backgroundColor;
      let fontColor;
      if (t(card.state).toLowerCase() === 'auction') {
        backgroundColor = theme.palette.secondary.dark;
        fontColor = theme.palette.text.primary;
      }

      const tokenList: MarketCardToken[] = [];

      if (yes !== '--') {
        tokenList.push({
          type: TokenType.yes,
          value: yes,
        });
      }

      if (no !== '--') {
        tokenList.push({
          type: TokenType.no,
          value: no,
        });
      }

      return (
        <motion.div variants={item} key={`${card?.ipfsHash}-${index}`} style={{ display: 'flex' }}>
          <StyledGrid item>
            <MarketCard
              title={card.question}
              hash={card.ipfsHash}
              cardState={t(card.state)}
              closeDate={marketClosedText}
              onClick={() => history.push(`/${t(card.state).toLowerCase()}/${card.marketId}`)}
              cardStateProps={{
                backgroundColor,
                fontColor,
              }}
              iconURL={card.iconURL}
              tokenList={tokenList}
              statisticList={stats}
            />
          </StyledGrid>
        </motion.div>
      );
    });
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <Grid justifyContent="flex-start" container>
        {getMarketList()}
      </Grid>
    </motion.div>
  );
};
