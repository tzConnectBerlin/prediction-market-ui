import * as React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid, Theme, useTheme } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { FormikTextField } from '../../molecules/FormikTextField';
import { CustomButton } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { Token, TokenType } from '../../../interfaces';
import { PositionItem, PositionSummary } from '../SubmitBidCard/PositionSummary';
import {
  getLQTTokenId,
  getNoTokenId,
  getTokenQuantityById,
  getYesTokenId,
} from '../../../utils/misc';
import {
  liquidityToTokens,
  minLiquidityTokensRequired,
  calculatePoolShare,
  tokensMovedToPool,
} from '../../../contracts/MarketCalculations';
import { roundToTwo, tokenDivideDown, tokenMultiplyUp } from '../../../utils/math';
import { useStore } from '../../../store/store';
import { CURRENCY_SYMBOL } from '../../../globals';
import { useUserBalance } from '../../../api/queries';
import { IconTooltip } from '../../atoms/IconTooltip';

const TokenPriceDefault = {
  yes: 0,
  no: 0,
};

type LiquidityOperationType = 'add' | 'remove';

const endAdornmentStyles: SxProps<Theme> = { whiteSpace: 'nowrap' };

const DEFAULT_MIN_QUANTITY = 0.000001;

export type LiquidityValue = {
  pmmAmount?: string | number;
  lqtToken?: string | number;
  yesToken?: string | number;
  noToken?: string | number;
  percent?: string | number;
  operationType: LiquidityOperationType;
  minYesToken: number;
  minNoToken: number;
};

export interface LiquidityFormProps {
  /**
   * Callback to get the form values
   */
  handleSubmit: (
    values: LiquidityValue,
    formikHelpers: FormikHelpers<LiquidityValue>,
  ) => void | Promise<void>;
  /**
   * Initial values to use when initializing the form. Default is 0.
   */
  initialValues?: Omit<LiquidityValue, 'operationType' | 'minYesToken' | 'minNoToken'>;
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
   * Title form to display
   */
  title: string;
  /**
   * TokenName to display
   */
  tokenName?: string;
  /**
   * Liquidity TokenName to display
   */
  liquidityTokenName?: string;
  /**
   * Liquidity Operation Type
   */
  operationType: LiquidityOperationType;
  /**
   * Is wallet connected
   */
  connected?: boolean;
  /**
   * address of the active account
   */
  account?: string;
  /**
   * Token Price
   */
  tokenPrice?: {
    yes: number;
    no: number;
  };
}

/**
 *
 * TODO: Divide the component in smaller parts
 */
