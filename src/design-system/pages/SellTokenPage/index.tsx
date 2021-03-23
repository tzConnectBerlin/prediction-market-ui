import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { Grid, Button, Paper, Box, FormLabel, CircularProgress } from '@material-ui/core';
import { Form, Formik, Field, FormikHelpers } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import BigNumber from 'bignumber.js';
import { FormikTextField } from '../../atoms/TextField';
import { RadioButtonGroup, RadioButtonField } from '../../atoms/RadioButtonGroup';
import {
  BuyToken,
  ClosePositionBothReturn,
  ClosePositionReturn,
  LedgerBalanceResponse,
  QuestionEntryMDW,
  QuestionMetaData,
  TokenType,
} from '../../../interfaces';
import { batchSwapBurn, burnToken, swapAndBurn } from '../../../contracts/Market';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography';
import { useWallet } from '../../../wallet/hooks';
import { Identicon } from '../../atoms/Identicon';
import { getAllLedgerBalances } from '../../../api/mdw';
import { closePosition, closePositionBoth } from '../../../contracts/MarketCalculations';

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
  const [result, setResult] = useState('');
  const [submittingData, setSubmitting] = useState(false);
  const [maxSell, setMaxSell] = useState(0);
  const { wallet } = useWallet();
  const { pkh: userAddress } = wallet;
  const { questionHash, marketAddress } = useParams<PagePathParams>();
  const {
    state: { tokens, question, iconURL },
  } = useLocation<QuestionPageLocationParams>();

  const { data: ledgerData } = useQuery<LedgerBalanceResponse, AxiosError, LedgerBalanceResponse>(
    ['contractLedgerBalance', marketAddress],
    () => {
      return getAllLedgerBalances();
    },
  );

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
      if (formData.tokenType === TokenType.both) {
        const isQuantityGreater =
          quantityToSell.isGreaterThan(computed.aLeft) ||
          quantityToSell.isGreaterThan(computed.bHeld);

        const tokenToSwap = userYesBal.isGreaterThan(userNoBal) ? TokenType.yes : TokenType.no;
        if (!isQuantityGreater) {
          try {
            setSubmitting(true);
            const hash = await batchSwapBurn(
              {
                quantity: Number(computed.aToSwap.toString().split('.')[0]),
                question: formData.question,
                tokenType: tokenToSwap,
              },
              formData.quantity,
            );
            hash && setResult(hash);
          } catch (error) {
            console.log(error);
          } finally {
            setSubmitting(false);
          }
        }
      } else {
        const isQuantityGreater = new BigNumber(formData.quantity)
          .shiftedBy(18)
          .isGreaterThan(computed.aLeft);
        if (!isQuantityGreater) {
          try {
            setSubmitting(true);
            const hash = await swapAndBurn(
              {
                quantity: Number(computed.aToSwap.toString().split('.')[0]),
                question: formData.question,
                tokenType: formData.tokenType,
              },
              formData.quantity,
            );
            setResult(hash);
          } catch (error) {
            console.log(error);
          } finally {
            setSubmitting(false);
          }
        }
      }
    } else {
      const hash = await burnToken(formData.question, formData.quantity);
      setResult(hash);
    }
    formikHelpers.resetForm();
  };

  return (
    <MainPage title={t('sellTokenPage')}>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={BuyTokenSchema}
      >
        {({ isSubmitting, isValid, dirty, setFieldValue }) => (
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
                        <Identicon seed={questionHash} url={iconURL} />
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
                      disabled={!wallet.pkh || !isValid || isSubmitting || !dirty}
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
                  {result && (
                    <Grid item xs={6} sm={3}>
                      <Box>
                        <Button
                          href={`https://better-call.dev/carthagenet/opg/${result}/content`}
                          target="_blank"
                          variant="outlined"
                          size="large"
                          fullWidth
                        >
                          {t('result')}
                        </Button>
                      </Box>
                    </Grid>
                  )}
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
