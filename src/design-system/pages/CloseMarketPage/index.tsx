import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Button, Paper, Box } from '@material-ui/core';
import { Form, Formik, Field, FormikHelpers } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { FormikTextField } from '../../atoms/TextField';
import { CloseMarket, CreateQuestion } from '../../../interfaces';
import { closeMarket } from '../../../contracts/Market';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography';
import { useWallet } from '../../../wallet/hooks';

type CloseMarketPageProps = WithTranslation;

const OuterDivStyled = styled.div`
  flex-grow: 1;
`;

const PaperStyled = styled(Paper)`
  padding: 2em;
`;

interface PagePathParams {
  questionHash: string;
}

const CloseMarketPageComponent: React.FC<CloseMarketPageProps> = ({ t }) => {
  const [result, setResult] = useState('');
  const { wallet } = useWallet();
  const { questionHash } = useParams<PagePathParams>();
  const {
    state: { question },
  } = useLocation<CreateQuestion>();
  const initialValues: CloseMarket = {
    question: questionHash,
    answer: '',
    winningToken: 0,
  };

  const onFormSubmit = async (formData: CloseMarket, formikHelpers: FormikHelpers<CloseMarket>) => {
    const response = await closeMarket(formData);
    formikHelpers.resetForm();
    setResult(response);
  };

  return (
    <MainPage title={t('closeMarketPage')}>
      <Formik initialValues={initialValues} onSubmit={onFormSubmit}>
        <Form>
          <OuterDivStyled>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <PaperStyled>
                  <Typography size="caption">{t('question')}</Typography>
                  <Typography size="h6">{question}</Typography>
                </PaperStyled>
              </Grid>
              <Grid item xs={12} sm={6}>
                <PaperStyled>
                  <Field
                    id="answer-field"
                    name="answer"
                    label={t('enterAnswer')}
                    variant="outlined"
                    component={FormikTextField}
                    size="medium"
                    fullWidth
                  />
                </PaperStyled>
              </Grid>
              <Grid item xs={12} sm={6}>
                <PaperStyled>
                  <Field
                    id="winningToken-field"
                    name="winningToken"
                    label={t('winningToken')}
                    variant="outlined"
                    component={FormikTextField}
                    size="medium"
                    type="number"
                    fullWidth
                  />
                </PaperStyled>
              </Grid>
              <Grid container direction="row-reverse">
                <Grid item xs={6} sm={3}>
                  <Button type="submit" variant="outlined" size="large" disabled={!wallet.pkh}>
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
                      >
                        {t('result')}
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </OuterDivStyled>
        </Form>
      </Formik>
    </MainPage>
  );
};

export const CloseMarketPage = withTranslation(['common'])(CloseMarketPageComponent);
