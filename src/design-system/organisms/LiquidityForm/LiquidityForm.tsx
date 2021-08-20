import * as React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid, Theme } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { FormikTextField } from '../../molecules/FormikTextField';
import { CustomButton } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { MarketTradeType, Token, TokenType } from '../../../interfaces';
import { PositionItem, PositionSummary } from '../SubmitBidCard/PositionSummary';
import {
  getLQTTokenId,
  getNoTokenId,
  getTokenQuantityById,
  getYesTokenId,
} from '../../../utils/misc';
import {
  minLiquidityTokensRequired,
  poolShareCalculation,
  tokensMovedToPool,
} from '../../../contracts/MarketCalculations';
import { roundToTwo, tokenDivideDown, tokenMultiplyUp } from '../../../utils/math';

const TokenPriceDefault = {
  yes: 0,
  no: 0,
};

const endAdornmentStyles: SxProps<Theme> = { whiteSpace: 'nowrap' };

export type LiquidityValue = {
  yesToken: string | number;
  noToken: string | number;
  tradeType: MarketTradeType;
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
  initialValues?: Omit<LiquidityValue, 'tradeType'>;
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
   * Trade type
   */
  tradeType: MarketTradeType;
  /**
   * Is wallet connected
   */
  connected?: boolean;
  /**
   * Token Price
   */
  tokenPrice?: {
    yes: number;
    no: number;
  };
}

