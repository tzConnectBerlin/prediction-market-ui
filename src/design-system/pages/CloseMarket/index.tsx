import React, { useState } from 'react';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { useToasts } from 'react-toast-notifications';
import { Grid, Button, Paper, Box, FormLabel } from '@material-ui/core';
import { Form, Formik, Field, FormikHelpers } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { RadioButtonGroup, RadioButtonField } from '../../atoms/RadioButtonGroup';
import { CloseMarket, CreateQuestion, TokenType } from '../../../interfaces';
import { closeMarket, MarketErrors } from '../../../contracts/Market';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography';
import { useWallet } from '../../../wallet/hooks';
import { Identicon } from '../../atoms/Identicon';

type CloseMarketPageProps = WithTranslation;

const PaperStyled = styled(Paper)`
  padding: 2em;
`;

interface PagePathParams {
  questionHash: string;
}

const CloseMarketPageComponent: React.FC<CloseMarketPageProps> = ({ t }) => {
  const [result, setResult] = useState('');
  const { addToast } = useToasts();
  const { wallet } = useWallet();
  const { questionHash } = useParams<PagePathParams>();
  const {
    state: { question, iconURL },
  } = useLocation<CreateQuestion>();

  const BuyTokenSchema = Yup.object().shape({
    question: Yup.string().required('Required'),
    tokenType: Yup.string().oneOf([TokenType.no, TokenType.yes]).required('Required'),
  });

  const initialValues: CloseMarket = {
    question: questionHash,
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
  ];

  const onFormSubmit = async (formData: CloseMarket, formikHelpers: FormikHelpers<CloseMarket>) => {
    try {
      const response = await closeMarket(formData);
      if (response) {
        addToast('Transaction Submitted', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
      formikHelpers.resetForm();
      setResult(response);
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
  };

  return (
    <MainPage title={t('closeMarketPage')}>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={BuyTokenSchema}
      >
        {({ isSubmitting, isValid }) => (
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
                >
                  <Grid item xs={12}>
                    <FormLabel title={t('question')}>{t('question')}</FormLabel>
                    <Grid
                      container
                      item
                      xs={12}
                      direction="row"
                      justifyContent="center"
                      sx={{ paddingTop: '1rem' }}
                    >
                      <Grid item xs={12} marginRight={1} marginTop={0.5}>
                        <Identicon seed={questionHash} url={iconURL} type="tzKtCat" />
                      </Grid>
                      <Grid item xs={12} marginTop={0.5}>
                        <Typography size="h6">{question}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      component={RadioButtonGroup}
                      title={t('selectToken')}
                      name="tokenType"
                      values={tokenFieldData}
                      labelPlacement="start"
                      row
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Button
                      type="submit"
                      variant="outlined"
                      size="large"
                      disabled={!wallet.pkh || !isValid || isSubmitting}
                      fullWidth
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

export const CloseMarketPage = withTranslation(['common'])(CloseMarketPageComponent);
