import React, { useState } from 'react';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { Grid, Button, Paper, FormLabel, CircularProgress } from '@material-ui/core';
import { Form, Formik, Field, FormikHelpers } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { useToasts } from 'react-toast-notifications';
import { FormikTextField } from '../../atoms/TextField';
import { RadioButtonGroup, RadioButtonField } from '../../atoms/RadioButtonGroup';
import {
  BuyToken,
  ClosePositionBothReturn,
  ClosePositionReturn,
  QuestionEntryMDW,
  QuestionMetaData,
  TokenType,
} from '../../../interfaces';
import { batchSwapBurn, burnToken, MarketErrors } from '../../../contracts/Market';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography';
import { useWallet } from '../../../wallet/hooks';
import { Identicon } from '../../atoms/Identicon';
import { closePosition, closePositionBoth } from '../../../contracts/MarketCalculations';
import { useLedgerBalances } from '../../../api/queries';

type SellTokenPageProps = WithTranslation;

const PaperStyled = styled(Paper)`
  padding: 2em;
  max-width: 50rem;
  min-width: 40rem;
`;

interface PagePathParams {
  questionHash: string;
  marketAddress: string;
}

interface QuestionPageLocationParams extends QuestionMetaData, QuestionEntryMDW {
  participants?: string[];
}

