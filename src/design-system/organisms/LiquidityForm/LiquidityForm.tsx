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
import { getNoTokenId, getTokenQuantityById, getYesTokenId } from '../../../utils/misc';
import {
  liquidityTokensMovedToPool,
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
  const [pools, setPools] = React.useState({
    yesPool: 0,
    noPool: 0,
  });
  const [userAmounts, setUserAmounts] = React.useState({
    yesToken: 0,
    noToken: 0,
  });
  const [poolShare, setPoolShare] = React.useState(0);
  const [expectedBalance, setExpectedBalance] = React.useState<PositionItem[]>([]);
  const [expectedStake, setExpectedStake] = React.useState<PositionItem[]>([]);
  const [adjustedBalance, setAdjustedBalance] = React.useState<PositionItem[]>([]);
  const [adjustedStake, setAdjustedStake] = React.useState<PositionItem[]>([]);

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
      setUserAmounts({
        noToken,
        yesToken,
      });
    }
  }, [poolTotalSupply, poolTokens, userTokens, yesTokenId, noTokenId]);

  const validationSchema = React.useMemo(() => {
    if (connected) {
      const yesMax = roundToTwo(tokenDivideDown(userAmounts.yesToken));
      const noMax = roundToTwo(tokenDivideDown(userAmounts.noToken));
      return Yup.object({
        yesToken: Yup.number()
          .min(0.000001, `Min quantity is 0.000001`)
          .max(yesMax, `Max allowed quantity is ${yesMax}`)
          .required('Required'),
        noToken: Yup.number()
          .min(0.000001, `Min quantity is 0.000001`)
          .max(noMax, `Max allowed quantity is ${noMax}`)
          .required('Required'),
      });
    }
    return Yup.object({
      yesToken: Yup.number().min(0.000001, `Min quantity is 0.000001`).required('Required'),
      noToken: Yup.number().min(0.000001, `Min quantity is 0.000001`).required('Required'),
    });
  }, [userAmounts, connected]);

  const initialFormValues: LiquidityValue = {
    yesToken: '',
    noToken: '',
    tradeType,
  };

  const handleChange = (e: any, setFieldValue: any, fieldName: string, tokenType: TokenType) => {
    if (connected) {
      const [aPool, bPool] =
        TokenType.yes === tokenType ? [pools.yesPool, pools.noPool] : [pools.noPool, pools.yesPool];
      const aToken = tokenMultiplyUp(e.target.value);
      const l = liquidityTokensMovedToPool(aToken, aPool, poolTotalSupply);
      setPoolShare(poolShareCalculation(l, poolTotalSupply));
      const bToken = tokensMovedToPool(bPool, poolShare);
      setFieldValue(fieldName, roundToTwo(tokenDivideDown(bToken)));
      const [newYes, newNo] = TokenType.yes === tokenType ? [aToken, bToken] : [bToken, aToken];
      const expectedValue = tokenPrice.yes * newYes + tokenPrice.no * newNo;
      const expectedTotalValue =
        tokenPrice.yes * (userAmounts.yesToken - newYes) +
        tokenPrice.no * (userAmounts.noToken - newNo);
      const newExpectedPosition: PositionItem[] = [
        {
          label: `Liquidity Tokens`,
          value: `${roundToTwo(tokenDivideDown(l))} ${liquidityTokenName}`,
        },
        {
          label: t('stakeInPool'),
          value: `${roundToTwo(tokenDivideDown(poolShare))}%`,
        },
        {
          label: `value`,
          value: `${roundToTwo(tokenDivideDown(expectedValue))} ${tokenName}`,
        },
      ];
      setExpectedStake(newExpectedPosition);
      const newExpectedBalance: PositionItem[] = [
        {
          label: t('yesTokens'),
          value: `${roundToTwo(tokenDivideDown(userAmounts.yesToken + newYes))} (-${roundToTwo(
            tokenDivideDown(newYes),
          )})`,
        },
        {
          label: t('noTokens'),
          value: `${roundToTwo(tokenDivideDown(userAmounts.noToken + newNo))} (-${roundToTwo(
            tokenDivideDown(newNo),
          )})`,
        },
        {
          label: t('value'),
          value: `${roundToTwo(tokenDivideDown(expectedTotalValue))} ${tokenName}`,
        },
      ];
      setExpectedBalance(newExpectedBalance);

      if (!e.target.value) {
        setFieldValue(fieldName, '');
        setExpectedStake([]);
        setExpectedBalance([]);
      }
    }
  };
  return (
    <>
      {tradeType === MarketTradeType.payIn && (
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Formik
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              initialValues={initialFormValues}
              enableReinitialize
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
                      <Grid item>
                        <Field
                          component={FormikTextField}
                          label={t('amount')}
                          name="yesToken"
                          type="number"
                          pattern="[0-9]*"
                          placeholder="Type here"
                          handleChange={(e: any) => {
                            handleChange(e, setFieldValue, 'noToken', TokenType.yes);
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
                            handleChange(e, setFieldValue, 'yesToken', TokenType.no);
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
                    </Grid>
                    {connected && (
                      <>
                        {expectedStake.length > 0 && (
                          <Grid item>
                            <PositionSummary title={t('expectedStake')} items={expectedStake} />
                          </Grid>
                        )}
                        {expectedBalance.length > 0 && (
                          <Grid item>
                            <PositionSummary title={t('expectedBalance')} items={expectedBalance} />
                          </Grid>
                        )}
                        {adjustedStake.length > 0 && (
                          <Grid item>
                            <PositionSummary title={t('adjustedStake')} items={adjustedStake} />
                          </Grid>
                        )}
                        {adjustedBalance.length > 0 && (
                          <Grid item>
                            <PositionSummary title={t('adjustedBalance')} items={adjustedBalance} />
                          </Grid>
                        )}
                      </>
                    )}
                    <Grid item flexDirection="column">
                      <CustomButton
                        color="primary"
                        type="submit"
                        label={!connected ? `${t('connectWallet')} + ${t(title)}` : t(title)}
                        fullWidth
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
      )}
      {/* {!connected && tradeType === MarketTradeType.payOut && (
        <Typography size="body2">Only liquidity providers can remove liquidity</Typography>
      )} */}
    </>
  );
};
