import * as React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid, Theme, useTheme } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { FormikTextField } from '../../molecules/FormikTextField';
import { Typography } from '../../atoms/Typography';
import { CustomButton } from '../../atoms/Button';
import { PositionItem, PositionSummary } from '../SubmitBidCard/PositionSummary';
import {
  getNoTokenId,
  getTokenQuantityById,
  getYesTokenId,
  RoundTwoAndTokenDown,
} from '../../../utils/misc';
import { MarketEnterExitDirection, Token, TokenType } from '../../../interfaces';
import { tokenMultiplyUp } from '../../../utils/math';
import { tokensToCurrency } from '../../../contracts/MarketCalculations';
import { IconTooltip } from '../../atoms/IconTooltip';

const endAdornmentStyles: SxProps<Theme> = { whiteSpace: 'nowrap' };
const defaultTokenPrice = {
  yes: 0,
  no: 0,
};
const defaultTitle = 'mintButton';

export type MintBurnFormValues = {
  mintAmount: string | number;
  yesToken: string | number;
  noToken: string | number;
  direction: MarketEnterExitDirection;
};
export interface MintBurnFormProps {
  title: string;
  /**
   * Callback to get the form values
   */
  handleSubmit: (
    values: MintBurnFormValues,
    formikHelpers: FormikHelpers<MintBurnFormValues>,
  ) => void | Promise<void>;
  /**
   * Initial values to use when initializing the form. Default is 0.
   */
  initialValues?: Omit<MintBurnFormValues, 'direction'>;
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
   * Direction
   */
  direction: MarketEnterExitDirection;
  /**
   * User token values
   */
  userTokens?: Token[];
  /**
   * User Balance value
   */
  userBalance?: number;
}

