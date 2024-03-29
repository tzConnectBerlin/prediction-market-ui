import * as React from 'react';
import { Grid, Theme, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns-tz';
import { MarketCard } from '../MarketCard';
import { MarketCardData, MarketCardToken, TokenType } from '../../../interfaces';
import { roundToTwo } from '../../../utils/math';
import { SkeletonCard } from '../SkeletonCard';
import { questionToURL } from '../../../utils/misc';
import { CURRENCY_SYMBOL } from '../../../globals';

const StyledGrid = styled(Grid)`
  display: flex;
`;

const StyledMotionDiv = styled(motion.div)<{ theme: Theme }>`
  display: flex;

  ${({ theme }) => `${theme.breakpoints.down('sm')} {
    width: 100%;
  }`}

  ${({ theme }) => `${theme.breakpoints.between('sm', 'md')} {
    width: 50%;
  }`}

  ${({ theme }) => `${theme.breakpoints.up('md')} {
    width: 33.33%;
  }`}
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

const defaultPending = 0;

export const MarketCardList: React.FC<MarketCardListProps> = ({
  cardList,
  pending = defaultPending,
}) => {
  const { t } = useTranslation(['common']);
  const theme = useTheme();

  const getMarketList = () => {
    return cardList.map((card, index) => {
      const cardLink = questionToURL(card.question);
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
          type: t('outcome'),
          value: card.winningPrediction.toUpperCase(),
        });
        stats.push({
          type: t('resolvedOn'),
          value: format(new Date(card.bakedAt), 'PP'),
        });
      } else {
        if (card.weekly) {
          stats.push({
            type: t('weekly'),
            value: `+${card.weekly.change}%`,
            tokenType: card.weekly.tokenType,
          });
        } else if (!card.weekly && !card.winningPrediction) {
          stats.push({
            type: t('weekly'),
            value: '---',
          });
        }
        stats.push({
          type: t('liquidity'),
          value: card.liquidity ? `${card.liquidity} ${CURRENCY_SYMBOL}` : '--',
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

      if (typeof yes !== 'string') {
        tokenList.push({
          type: TokenType.yes,
          value: roundToTwo(yes * 100),
        });
      }

      if (typeof no !== 'string') {
        tokenList.push({
          type: TokenType.no,
          value: roundToTwo(no * 100),
        });
      }

      return (
        <StyledMotionDiv variants={item} theme={theme} key={`${card?.ipfsHash}-${index}`}>
          <StyledGrid item xs={12}>
            <MarketCard
              title={card.question}
              hash={card.ipfsHash}
              cardState={phase}
              cardStateProps={{
                backgroundColor,
                fontColor,
              }}
              marketURL={`/market/${card.marketId}/${cardLink}`}
              iconURL={card.iconURL}
              tokenList={tokenList}
              statisticList={stats}
            />
          </StyledGrid>
        </StyledMotionDiv>
      );
    });
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <Grid justifyContent="flex-start" container role="grid">
        {pending > 0 &&
          new Array(pending).fill('').map((_, index) => <SkeletonCard key={`skeleton-${index}`} />)}
        {getMarketList()}
      </Grid>
    </motion.div>
  );
};