export const LiquidityForm: React.FC<LiquidityFormProps> = ({
  title,
  tokenName = 'PMM',
  liquidityTokenName = 'LQT',
  handleSubmit,
  connected,
  tradeType,
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
  const [formValues, setFormValues] = React.useState({ yesToken: '', noToken: '', lqtToken: '' });
  const [expectedBalance, setExpectedBalance] = React.useState<PositionItem[]>([]);
  const [expectedStake, setExpectedStake] = React.useState<PositionItem[]>([]);

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
  }, [poolTotalSupply, poolTokens, userTokens, yesTokenId, noTokenId]);

  const validationSchema = React.useMemo(() => {
    if (tradeType === MarketTradeType.payIn) {
      if (connected) {
        const yesMax = roundToTwo(tokenDivideDown(userAmounts.yesToken));
        const noMax = roundToTwo(tokenDivideDown(userAmounts.noToken));
        const yesMin = yesMax !== 0 ? 0.000001 : 0;
        const noMin = noMax !== 0 ? 0.000001 : 0;
        return Yup.object({
          yesToken: Yup.number()
            .min(yesMin, `Min quantity is ${yesMin}`)
            .max(yesMax, `Insufficient Yes Tokens`)
            .required('Required'),
          noToken: Yup.number()
            .min(noMin, `Min quantity is ${noMin}`)
            .max(noMax, `Insufficient No Tokens`)
            .required('Required'),
        });
      }
      return Yup.object({
        yesToken: Yup.number().min(0.000001, `Min quantity is 0.000001`).required('Required'),
        noToken: Yup.number().min(0.000001, `Min quantity is 0.000001`).required('Required'),
      });
    }
    return Yup.object({
      lqtToken: Yup.number().min(0.000001, `Min quantity is 0.000001`).required('Required'),
    });
  }, [userAmounts, connected]);

  const initialFormValues: LiquidityValue = {
    ...formValues,
    tradeType,
  };

  const handleChange = React.useCallback(
    (e: any, tokenType: TokenType, setFieldValue: any) => {
      const [currentField, fieldToUpdate] =
        tokenType === TokenType.yes ? ['yesToken', 'noToken'] : ['noToken', 'yesToken'];
      const [aPool, bPool] =
        TokenType.yes === tokenType ? [pools.yesPool, pools.noPool] : [pools.noPool, pools.yesPool];
      const aToken = tokenMultiplyUp(e.target.value);
      const liquidityTokensMoved = minLiquidityTokensRequired(aToken, aPool, poolTotalSupply);
      const newPoolShare = poolShareCalculation(liquidityTokensMoved, poolTotalSupply);
      const bToken = tokensMovedToPool(bPool, newPoolShare);
      const [newYes, newNo] = TokenType.yes === tokenType ? [aToken, bToken] : [bToken, aToken];
      const expectedValue = tokenPrice.yes * newYes + tokenPrice.no * newNo;
      const expectedTotalValue =
        tokenPrice.yes * (userAmounts.yesToken - newYes) +
        tokenPrice.no * (userAmounts.noToken - newNo);
      const newLQTTokens = roundToTwo(tokenDivideDown(liquidityTokensMoved));
      const newPoolSharePercentage = roundToTwo(newPoolShare);

      if (userAmounts.lqtToken) {
        const currentLQT = roundToTwo(tokenDivideDown(userAmounts.lqtToken));
        const currentPoolShare = roundToTwo(
          poolShareCalculation(userAmounts.lqtToken, poolTotalSupply),
        );
        setExpectedStake([
          {
            label: `Liquidity Tokens`,
            value: `${currentLQT} ${liquidityTokenName} (+${newLQTTokens})`,
          },
          {
            label: t('stakeInPool'),
            value: `${currentPoolShare}% (+${newPoolSharePercentage})`,
          },
          {
            label: t('value'),
            value: `${roundToTwo(tokenDivideDown(expectedValue))} ${tokenName}`,
          },
        ]);
      } else {
        setExpectedStake([
          {
            label: `Liquidity Tokens`,
            value: `${newLQTTokens} ${liquidityTokenName}`,
          },
          {
            label: t('stakeInPool'),
            value: `${newPoolSharePercentage}%`,
          },
          {
            label: t('value'),
            value: `${roundToTwo(tokenDivideDown(expectedValue))} ${tokenName}`,
          },
        ]);
      }

      const newExpectedBalance: PositionItem[] = [
        {
          label: t('yesTokens'),
          value: `${roundToTwo(tokenDivideDown(userAmounts.yesToken - newYes))} (-${roundToTwo(
            tokenDivideDown(newYes),
          )})`,
        },
        {
          label: t('noTokens'),
          value: `${roundToTwo(tokenDivideDown(userAmounts.noToken - newNo))} (-${roundToTwo(
            tokenDivideDown(newNo),
          )})`,
        },
        {
          label: t('value'),
          value: `${roundToTwo(tokenDivideDown(expectedTotalValue))} ${tokenName}`,
        },
      ];
      setFormValues({
        ...formValues,
        [currentField]: Number(e.target.value),
        [fieldToUpdate]: roundToTwo(tokenDivideDown(bToken)),
      });
      setExpectedBalance(newExpectedBalance);
      if (!e.target.value) {
        setFieldValue(fieldToUpdate, '');
        setExpectedStake([]);
        setExpectedBalance([]);
      }
    },
    [
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
    ],
  );
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
                    {tradeType === MarketTradeType.payIn ? (
                      <>
                        <Grid item>
                          <Field
                            component={FormikTextField}
                            label={t('amount')}
                            name="yesToken"
                            type="number"
                            pattern="[0-9]*"
                            placeholder="Type here"
                            handleChange={(e: any) => {
                              validateForm();
                              handleChange(e, TokenType.yes, setFieldValue);
                            }}
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
                        </Grid>
                        <Grid item>
                          <Field
                            component={FormikTextField}
                            label=""
                            name="noToken"
                            type="number"
                            pattern="[0-9]*"
                            placeholder="Type here"
                            handleChange={(e: any) => {
                              validateForm();
                              handleChange(e, TokenType.no, setFieldValue);
                            }}
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
                        </Grid>
                      </>
                    ) : (
                      <Grid item>
                        <Field
                          component={FormikTextField}
                          label=""
                          name="lqtToken"
                          type="number"
                          pattern="[0-9]*"
                          placeholder="Type here"
                          handleChange={(e: any) => {
                            validateForm();
                            handleChange(e, TokenType.no, setFieldValue);
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
                      </Grid>
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
