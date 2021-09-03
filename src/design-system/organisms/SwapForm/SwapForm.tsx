import React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid, Theme, useTheme } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { FormikTextField } from '../../molecules/FormikTextField';
import { Typography } from '../../atoms/Typography';
import { CustomButton } from '../../atoms/Button';
import { PositionItem, PositionSummary } from '../SubmitBidCard/PositionSummary';
import { getNoTokenId, getTokenQuantityById, getYesTokenId } from '../../../utils/misc';
import { Token, TokenType } from '../../../interfaces';
import { roundToTwo, tokenDivideDown, tokenMultiplyUp } from '../../../utils/math';
import { swapTokenCalculations, tokenAmountAfterSwap } from '../../../contracts/MarketCalculations';
import { IconTooltip } from '../../atoms/IconTooltip';

const endAdornmentStyles: SxProps<Theme> = { whiteSpace: 'nowrap' };
const TokenPriceDefault = {
  yes: 0,
  no: 0,
};

export type SwapFormValues = {
  yesToken: string | number;
  noToken: string | number;
  swapTokenType: TokenType;
};
export interface SwapFormProps {
  title: string;
  /**
   * Callback to get the form values
   */
  handleSubmit: (
    values: SwapFormValues,
    formikHelpers: FormikHelpers<SwapFormValues>,
  ) => void | Promise<void>;
  /**
   * Initial values to use when initializing the form. Default is 0.
   */
  initialValues?: Omit<SwapFormValues, 'swapTokenType'>;
  /**
   * Is wallet connected
   */
  connected?: boolean;
  /**
   * TokenName to display
   */
  tokenName?: string;
  /**
   * Token Price
   */
  tokenPrice?: {
    yes: number;
    no: number;
  };
  /**
   * Market Id
   */
  marketId: string;
  /**
   * swap token type
   */
  swapTokenType: TokenType;
  /**
   * User token values
   */
  userTokens?: Token[];
  /**
   * User Balance value
   */
  userBalance?: number;
  /**
   * Pool token values
   */
  poolTokens?: Token[];
  /**
   * Slippage
   */
  slippage?: number;
}