export const MintBurnForm: React.FC<MintBurnFormProps> = ({
  title = defaultTitle,
  handleSubmit,
  initialValues,
  connected,
  tokenName,
  marketId,
  userTokens,
  tokenPrice = defaultTokenPrice,
  direction,
  userBalance,
}) => {
  const theme = useTheme();
  const { t } = useTranslation('common');
  const yesTokenId = React.useMemo(() => getYesTokenId(marketId), [marketId]);
  const noTokenId = React.useMemo(() => getNoTokenId(marketId), [marketId]);
  const [expectedPosition, setExpectedPosition] = React.useState<PositionItem[]>([]);
  const [expectedWithdrawal, setExpectedWithdrawal] = React.useState<PositionItem[]>([]);
  const [userAmounts, setUserAmounts] = React.useState({
    yesToken: 0,
    noToken: 0,
  });
  const WithdrawalDescription = () => (
    <>
      {t('expectedWithdrawal')}
      <IconTooltip
        description={t('withdrawalDescription')}
        placement="bottom-start"
        maxWidth={theme.spacing(31)}
      />
    </>
  );
  React.useEffect(() => {
    if (userTokens) {
      const yesToken = getTokenQuantityById(userTokens, yesTokenId);
      const noToken = getTokenQuantityById(userTokens, noTokenId);
      setUserAmounts({
        noToken,
        yesToken,
      });
    }
  }, [userTokens, yesTokenId, noTokenId]);

  const validationSchema = React.useMemo(() => {
    if (direction === MarketEnterExitDirection.mint) {
      if (connected && userBalance) {
        return Yup.object({
          mintAmount: Yup.number()
            .min(0.000001, `${t('minMint')} 0.000001`)
            .max(userBalance, t('insufficientBalance'))
            .required(t('required')),
        });
      }
    }
    if (direction === MarketEnterExitDirection.burn) {
      if (!connected) {
        return Yup.object({
          noToken: Yup.number()
            .max(0, `${t('insufficientTokens', { token: `${t('Yes')} and ${t('No')}` })}`)
            .required(t('required')),
        });
      }
      const minYes = userAmounts.yesToken > 0 ? 0.000001 : 0;
      const minNo = userAmounts.noToken > 0 ? 0.000001 : 0;
      return Yup.object({
        yesToken: Yup.number()
          .min(minYes, `${t('minTokenBurn', { token: t('Yes') })} ${minYes}`)
          .max(userAmounts.yesToken, `${t('insufficientTokens', { token: t('Yes') })}`)
          .required(t('required')),
        noToken: Yup.number()
          .min(minNo, `${t('minTokenBurn', { token: t('No') })} ${minNo}`)
          .max(userAmounts.noToken, `${t('insufficientTokens', { token: t('No') })}`)
          .required(t('required')),
      });
    }
    return Yup.object({
      mintAmount: Yup.number()
        .min(0.000001, `${t('minMint')} 0.000001`)
        .required(t('required')),
    });
  }, [userAmounts, connected, userBalance]);

  const handleChange = React.useCallback(
    (e: any) => {
      if (Number.parseFloat(e.target.value) > 0) {
        const newVal = e.target.value;
        if (!connected) {
          const newPosition: PositionItem[] = [
            {
              label: `${t(TokenType.yes)} ${t('tokens')}`,
              value: newVal,
            },
            {
              label: `${t(TokenType.no)} ${t('tokens')}`,
              value: newVal,
            },
          ];
          setExpectedPosition(newPosition);
        } else {
          const newTotalValue =
            tokenPrice.yes * (userAmounts.yesToken + tokenMultiplyUp(newVal)) +
            tokenPrice.no * (userAmounts.noToken + tokenMultiplyUp(newVal));
          const newPosition: PositionItem[] = [
            {
              label: `${t(TokenType.yes)} ${t('tokens')}`,
              value: `${RoundTwoAndTokenDown(userAmounts.yesToken)} (+${newVal})`,
            },
            {
              label: `${t(TokenType.no)} ${t('tokens')}`,
              value: `${RoundTwoAndTokenDown(userAmounts.noToken)} (+${newVal})`,
            },
            {
              label: t('totalValue'),
              value: `${RoundTwoAndTokenDown(newTotalValue)} ${tokenName}`,
            },
          ];
          setExpectedPosition(newPosition);
        }
      } else {
        setExpectedPosition([]);
      }
    },
    [connected, userAmounts.noToken, userAmounts.yesToken, t, userBalance],
  );

  const handleTokenChange = React.useCallback(
    (e, tokenType: TokenType, setFieldValue: any) => {
      const fieldToUpdate = tokenType === TokenType.yes ? 'noToken' : 'yesToken';
      if (!e.target.value) {
        setFieldValue(fieldToUpdate, '');
        setExpectedPosition([]);
        setExpectedWithdrawal([]);
        return;
      }
      setFieldValue(fieldToUpdate, e.target.value);
      const newVal = e.target.value;
      const newWithdrawal: PositionItem[] = [
        {
          label: t('value'),
          value: `${tokensToCurrency(newVal)} ${tokenName}`,
        },
      ];
      setExpectedWithdrawal(newWithdrawal);

      if (connected) {
        const newTotalValue =
          tokenPrice.yes * (userAmounts.yesToken - tokenMultiplyUp(newVal)) +
          tokenPrice.no * (userAmounts.noToken - tokenMultiplyUp(newVal));
        const newPosition: PositionItem[] = [
          {
            label: `${t(TokenType.yes)} ${t('tokens')}`,
            value: `${RoundTwoAndTokenDown(userAmounts.yesToken)} (-${newVal})`,
          },
          {
            label: `${t(TokenType.no)} ${t('tokens')}`,
            value: `${RoundTwoAndTokenDown(userAmounts.noToken)} (-${newVal})`,
          },
          {
            label: t('totalValue'),
            value: `${RoundTwoAndTokenDown(newTotalValue)} ${tokenName}`,
          },
        ];
        setExpectedPosition(newPosition);
      }
    },
    [connected, userAmounts.noToken, userAmounts.yesToken, t],
  );

  const initialFormValues: MintBurnFormValues = initialValues
    ? {
        ...initialValues,
        direction,
      }
    : {
        mintAmount: '',
        yesToken: '',
        noToken: '',
        direction,
      };
  return (
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
            <Grid item width="100%">
              {direction === MarketEnterExitDirection.mint ? (
                <Field
                  component={FormikTextField}
                  label={t('amount')}
                  name="mintAmount"
                  type="number"
                  pattern="[0-9]*"
                  fullWidth
                  placeholder={t('inputFieldPlaceholder')}
                  handleChange={(e: any) => {
                    validateForm();
                    handleChange(e);
                  }}
                  InputProps={
                    tokenName
                      ? {
                          endAdornment: (
                            <Typography
                              color="text.secondary"
                              component="span"
                              sx={endAdornmentStyles}
                            >
                              {tokenName}
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
                    name="yesToken"
                    type="number"
                    pattern="[0-9]*"
                    fullWidth
                    placeholder={t('inputFieldPlaceholder')}
                    handleChange={(e: any) => {
                      validateForm();
                      handleTokenChange(e, TokenType.yes, setFieldValue);
                    }}
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
                  <Field
                    component={FormikTextField}
                    label=""
                    name="noToken"
                    type="number"
                    pattern="[0-9]*"
                    fullWidth
                    placeholder={t('inputFieldPlaceholder')}
                    handleChange={(e: any) => {
                      validateForm();
                      handleTokenChange(e, TokenType.no, setFieldValue);
                    }}
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
                  />
                </>
              )}
            </Grid>
            {expectedPosition.length > 0 && (
              <Grid item width="100%">
                <PositionSummary
                  title={connected ? t('expectedAdjustedPosition') : t('expectedPosition')}
                  items={expectedPosition}
                />
              </Grid>
            )}
            {expectedWithdrawal.length > 0 && (
              <Grid item width="100%">
                <PositionSummary title={<WithdrawalDescription />} items={expectedWithdrawal} />
              </Grid>
            )}
            <Grid item width="100%" flexDirection="column">
              <CustomButton
                color="primary"
                type="submit"
                label={
                  !connected
                    ? `${t('connectWallet')} + ${t(title)}`
                    : `${t(title)} ${t('tokenPairs')}`
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
