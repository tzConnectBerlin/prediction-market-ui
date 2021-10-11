import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Paper } from '@mui/material';
import { Token } from '../../../interfaces';
import { PositionItem, PositionSummary } from '../SubmitBidCard/PositionSummary';
import {
  getLQTTokenId,
  getNoTokenId,
  getTokenQuantityById,
  getYesTokenId,
} from '../../../utils/misc';
import { calculatePoolShare, totalTokensValue } from '../../../contracts/MarketCalculations';
import { roundToTwo, roundTwoAndTokenDown } from '../../../utils/math';

const TokenPriceDefault = {
  yes: 0,
  no: 0,
};

export interface TradeSummaryProps {
  /**
   * Market Id
   */
  marketId: string;
  /**
   * Pool token values
   */
  poolTokens?: Token[];
  /**
   * Pool token Amount
   */
  poolTotalSupply: number;
  /**
   * User token values
   */
  userTokens?: Token[];
  /**
   * TokenName to display
   */
  tokenName?: string;
  /**
   * Liquidity TokenName to display
   */
  liquidityTokenName?: string;
  /**
   * Token Price
   */
  tokenPrice?: {
    yes: number;
    no: number;
  };
}

export const TradeSummary: React.FC<TradeSummaryProps> = ({
  tokenName = 'PMM',
  liquidityTokenName = 'LQT',
  poolTokens,
  userTokens,
  marketId,
  poolTotalSupply,
  tokenPrice = TokenPriceDefault,
}) => {
  const { t } = useTranslation('common');
  const yesTokenId = React.useMemo(() => getYesTokenId(marketId), [marketId]);
  const noTokenId = React.useMemo(() => getNoTokenId(marketId), [marketId]);
  const lqtTokenId = React.useMemo(() => getLQTTokenId(marketId), [marketId]);
  const [pools, setPools] = React.useState({
    yesPool: 0,
    noPool: 0,
  });
  const [userAmounts, setUserAmounts] = React.useState({
    yesToken: 0,
    noToken: 0,
    lqtToken: 0,
  });

  const [currentBalance, setCurrentBalance] = React.useState<PositionItem[]>([]);
  const [currentStake, setCurrentStake] = React.useState<PositionItem[]>([]);
  const poolTotalValue = totalTokensValue(
    pools.noPool,
    tokenPrice.no,
    pools.yesPool,
    tokenPrice.yes,
  );
  React.useEffect(() => {
    if (poolTokens) {
      const yesPool = getTokenQuantityById(poolTokens, yesTokenId);
      const noPool = getTokenQuantityById(poolTokens, noTokenId);
      setPools({
        yesPool,
        noPool,
      });
    }
    if (userTokens) {
      const yesToken = getTokenQuantityById(userTokens, yesTokenId);
      const noToken = getTokenQuantityById(userTokens, noTokenId);
      const lqtToken = getTokenQuantityById(userTokens, lqtTokenId);
      const currentTokensValue = totalTokensValue(
        userAmounts.yesToken,
        tokenPrice.yes,
        userAmounts.noToken,
        tokenPrice.no,
      );
      if (currentTokensValue) {
        setCurrentBalance([
          {
            label: t('yesTokens'),
            value: roundTwoAndTokenDown(yesToken),
          },
          {
            label: t('noTokens'),
            value: roundTwoAndTokenDown(noToken),
          },
          {
            label: t('value'),
            value: `${roundTwoAndTokenDown(currentTokensValue)} ${tokenName}`,
          },
        ]);
      } else {
        setCurrentBalance([]);
      }
      const currentPoolShare = calculatePoolShare(userAmounts.lqtToken, poolTotalSupply);
      const currentPoolAmount = currentPoolShare * poolTotalValue;
      if (currentPoolShare) {
        setCurrentStake([
          {
            label: t('liquidityTokens'),
            value: `${roundTwoAndTokenDown(lqtToken)} ${liquidityTokenName}`,
          },
          {
            label: t('stakeInPool'),
            value: `${roundToTwo(currentPoolShare * 100)}%`,
          },
          {
            label: t('value'),
            value: `${roundTwoAndTokenDown(currentPoolAmount)} ${tokenName}`,
          },
        ]);
      } else {
        setCurrentStake([]);
      }
      setUserAmounts({
        noToken,
        yesToken,
        lqtToken,
      });
    }
  }, [
    poolTotalSupply,
    poolTokens,
    userTokens,
    yesTokenId,
    noTokenId,
    lqtTokenId,
    userAmounts.lqtToken,
    pools.noPool,
    pools.yesPool,
    tokenPrice.no,
    tokenPrice.yes,
    t,
    tokenName,
    poolTotalValue,
  ]);

  return (
    <>
      {(currentStake.length > 0 || currentBalance.length) > 0 && (
        <Paper sx={{ padding: 1.5 }}>
          <Grid container direction="column" spacing={2}>
            {currentBalance.length > 0 && (
              <Grid item>
                <PositionSummary title={t('currentBalance')} items={currentBalance} />
              </Grid>
            )}
            {currentStake.length > 0 && (
              <Grid item>
                <PositionSummary title={t('currentStake')} items={currentStake} />
              </Grid>
            )}
          </Grid>
        </Paper>
      )}
    </>
  );
};