export const BasicLiquidityForm: React.FC<LiquidityFormProps> = ({
  title,
  tokenName = 'PMM',
  liquidityTokenName = 'LQT',
  handleSubmit,
  connected,
  account,
  operationType,
  poolTokens,
  userTokens,
  marketId,
  initialValues,
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
  const [formValues, setFormValues] = React.useState<LiquidityValue>({
    yesToken: '',
    noToken: '',
    lqtToken: '',
    percent: '',
    pmmAmount: '',
    operationType: 'add',
    minNoToken: 0,
    minYesToken: 0,
  });
  const theme = useTheme();
  const [expectedBalance, setExpectedBalance] = React.useState<PositionItem[]>([]);
  const [expectedStake, setExpectedStake] = React.useState<PositionItem[]>([]);
  const [currentStake, setCurrentStake] = React.useState<PositionItem[]>([]);
  const { slippage } = useStore();
  const { data: pmmBalance } = useUserBalance(account);
  const poolTotalValue = pools.noPool * tokenPrice.no + pools.yesPool * tokenPrice.yes;
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
      const currentPoolShare = calculatePoolShare(userAmounts.lqtToken, poolTotalSupply);
      const currentPoolAmount = currentPoolShare * poolTotalValue;
      if (currentPoolShare && connected) {
        setCurrentStake([
          {
            label: t('stakeInPool'),
            value: `${roundToTwo(currentPoolShare * 100)}%`,
          },
          {
            label: t('value'),
            value: `${roundToTwo(tokenDivideDown(currentPoolAmount))} ${tokenName}`,
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
    connected,
    t,
    tokenName,
  ]);
  const BalanceDescription = () => (
    <Grid container direction="row" alignItems="center">
      {t('expectedBalance')}
      <IconTooltip
        description={t('expectedBalanceDetail')}
        placement="bottom-start"
        maxWidth={theme.spacing(31)}
      />
    </Grid>
  );
  const validationSchema = React.useMemo(() => {
    if (operationType === 'add') {
      const pmmMin = pmmBalance !== 0 ? DEFAULT_MIN_QUANTITY : 0;
      if (connected) {
        return Yup.object({
          pmmAmount: Yup.number()
            .min(pmmMin, t('minQuantity', { quantity: pmmMin }))
            .max(pmmBalance ?? 0, t('insufficientBalance'))
            .required(t('required')),
        });
      }
      return Yup.object({
        pmmAmount: Yup.number()
          .min(pmmMin, t('minQuantity', { quantity: pmmMin }))
          .required(t('required')),
      });
    }
    if (connected) {
      const lqtMax = (userAmounts.lqtToken / poolTotalSupply) * 100;
      return Yup.object({
        percent: Yup.number()
          .min(DEFAULT_MIN_QUANTITY, t('minQuantity', { quantity: DEFAULT_MIN_QUANTITY }))
          .max(lqtMax, t('insufficientStake'))
          .required(t('required')),
      });
    }
    return Yup.object({
      percent: Yup.number()
        .min(DEFAULT_MIN_QUANTITY, t('minQuantity', { quantity: DEFAULT_MIN_QUANTITY }))
        .required(t('required')),
    });
  }, [poolTotalSupply, operationType, connected, t, pmmBalance, userAmounts.lqtToken]);

  const handleChange = React.useCallback(
    (e: any, setFieldValue: any) => {
      if (!e.target.value) {
        setExpectedStake([]);
        setExpectedBalance([]);
        return;
      }
      const [limitingToken, otherToken] =
        pools.yesPool > pools.noPool
          ? [
              { token: TokenType.no, price: tokenPrice.no },
              { token: TokenType.yes, price: tokenPrice.yes },
            ]
          : [
              { token: TokenType.yes, price: tokenPrice.yes },
              { token: TokenType.no, price: tokenPrice.no },
            ];
      const leftoverTokenValue =
        e.target.value - (otherToken.price * e.target.value) / limitingToken.price;
      const [aPool, bPool] =
        limitingToken.token === TokenType.no
          ? [pools.yesPool, pools.noPool]
          : [pools.noPool, pools.yesPool];
      const aToken = tokenMultiplyUp(e.target.value);
      const liquidityTokensMoved = minLiquidityTokensRequired(aToken, aPool, poolTotalSupply);
      const newPoolShare = calculatePoolShare(
        liquidityTokensMoved,
        poolTotalSupply + liquidityTokensMoved,
      );
      const bToken = tokensMovedToPool(bPool, liquidityTokensMoved / poolTotalSupply);
      const [newYes, newNo] =
        limitingToken.token === TokenType.no ? [aToken, bToken] : [bToken, aToken];
      const minYesToken = newYes - (slippage * newYes) / 100;
      const minNoToken = newNo - (slippage * newNo) / 100;
      const expectedValue = tokenPrice.yes * newYes + tokenPrice.no * newNo;
      const newPoolSharePercentage = roundToTwo(newPoolShare * 100);
      const totalBalanceValue =
        limitingToken.token === 'Yes'
          ? (userAmounts.yesToken + leftoverTokenValue) * tokenPrice.yes +
            userAmounts.noToken * tokenPrice.no
          : (userAmounts.noToken + leftoverTokenValue) * tokenPrice.no +
            userAmounts.yesToken * tokenPrice.yes;
      setFieldValue(e.target.value);
      if (userAmounts.lqtToken) {
        const currentPoolShare = calculatePoolShare(userAmounts.lqtToken, poolTotalSupply);
        setExpectedStake([
          {
            label: t('stakeInPool'),
            value: `${roundToTwo(currentPoolShare * 100 + newPoolSharePercentage)}%`,
          },
          {
            label: t('value'),
            value: `${roundToTwo(
              tokenDivideDown(currentPoolShare * poolTotalValue + expectedValue),
            )} ${tokenName}`,
          },
        ]);
        setExpectedBalance([
          {
            label: t('yesTokens'),
            value: `${roundToTwo(tokenDivideDown(userAmounts.yesToken))}${
              limitingToken.token === 'Yes' ? ` (+${roundToTwo(leftoverTokenValue)})` : '(+0)'
            }`,
          },
          {
            label: t('noTokens'),
            value: `${roundToTwo(tokenDivideDown(userAmounts.noToken))}${
              limitingToken.token === 'No' ? ` (+${roundToTwo(leftoverTokenValue)})` : '(+0)'
            }`,
          },
          {
            label: t('value'),
            value: `${roundToTwo(tokenDivideDown(totalBalanceValue))} ${tokenName}`,
          },
        ]);
      } else {
        setExpectedStake([
          {
            label: t('stakeInPool'),
            value: `${newPoolSharePercentage}%`,
          },
        ]);
      }
      setFormValues({
        ...formValues,
        pmmAmount: Number(e.target.value),
        lqtToken: liquidityTokensMoved,
        minYesToken,
        minNoToken,
      });
    },
    [
      formValues,
      poolTotalSupply,
      pools.noPool,
      pools.yesPool,
      t,
      tokenName,
      tokenPrice.no,
      tokenPrice.yes,
      userAmounts.lqtToken,
      userAmounts.noToken,
      userAmounts.yesToken,
      slippage,
    ],
  );

  const handleLQTChange = React.useCallback(
    (e: any) => {
      if (!e.target.value) {
        setFormValues({
          ...formValues,
          lqtToken: '',
        });
        setExpectedStake([]);
        setExpectedBalance([]);
        return;
      }

      const removedPoolShare = e.target.value / 100;
      const liquidityTokensMoved =
        userAmounts.lqtToken *
        (removedPoolShare / calculatePoolShare(userAmounts.lqtToken, poolTotalSupply));

      const removedYesTokens = tokenDivideDown(
        liquidityToTokens(pools.yesPool, liquidityTokensMoved, poolTotalSupply),
      );
      const minYesToken = removedYesTokens - (slippage * removedYesTokens) / 100;
      const removedNoTokens = tokenDivideDown(
        liquidityToTokens(pools.noPool, liquidityTokensMoved, poolTotalSupply),
      );
      const minNoToken = removedNoTokens - (slippage * removedNoTokens) / 100;
      const updatedPoolShare =
        ((userAmounts.lqtToken - liquidityTokensMoved) / poolTotalSupply) * 100;
      const expectedValue = (updatedPoolShare * poolTotalValue) / 100;
      if (userAmounts.lqtToken) {
        if (updatedPoolShare < 0) {
          setExpectedStake([]);
        } else
          setExpectedStake([
            {
              label: t('stakeInPool'),
              value: `${roundToTwo(updatedPoolShare)}%`,
            },
            {
              label: t('value'),
              value: `${roundToTwo(tokenDivideDown(expectedValue))} ${tokenName}`,
            },
          ]);
      } else {
        const totalValue = removedYesTokens * tokenPrice.yes + removedNoTokens * tokenPrice.no;
        setExpectedStake([
          {
            label: t('liquidityTokens'),
            value: `${e.target.value} ${liquidityTokenName}`,
          },
          {
            label: t('stakeInPool'),
            value: `${roundToTwo(removedPoolShare)}%`,
          },
          {
            label: t('value'),
            value: `${roundToTwo(tokenDivideDown(totalValue))} ${tokenName}`,
          },
        ]);
      }

      if (connected) {
        const currentPoolAmount =
          calculatePoolShare(userAmounts.lqtToken, poolTotalSupply) * poolTotalValue;
        const newExpectedBalance: PositionItem[] = [
          {
            label: t('value'),
            value: `${Math.abs(
              roundToTwo(tokenDivideDown(expectedValue - currentPoolAmount)),
            )} ${tokenName}`,
          },
        ];
        setExpectedBalance(newExpectedBalance);
      }
      setFormValues({
        ...formValues,
        operationType: 'remove',
        percent: e.target.value,
        lqtToken: tokenDivideDown(liquidityTokensMoved),
        yesToken: removedYesTokens,
        noToken: removedNoTokens,
        minNoToken,
        minYesToken,
      });
    },
    [
      connected,
      formValues,
      liquidityTokenName,
      poolTotalSupply,
      pools.noPool,
      pools.yesPool,
      poolTotalValue,
      t,
      tokenName,
      tokenPrice.no,
      tokenPrice.yes,
      userAmounts.lqtToken,
      userAmounts.noToken,
      userAmounts.yesToken,
      slippage,
    ],
  );

  const initialFormValues: LiquidityValue = {
    ...formValues,
    operationType,
  };

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={initialFormValues}
            enableReinitialize
            validateOnBlur
            validateOnChange
          >
            {({ isValid, setFieldValue, validateForm }) => (
              <Form>
                <Grid
                  container
                  spacing={3}
                  direction="column"
                  alignContent="flex-start"
                  justifyContent="center"
                >
                  <Grid item container direction="column" width="100%">
                    {operationType === 'add' ? (
                      <>
                        <Grid item>
                          <Field
                            component={FormikTextField}
                            label={t('amount')}
                            name="pmmAmount"
                            type="number"
                            pattern="[0-9]*"
                            placeholder={t('inputFieldPlaceholder')}
                            handleChange={(e: any) => {
                              validateForm();
                              handleChange(e, setFieldValue);
                            }}
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <Typography
                                  color="text.secondary"
                                  component="span"
                                  sx={endAdornmentStyles}
                                >
                                  {CURRENCY_SYMBOL}
                                </Typography>
                              ),
                            }}
                            required
                          />
                        </Grid>
                      </>
                    ) : (
                      <Grid item>
                        <Field
                          component={FormikTextField}
                          label={t('amountToRemove')}
                          name="percent"
                          type="number"
                          pattern="[0-9]*"
                          placeholder={t('inputFieldPlaceholder')}
                          handleChange={(e: any) => {
                            validateForm();
                            handleLQTChange(e);
                          }}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <Typography
                                color="text.secondary"
                                component="span"
                                sx={endAdornmentStyles}
                              >
                                %
                              </Typography>
                            ),
                          }}
                        />
                      </Grid>
                    )}
                  </Grid>
                  {currentStake.length > 0 && (
                    <Grid item>
                      <PositionSummary title={t('currentStake')} items={currentStake} />
                    </Grid>
                  )}
                  {expectedStake.length > 0 && (
                    <Grid item>
                      <PositionSummary title={t('expectedStake')} items={expectedStake} />
                    </Grid>
                  )}
                  {connected && expectedBalance.length > 0 && (
                    <Grid item>
                      <PositionSummary
                        title={
                          operationType === 'remove' ? (
                            t('expectedWithdraw')
                          ) : (
                            <BalanceDescription />
                          )
                        }
                        items={expectedBalance}
                      />
                    </Grid>
                  )}
                  <Grid item flexDirection="column">
                    <CustomButton
                      color="primary"
                      type="submit"
                      label={!connected ? `${t('connectWallet')} + ${t(title)}` : t(title)}
                      fullWidth
                      disabled={!isValid}
                    />
                    <Typography size="body1" mt="1rem">
                      {t('requiredField')}
                    </Typography>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};
