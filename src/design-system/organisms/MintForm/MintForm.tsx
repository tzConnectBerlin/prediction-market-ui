import React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik, FormikHelpers, FormikValues } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid, Theme } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { FormikTextField } from '../../molecules/FormikTextField';
import { Typography } from '../../atoms/Typography';
import { CustomButton } from '../../atoms/Button';
import { PositionItem, PositionSummary } from '../SubmitBidCard/PositionSummary';
import { getNoTokenId, getTokenQuantityById, getYesTokenId } from '../../../utils/misc';
import { MarketTradeType, Token, TokenType } from '../../../interfaces';
import { roundToTwo, tokenDivideDown, tokenMultiplyUp } from '../../../utils/math';

const endAdornmentStyles: SxProps<Theme> = { whiteSpace: 'nowrap' };
const TokenPriceDefault = {
  yes: 0,
  no: 0,
};
export interface MintFormProps {
  title: string;
  /**
   * Callback to get the form values
   */
  handleSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>,
  ) => void | Promise<void>;
  /**
   * Initial values to use when initializing the form. Default is 0.
   */
  initialValues?: FormikValues;
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
   * User token values
   */
  userTokens?: Token[];
}

export const MintForm: React.FC<MintFormProps> = ({
  title = 'mintButton',
  handleSubmit,
  initialValues,
  connected,
  tokenName,
  marketId,
  userTokens,
  tokenPrice = TokenPriceDefault,
}) => {
  const { t } = useTranslation('common');
  const yesTokenId = React.useMemo(() => getYesTokenId(marketId), [marketId]);
  const noTokenId = React.useMemo(() => getNoTokenId(marketId), [marketId]);
  const [expectedPosition, setExpectedPosition] = React.useState<PositionItem[]>([]);
  const [userAmounts, setUserAmounts] = React.useState({
    yesToken: 0,
    noToken: 0,
  });

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

  const validationSchema = Yup.object({
    amount: Yup.number()
      .min(0.000001, `${t('minMint')} 0.000001`)
      .required(t('required')),
  });

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
              value: `${roundToTwo(tokenDivideDown(userAmounts.yesToken))} (+${newVal})`,
            },
            {
              label: `${t(TokenType.no)} ${t('tokens')}`,
              value: `${roundToTwo(tokenDivideDown(userAmounts.noToken))} (+${newVal})`,
            },
            {
              label: t('totalValue'),
              value: `${roundToTwo(tokenDivideDown(newTotalValue))} ${tokenName}`,
            },
          ];
          setExpectedPosition(newPosition);
        }
      } else {
        setExpectedPosition([]);
      }
    },
    [connected, userAmounts.noToken, userAmounts.yesToken, t],
  );

  const initialFormValues: FormikValues = initialValues
    ? {
        ...initialValues,
      }
    : {
        amount: '',
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
              <Field
                component={FormikTextField}
                label={t('amount')}
                name="amount"
                type="number"
                pattern="[0-9]*"
                fullWidth
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
                            {tokenName}
                          </Typography>
                        ),
                      }
                    : undefined
                }
                required
              />
            </Grid>
            {expectedPosition.length > 0 && (
              <Grid item width="100%">
                <PositionSummary
                  title={connected ? t('expectedAdjustedPosition') : t('expectedPosition')}
                  items={expectedPosition}
                />
              </Grid>
            )}
            <Grid item width="100%" flexDirection="column">
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
  );
};