export const SwapForm: React.FC<SwapFormProps> = ({
  title,
  handleSubmit,
  initialValues,
  connected,
  tokenName,
  marketId,
  userTokens,
  tokenPrice = TokenPriceDefault,
  swapTokenType,
  userBalance,
  poolTokens,
  slippage = 0,
}) => {
  const theme = useTheme();
  const { t } = useTranslation('common');
  const yesTokenId = React.useMemo(() => getYesTokenId(marketId), [marketId]);
  const noTokenId = React.useMemo(() => getNoTokenId(marketId), [marketId]);
  const [expectedSwap, setExpectedSwap] = React.useState<PositionItem[]>([]);
  const [expectedAdjustedPosition, setexpectedAdjustedPosition] = React.useState<PositionItem[]>(
    [],
  );
  const [userAmounts, setUserAmounts] = React.useState({
    yesToken: 0,
    noToken: 0,
  });
  const [pools, setPools] = React.useState({
    yesPool: 0,
    noPool: 0,
  });
  const [swapToken, otherToken] = TokenType.yes === swapTokenType ? ['Yes', 'No'] : ['No', 'Yes'];
  const PositionDescription = () => (
    <>
      {t('expectedAdjustedPosition')}
      <IconTooltip
        description={t('swapDescription')}
        placement="bottom-start"
        maxWidth={theme.spacing(31)}
      />
    </>
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
      setUserAmounts({
        noToken,
        yesToken,
      });
    }
  }, [poolTokens, userTokens, yesTokenId, noTokenId]);

  const validationSchema = React.useMemo(() => {
    if (swapTokenType === TokenType.yes) {
      if (connected && userBalance) {
        return Yup.object({
          yesToken: Yup.number()
            .min(0.000001, `${t('minSwap')} 0.000001`)
            .max(userBalance, t('insufficientBalance'))
            .required(t('required')),
        });
      }
    } else if (connected && userBalance) {
      return Yup.object({
        noToken: Yup.number()
          .min(0.000001, `${t('minSwap')} 0.000001`)
          .max(userBalance, t('insufficientBalance'))
          .required(t('required')),
      });
    }
    return Yup.object({
      yesToken: Yup.number().max(0, t('insufficientBalance')),
      noToken: Yup.number().max(0, t('insufficientBalance')),
    });
  }, [userAmounts, connected, userBalance]);

  const handleChange = React.useCallback(
    (e: any) => {
      if (Number.parseFloat(e.target.value) > 0) {
        const [aPool, bPool] =
          TokenType.yes === swapTokenType
            ? [pools.yesPool, pools.noPool]
            : [pools.noPool, pools.yesPool];
        const quantity = tokenMultiplyUp(e.target.value);
        const { swapOutput, exchangeRate } = swapTokenCalculations(
          quantity,
          aPool,
          bPool,
          slippage,
        );

        const newExpectedSwap: PositionItem[] = [
          {
            label: t('expectedRate'),
            value: `1 ${t(swapToken)} = ${roundToTwo(exchangeRate)} ${t(otherToken)}`,
          },
          {
            label: t('output'),
            value: `${roundToTwo(tokenDivideDown(swapOutput))} ${t(otherToken)}`,
          },
        ];
        setExpectedSwap(newExpectedSwap);

        if (connected) {
          const [newYes, newNo, yesOpt, noOpt] =
            TokenType.yes === swapTokenType
              ? [quantity, swapOutput, '-', '+']
              : [swapOutput, quantity, '+', '-'];

          const { totalYes, totalNo } = tokenAmountAfterSwap(
            userAmounts.yesToken,
            newYes,
            userAmounts.noToken,
            newNo,
            swapTokenType,
          );

          const newTotalValue = tokenPrice.yes * totalYes + tokenPrice.no * totalNo;

          const newPosition: PositionItem[] = [
            {
              label: `${t(TokenType.yes)} ${t('tokens')}`,
              value: `${roundToTwo(tokenDivideDown(userAmounts.yesToken))} (${yesOpt}${roundToTwo(
                tokenDivideDown(newYes),
              )})`,
            },
            {
              label: `${t(TokenType.no)} ${t('tokens')}`,
              value: `${roundToTwo(tokenDivideDown(userAmounts.noToken))} (${noOpt}${roundToTwo(
                tokenDivideDown(newNo),
              )})`,
            },
            {
              label: t('totalValue'),
              value: `${roundToTwo(tokenDivideDown(newTotalValue))} ${tokenName}`,
            },
          ];
          setexpectedAdjustedPosition(newPosition);
        }
      }
    },
    [connected, pools.yesPool, pools.noPool, userAmounts.noToken, userAmounts.yesToken, t],
  );

  const initialFormValues: SwapFormValues = initialValues
    ? {
        ...initialValues,
        swapTokenType,
      }
    : {
        yesToken: '',
        noToken: '',
        swapTokenType,
      };
  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={initialFormValues}
      enableReinitialize
    >
      {({ isValid }) => (
        <Form>
          <Grid
            container
            spacing={3}
            direction="column"
            alignContent="flex-start"
            justifyContent="center"
          >
            <Grid item width="100%">
              {swapTokenType === TokenType.yes ? (
                <Field
                  component={FormikTextField}
                  label={t('amount')}
                  name="yesToken"
                  type="number"
                  pattern="[0-9]*"
                  fullWidth
                  placeholder={t('inputFieldPlaceholder')}
                  handleChange={handleChange}
                  InputProps={
                    tokenName
                      ? {
                          endAdornment: (
                            <Typography
                              color="text.secondary"
                              component="span"
                              sx={endAdornmentStyles}
                            >
                              {t('yesTokens')}
                            </Typography>
                          ),
                        }
                      : undefined
                  }
                  required
                />
              ) : (
                <>
                  <Field
                    component={FormikTextField}
                    label={t('amount')}
                    name="noToken"
                    type="number"
                    pattern="[0-9]*"
                    fullWidth
                    placeholder={t('inputFieldPlaceholder')}
                    handleChange={handleChange}
                    InputProps={
                      tokenName
                        ? {
                            endAdornment: (
                              <Typography
                                color="text.secondary"
                                component="span"
                                sx={endAdornmentStyles}
                              >
                                {t('noTokens')}
                              </Typography>
                            ),
                          }
                        : undefined
                    }
                    required
                  />
                </>
              )}
            </Grid>
            {expectedSwap.length > 0 && (
              <Grid item width="100%">
                <PositionSummary title={t('expectedSwap')} items={expectedSwap} />
              </Grid>
            )}
            {expectedAdjustedPosition.length > 0 && (
              <Grid item width="100%">
                <PositionSummary title={<PositionDescription />} items={expectedAdjustedPosition} />
              </Grid>
            )}
            <Grid item width="100%" flexDirection="column">
              <CustomButton
                color="primary"
                type="submit"
                label={
                  !connected
                    ? `${t('connectWallet')} + ${t(title)}`
                    : `${t(title)} for ${t(otherToken)}`
                }
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
  );
};
