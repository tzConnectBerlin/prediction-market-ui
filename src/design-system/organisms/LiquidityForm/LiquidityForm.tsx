import * as React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid, Theme } from '@material-ui/core';
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
  totalTokensValue,
  minAfterSlippage,
} from '../../../contracts/MarketCalculations';
import { roundToTwo, roundTwoAndTokenDown, tokenMultiplyUp } from '../../../utils/math';
import { useStore } from '../../../store/store';
import { useUserBalance } from '../../../api/queries';

const defaultTokenPrice = {
  yes: 0,
  no: 0,
};
const defaultTokenName = 'PMM';
const defaultLiquidityTokenName = 'LQT';

type LiquidityOperationType = 'add' | 'remove';

const endAdornmentStyles: SxProps<Theme> = { whiteSpace: 'nowrap' };

const DEFAULT_MIN_QUANTITY = 0.000001;

export type LiquidityValue = {
  pmmAmount?: string | number;
  lqtToken?: string | number;
  yesToken?: string | number;
  noToken?: string | number;
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
export const LiquidityForm: React.FC<LiquidityFormProps> = ({
  title,
  tokenName = defaultTokenName,
  liquidityTokenName = defaultLiquidityTokenName,
  handleSubmit,
  connected,
  account,
  operationType,
  poolTokens,
  userTokens,
  marketId,
  poolTotalSupply,
  tokenPrice = defaultTokenPrice,
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
    pmmAmount: '',
    operationType: 'add',
    minNoToken: 0,
    minYesToken: 0,
  });
  const [expectedBalance, setExpectedBalance] = React.useState<PositionItem[]>([]);
  const [expectedStake, setExpectedStake] = React.useState<PositionItem[]>([]);
  const { slippage } = useStore();

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

  const validationSchema = React.useMemo(() => {
    if (operationType === 'add') {
      if (connected) {
        const yesMax = roundTwoAndTokenDown(userAmounts.yesToken);
        const noMax = roundTwoAndTokenDown(userAmounts.noToken);
        const yesMin = yesMax !== 0 ? DEFAULT_MIN_QUANTITY : 0;
        const noMin = noMax !== 0 ? DEFAULT_MIN_QUANTITY : 0;
        return Yup.object({
          yesToken: Yup.number()
            .min(yesMin, t('minQuantity', { quantity: yesMin }))
            .max(yesMax, t('insufficientTokens', { token: t(TokenType.yes) }))
            .required(t('required')),
          noToken: Yup.number()
            .min(noMin, t('minQuantity', { quantity: noMin }))
            .max(noMax, t('insufficientTokens', { token: t(TokenType.no) }))
            .required(t('required')),
        });
      }
      return Yup.object({
        yesToken: Yup.number()
          .min(DEFAULT_MIN_QUANTITY, t('minQuantity', { quantity: DEFAULT_MIN_QUANTITY }))
          .required(t('required')),
        noToken: Yup.number()
          .min(DEFAULT_MIN_QUANTITY, t('minQuantity', { quantity: DEFAULT_MIN_QUANTITY }))
          .required(t('required')),
      });
    }
    if (connected) {
      const lqtMax = roundTwoAndTokenDown(userAmounts.lqtToken);
      return Yup.object({
        lqtToken: Yup.number()
          .min(DEFAULT_MIN_QUANTITY, t('minQuantity', { quantity: DEFAULT_MIN_QUANTITY }))
          .max(lqtMax, t('insufficientTokens', { token: t('liquidity') }))
          .required(t('required')),
      });
    }
    return Yup.object({
      lqtToken: Yup.number()
        .min(DEFAULT_MIN_QUANTITY, t('minQuantity', { quantity: DEFAULT_MIN_QUANTITY }))
        .required(t('required')),
    });
  }, [
    operationType,
    connected,
    t,
    userAmounts.yesToken,
    userAmounts.noToken,
    userAmounts.lqtToken,
  ]);

  const handleChange = React.useCallback(
    (e: any, tokenType: TokenType, setFieldValue: any) => {
      const [currentField, fieldToUpdate] =
        tokenType === TokenType.yes ? ['yesToken', 'noToken'] : ['noToken', 'yesToken'];
      if (!e.target.value) {
        setFieldValue(fieldToUpdate, '');
        setExpectedStake([]);
        setExpectedBalance([]);
        return;
      }
      const [aPool, bPool] =
        TokenType.yes === tokenType ? [pools.yesPool, pools.noPool] : [pools.noPool, pools.yesPool];
      const aToken = tokenMultiplyUp(e.target.value);
      const liquidityTokensMoved = minLiquidityTokensRequired(aToken, aPool, poolTotalSupply);
      const newPoolShare = calculatePoolShare(
        liquidityTokensMoved,
        poolTotalSupply + liquidityTokensMoved,
      );
      const bToken = tokensMovedToPool(bPool, liquidityTokensMoved / poolTotalSupply);
      const [newYes, newNo] = TokenType.yes === tokenType ? [aToken, bToken] : [bToken, aToken];
      const minYesToken = minAfterSlippage(newYes, slippage);
      const minNoToken = minAfterSlippage(newNo, slippage);
      const expectedValue = totalTokensValue(newYes, tokenPrice.yes, newNo, tokenPrice.no);
      const expectedTotalValue = totalTokensValue(
        userAmounts.yesToken - newYes,
        tokenPrice.yes,
        userAmounts.noToken - newNo,
        tokenPrice.no,
      );
      const newLQTTokens = roundTwoAndTokenDown(liquidityTokensMoved);
      const newPoolSharePercentage = roundToTwo(newPoolShare * 100);

      if (userAmounts.lqtToken) {
        const currentLQT = roundTwoAndTokenDown(userAmounts.lqtToken);
        const currentPoolShare = roundToTwo(
          calculatePoolShare(userAmounts.lqtToken, poolTotalSupply) * 100,
        );
        setExpectedStake([
          {
            label: t('liquidityTokens'),
            value: `${currentLQT} ${liquidityTokenName} (+${newLQTTokens})`,
          },
          {
            label: t('stakeInPool'),
            value: `${currentPoolShare}% (+${newPoolSharePercentage}%)`,
          },
          {
            label: t('value'),
            value: `${roundTwoAndTokenDown(expectedValue)} ${tokenName}`,
          },
        ]);
      } else {
        setExpectedStake([
          {
            label: t('liquidityTokens'),
            value: `${newLQTTokens} ${liquidityTokenName}`,
          },
          {
            label: t('stakeInPool'),
            value: `${newPoolSharePercentage}%`,
          },
          {
            label: t('value'),
            value: `${roundTwoAndTokenDown(expectedValue)} ${tokenName}`,
          },
        ]);
      }

      if (connected) {
        const remainingYes = userAmounts.yesToken - newYes;
        const remainingNo = userAmounts.noToken - newNo;
        const newExpectedBalance: PositionItem[] = [
          {
            label: t('yesTokens'),
            value: `${roundTwoAndTokenDown(remainingYes)} (-${roundTwoAndTokenDown(newYes)})`,
          },
          {
            label: t('noTokens'),
            value: `${roundTwoAndTokenDown(remainingNo)} (-${roundTwoAndTokenDown(newNo)})`,
          },
          {
            label: t('value'),
            value: `${roundTwoAndTokenDown(expectedTotalValue)} ${tokenName}`,
          },
        ];
        setExpectedBalance(newExpectedBalance);
      }
      setFieldValue(currentField, Number(e.target.value)).then(() =>
        setFieldValue(fieldToUpdate, roundTwoAndTokenDown(bToken)),
      );

      setFormValues({
        ...formValues,
        [currentField]: Number(e.target.value),
        [fieldToUpdate]: roundTwoAndTokenDown(bToken),
        lqtToken: liquidityTokensMoved,
        minYesToken,
        minNoToken,
      });
    },
    [
      connected,
      formValues,
      liquidityTokenName,
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
      const liquidityTokensMoved = tokenMultiplyUp(e.target.value);
      const removedPoolShare = roundToTwo(
        calculatePoolShare(liquidityTokensMoved, poolTotalSupply) * 100,
      );
      const removedYesTokens = liquidityToTokens(
        pools.yesPool,
        liquidityTokensMoved,
        poolTotalSupply,
      );
      const minYesToken = minAfterSlippage(removedYesTokens, slippage);
      const removedNoTokens = liquidityToTokens(
        pools.noPool,
        liquidityTokensMoved,
        poolTotalSupply,
      );
      const minNoToken = minAfterSlippage(removedNoTokens, slippage);
      if (userAmounts.lqtToken) {
        const currentLQT = roundTwoAndTokenDown(userAmounts.lqtToken);
        const currentPoolShare = roundToTwo(
          calculatePoolShare(userAmounts.lqtToken, poolTotalSupply) * 100,
        );
        const updatedPoolShare = roundToTwo(
          calculatePoolShare(userAmounts.lqtToken - liquidityTokensMoved, poolTotalSupply) * 100,
        );
        const expectedValue = totalTokensValue(
          userAmounts.yesToken - removedYesTokens,
          tokenPrice.yes,
          userAmounts.noToken - removedNoTokens,
          tokenPrice.no,
        );
        if (updatedPoolShare < 0) {
          setExpectedStake([]);
        } else {
          setExpectedStake([
            {
              label: t('liquidityTokens'),
              value: `${currentLQT} ${liquidityTokenName} (-${e.target.value})`,
            },
            {
              label: t('stakeInPool'),
              value: `${currentPoolShare}% (-${updatedPoolShare})`,
            },
            {
              label: t('value'),
              value: `${roundTwoAndTokenDown(expectedValue)} ${tokenName}`,
            },
          ]);
        }
      } else {
        const expectedValue = totalTokensValue(
          removedYesTokens,
          tokenPrice.yes,
          removedNoTokens,
          tokenPrice.no,
        );
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
            value: `${roundTwoAndTokenDown(expectedValue)} ${tokenName}`,
          },
        ]);
      }

      if (connected) {
        const remainingYesTokens = userAmounts.yesToken + removedYesTokens;
        const remainingNoTokens = userAmounts.noToken + removedNoTokens;
        const expectedValue = totalTokensValue(
          remainingYesTokens,
          tokenPrice.yes,
          remainingNoTokens,
          tokenPrice.no,
        );
        const newExpectedBalance: PositionItem[] = [
          {
            label: t('yesTokens'),
            value: `${roundTwoAndTokenDown(remainingYesTokens)} (+${roundTwoAndTokenDown(
              removedYesTokens,
            )})`,
          },
          {
            label: t('noTokens'),
            value: `${roundTwoAndTokenDown(remainingNoTokens)} (+${roundTwoAndTokenDown(
              removedNoTokens,
            )})`,
          },
          {
            label: t('value'),
            value: `${roundTwoAndTokenDown(expectedValue)} ${tokenName}`,
          },
        ];
        setExpectedBalance(newExpectedBalance);
      }
      setFormValues({
        ...formValues,
        operationType: 'remove',
        lqtToken: e.target.value,
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
                  <Grid item width="100%">
                    {operationType === 'add' ? (
                      <>
                        <Field
                          component={FormikTextField}
                          label={t('amount')}
                          name="yesToken"
                          type="number"
                          pattern="[0-9]*"
                          placeholder={t('inputFieldPlaceholder')}
                          handleChange={(e: any) => handleChange(e, TokenType.yes, setFieldValue)}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <Typography
                                color="text.secondary"
                                component="span"
                                sx={endAdornmentStyles}
                              >
                                {t('yesTokens')}
                              </Typography>
                            ),
                          }}
                          required
                        />
                        <Field
                          component={FormikTextField}
                          label=""
                          name="noToken"
                          type="number"
                          pattern="[0-9]*"
                          placeholder={t('inputFieldPlaceholder')}
                          handleChange={(e: any) => handleChange(e, TokenType.no, setFieldValue)}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <Typography
                                color="text.secondary"
                                component="span"
                                sx={endAdornmentStyles}
                              >
                                {t('noTokens')}
                              </Typography>
                            ),
                          }}
                        />
                      </>
                    ) : (
                      <Field
                        component={FormikTextField}
                        label=""
                        name="lqtToken"
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
                              {liquidityTokenName}
                            </Typography>
                          ),
                        }}
                      />
                    )}
                  </Grid>
                  {expectedStake.length > 0 && (
                    <Grid item>
                      <PositionSummary
                        title={userAmounts.lqtToken ? t('adjustedStake') : t('expectedStake')}
                        items={expectedStake}
                      />
                    </Grid>
                  )}
                  {connected && expectedBalance.length > 0 && (
                    <Grid item>
                      <PositionSummary
                        title={userAmounts.lqtToken ? t('adjustedBalance') : t('expectedBalance')}
                        items={expectedBalance}
                      />
                    </Grid>
                  )}
                  <Grid item flexDirection="column" marginTop="0.5rem">
                    <CustomButton
                      lowercase
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
