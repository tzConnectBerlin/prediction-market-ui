import * as React from 'react';
import { Grid, useTheme } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { MarketCard } from '../MarketCard';
import { Currency, MarketCardData, MarketCardToken, TokenType } from '../../../interfaces';
import { roundToTwo } from '../../../utils/math';
import { SkeletonCard } from '../SkeletonCard';

const StyledGrid = styled(Grid)`
  display: flex;
`;

export interface MarketCardListProps {
  pending?: number;
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

export const MarketCardList: React.FC<MarketCardListProps> = ({ cardList, pending = 0 }) => {
  const { t } = useTranslation(['common']);
  const history = useHistory();
  const theme = useTheme();

  const getMarketList = () => {
    return cardList.map((card, index) => {
      const cardLink = card.question.toLowerCase().replaceAll(' ', '-').replaceAll('?', '');
      const yes = Number.isNaN(card.yesPrice) ? '--' : card.yesPrice;
      const no = Number.isNaN(card.yesPrice) ? '--' : roundToTwo(1 - card.yesPrice);
      const stats = [];
      const phase =
        t(card.state).toLowerCase() === 'auction'
          ? t('auctionPhase')
          : card?.winningPrediction
          ? t('resolved')
          : t('marketPhase');
      if (card?.winningPrediction) {
        stats.push({
          type: t('Winner'),
          value: card.winningPrediction.toUpperCase(),
          currency: Currency.USD,
        });
      } else {
        stats.push({
          type: t('volume'),
          value: card.liquidity ? `${card.liquidity} PMM` : '--',
          currency: Currency.USD,
        });
      }

      let backgroundColor;
      let fontColor;
      if (t(card.state).toLowerCase() === 'auction') {
        backgroundColor = theme.palette.secondary.dark;
        fontColor = theme.palette.text.primary;
      }
      if (card.winningPrediction) {
        // eslint-disable-next-line prefer-destructuring
        backgroundColor = theme.palette.grey[400];
        fontColor = theme.palette.text.primary;
      }

      const tokenList: MarketCardToken[] = [];

      if (yes !== '--') {
        tokenList.push({
          type: TokenType.yes,
          value: yes * 100,
        });
      }

      if (no !== '--') {
        tokenList.push({
          type: TokenType.no,
          value: no * 100,
        });
      }

      return (
        <motion.div variants={item} key={`${card?.ipfsHash}-${index}`} style={{ display: 'flex' }}>
          <StyledGrid item>
            <MarketCard
              title={card.question}
              hash={card.ipfsHash}
              cardState={phase}
              onClick={() => history.push(`/market/${card.marketId}/${cardLink}`)}
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
        {pending > 0 &&
          new Array(pending).fill('').map((_, index) => <SkeletonCard key={`skeleton-${index}`} />)}
        {getMarketList()}
      </Grid>
    </motion.div>
  );
};
