import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Button, Paper, Box } from '@material-ui/core';
import { Form, Formik, Field, FormikHelpers } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { FormikTextField } from '../../atoms/TextField';
import { ClaimWinnings, CreateQuestion } from '../../../interfaces';
import { claimWinnings, MarketErrors } from '../../../contracts/Market';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography';
import { useWallet } from '../../../wallet/hooks';

type ClaimWinningsPageProps = WithTranslation;

const OuterDivStyled = styled.div`
  flex-grow: 1;
`;

const PaperStyled = styled(Paper)`
  padding: 2em;
`;

interface PagePathParams {
  questionHash: string;
}

const ClaimWinningsPageComponent: React.FC<ClaimWinningsPageProps> = ({ t }) => {
  const [result, setResult] = useState('');
  const { addToast } = useToasts();
  const { wallet } = useWallet();
  const { questionHash } = useParams<PagePathParams>();
  const {
    state: { question },
  } = useLocation<CreateQuestion>();
  const initialValues: ClaimWinnings = {
    question: questionHash,
    winningToken: 0,
  };

  const onFormSubmit = async (
    formData: ClaimWinnings,
    formikHelpers: FormikHelpers<ClaimWinnings>,
  ) => {
    try {
      const response = await claimWinnings(formData);
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
    <MainPage title={t('claimWinningsPage')}>
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

export const ClaimWinningsPage = withTranslation(['common'])(ClaimWinningsPageComponent);