const SellTokenPageComponent: React.FC<SellTokenPageProps> = ({ t }) => {
  const history = useHistory();
  const [submittingData, setSubmitting] = useState(false);
  const [maxSell, setMaxSell] = useState(0);
  const { addToast } = useToasts();
  const { wallet } = useWallet();
  const { pkh: userAddress } = wallet;
  const { questionHash, marketAddress } = useParams<PagePathParams>();
  const {
    state: { tokens, question, iconURL },
  } = useLocation<QuestionPageLocationParams>();
  const { data: ledgerData } = useLedgerBalances();

  const yesTokenLedger = ledgerData && ledgerData[tokens.yes_token_id];
  const noTokenLedger = ledgerData && ledgerData[tokens.no_token_id];

  const userYesBal =
    (userAddress && yesTokenLedger && new BigNumber(yesTokenLedger[userAddress] ?? 0)) ||
    new BigNumber(0);
  const userNoBal =
    (userAddress && noTokenLedger && new BigNumber(noTokenLedger[userAddress] ?? 0)) ||
    new BigNumber(0);
  const yesPool =
    (yesTokenLedger && new BigNumber(yesTokenLedger[marketAddress] ?? 0)) || new BigNumber(0);
  const noPool =
    (yesTokenLedger && new BigNumber(yesTokenLedger[marketAddress] ?? 0)) || new BigNumber(0);

  let BuyTokenSchema = Yup.object().shape({
    question: Yup.string().required('Required'),
    quantity: Yup.number().min(1, 'Quantity must be minimum 1').required('Required'),
    tokenType: Yup.string()
      .oneOf([TokenType.no, TokenType.yes, TokenType.both])
      .required('Required'),
  });

  if (maxSell > 0) {
    BuyTokenSchema = Yup.object().shape({
      question: Yup.string().required('Required'),
      quantity: Yup.number()
        .min(1, 'Quantity must be minimum 1')
        .max(maxSell, `Quantity must be maximum ${maxSell}`)
        .required('Required'),
      tokenType: Yup.string()
        .oneOf([TokenType.no, TokenType.yes, TokenType.both])
        .required('Required'),
    });
  }

  const computeClosePositions = (
    tokenType: TokenType,
  ): ClosePositionReturn & ClosePositionBothReturn => {
    if (tokenType === TokenType.both && !userYesBal.isZero() && !userNoBal.isZero()) {
      const [aBal, bBal] = userYesBal.isGreaterThan(userNoBal)
        ? [userYesBal, userNoBal]
        : [userNoBal, userYesBal];
      const [aPool, bPool] = userYesBal.isGreaterThan(userNoBal)
        ? [yesPool, noPool]
        : [noPool, yesPool];
      return { ...closePositionBoth(aPool, bPool, aBal, bBal), bReceived: new BigNumber(-1) };
    }
    const aBal = tokenType === TokenType.yes ? userYesBal : userNoBal;
    const [aPool, bPool] = tokenType === TokenType.yes ? [yesPool, noPool] : [noPool, yesPool];
    return { ...closePosition(aPool, bPool, aBal), bHeld: new BigNumber(-1) };
  };

  const canSellWithoutSwap = (quantity: BigNumber) => {
    return (
      userYesBal.isGreaterThanOrEqualTo(quantity) && userNoBal.isGreaterThanOrEqualTo(quantity)
    );
  };

  const getMaxQuantityAllowed = (tokenType: TokenType): number => {
    const computed = computeClosePositions(tokenType);
    const min = BigNumber.minimum(
      computed.aLeft,
      tokenType === TokenType.both ? computed.bHeld : computed.bReceived,
    );
    return Number(min.shiftedBy(-18).toString().split('.')[0]);
  };

  const initialValues: BuyToken = {
    question: questionHash,
    quantity: maxSell > 0 ? maxSell : 0,
    tokenType: TokenType.yes,
  };

  const tokenFieldData: RadioButtonField[] = [
    {
      fieldLabel: t(TokenType.no),
      fieldValue: TokenType.no,
    },
    {
      fieldLabel: t(TokenType.yes),
      fieldValue: TokenType.yes,
    },
    {
      fieldLabel: t(TokenType.both),
      fieldValue: TokenType.both,
    },
  ];

  const onFormSubmit = async (formData: BuyToken, formikHelpers: FormikHelpers<BuyToken>) => {
    const quantityToSell = new BigNumber(formData.quantity).shiftedBy(18);
    const withoutSwap = canSellWithoutSwap(quantityToSell);

    if (!withoutSwap) {
      const computed = computeClosePositions(formData.tokenType);
      const quantityGreaterThanALeft = quantityToSell.isGreaterThan(computed.aLeft);
      const quantityGreaterThanBHeld = quantityToSell.isGreaterThan(computed.bHeld);
      if (formData.tokenType === TokenType.both) {
        const isQuantityGreater = quantityGreaterThanALeft || quantityGreaterThanBHeld;
        if (!isQuantityGreater) {
          try {
            setSubmitting(true);
            const tokenToSwap = userYesBal.isGreaterThan(userNoBal) ? TokenType.yes : TokenType.no;
            const hash = await batchSwapBurn(
              {
                quantity: Number(computed.aToSwap.toString().split('.')[0]),
                question: formData.question,
                tokenType: tokenToSwap,
              },
              formData.quantity,
            );
            if (hash) {
              addToast('Transaction Submitted', {
                appearance: 'success',
                autoDismiss: true,
              });
              history.push('/');
            }
          } catch (error) {
            console.log(error);
            const errorText =
              MarketErrors[error?.data[1]?.with?.int as number] ??
              error?.data[1]?.with?.string ??
              'Transaction Failed';
            addToast(errorText, {
              appearance: 'error',
              autoDismiss: true,
            });
          } finally {
            setSubmitting(false);
          }
        } else {
          addToast('Sell quantity can not be more than user balance', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      } else if (!quantityGreaterThanALeft) {
        try {
          setSubmitting(true);
          const hash = await batchSwapBurn(
            {
              quantity: Number(computed.aToSwap.toString().split('.')[0]),
              question: formData.question,
              tokenType: formData.tokenType,
            },
            formData.quantity,
          );
          if (hash) {
            addToast('Transaction Submitted', {
              appearance: 'success',
              autoDismiss: true,
            });
            history.push('/');
          }
        } catch (error) {
          console.log(error);
          const errorText =
            MarketErrors[error?.data[1]?.with?.int as number] ??
            error?.data[1]?.with?.string ??
            'Transaction Failed';
          addToast(errorText, {
            appearance: 'error',
            autoDismiss: true,
          });
        } finally {
          setSubmitting(false);
        }
      } else {
        addToast('Sell quantity can not be more than user balance', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    } else {
      try {
        const hash = await burnToken(formData.question, formData.quantity);
        addToast('Transaction Submitted', {
          appearance: 'success',
          autoDismiss: true,
        });
        history.push('/');
      } catch (error) {
        const errorText =
          MarketErrors[error?.data[1]?.with?.int as number] ??
          error?.data[1]?.with?.string ??
          'Transaction Failed';
        addToast(errorText, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
    formikHelpers.resetForm();
  };

  return (
    <MainPage title={t('sellTokenPage')}>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={BuyTokenSchema}
        enableReinitialize
      >
        {({ isSubmitting, isValid, setFieldValue }) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexGrow: 1,
              alignItems: 'flex-start',
            }}
          >
            <PaperStyled>
              <Form>
                <Grid
                  container
                  spacing={3}
                  direction="column"
                  alignContent="center"
                  justifyContent="center"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                >
                  <Grid item xs={12} sm={12} md={12}>
                    <FormLabel title={t('question')}>{t('question')}</FormLabel>
                    <Grid
                      container
                      item
                      xs={12}
                      direction="row"
                      spacing={3}
                      sx={{ paddingTop: '1rem' }}
                    >
                      <Grid item xs={2} style={{ paddingRight: '4rem' }}>
                        <Identicon seed={questionHash} url={iconURL} type="tzKtCat" />
                      </Grid>
                      <Grid item xs={8} style={{ paddingLeft: '0' }}>
                        <Typography size="h6">{question}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Field
                      component={RadioButtonGroup}
                      title={t('tokenToSell')}
                      name="tokenType"
                      values={tokenFieldData}
                      labelPlacement="start"
                      row
                      onChange={(e: any, val: TokenType) => {
                        const max = getMaxQuantityAllowed(val);
                        setFieldValue('quantity', max < 0 ? 0 : max);
                        setMaxSell(max);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Field
                      component={FormikTextField}
                      label={t('quantity')}
                      name="quantity"
                      type="number"
                      min="1"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Button
                      type="submit"
                      variant="outlined"
                      size="large"
                      disabled={!wallet.pkh || !isValid || isSubmitting}
                      fullWidth
                      endIcon={
                        submittingData && (
                          <CircularProgress style={{ color: '#888888' }} size="2rem" />
                        )
                      }
                    >
                      {t(!wallet.pkh ? 'connectWalletContinue' : 'submit')}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </PaperStyled>
          </div>
        )}
      </Formik>
    </MainPage>
  );
};

export const SellTokenPage = withTranslation(['common'])(SellTokenPageComponent);
