import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Button, Paper } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { ClaimWinnings, CreateQuestion, TokenType } from '../../../interfaces';
import { claimWinnings, MarketErrors } from '../../../contracts/Market';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography';
import { useWallet } from '../../../wallet/hooks';

type ClaimWinningsPageProps = WithTranslation;

const PaperStyled = styled(Paper)`
  padding: 2em;
  width: 100%;
`;

interface PagePathParams {
  questionHash: string;
}

interface ClaimWinningLocationState extends CreateQuestion {
  winning?: number;
  answer?: TokenType;
}

const ClaimWinningsPageComponent: React.FC<ClaimWinningsPageProps> = ({ t }) => {
  const [result, setResult] = useState('');
  const { addToast } = useToasts();
  const { wallet } = useWallet();
  const { questionHash } = useParams<PagePathParams>();
  const {
    state: { question, answer, winning },
  } = useLocation<ClaimWinningLocationState>();
  const initialValues: ClaimWinnings = {
    question: questionHash,
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
      console.log(error);
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexGrow: 1,
            alignItems: 'flex-start',
            minHeight: '50vh',
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
                <Grid item xs={6}>
                  <Typography size="caption">{t('question')}</Typography>
                  <Typography size="h6">{question}</Typography>
                </Grid>
                {answer && (
                  <Grid item xs={12}>
                    <Typography size="caption">{t('answer')}</Typography>
                    <Typography size="h6">{t(answer)}</Typography>
                  </Grid>
                )}
                {typeof winning !== 'undefined' && winning >= 0 && (
                  <Grid item xs={12}>
                    <Typography size="caption">{t('expectedWinnings')}</Typography>
                    <Typography size="h6">{winning}</Typography>
                  </Grid>
                )}
                <Grid item>
                  <Button type="submit" variant="outlined" size="large" disabled={!wallet.pkh}>
                    {t(!wallet.pkh ? 'connectWalletContinue' : 'submit')}
                  </Button>
                </Grid>
                {result && (
                  <Grid item>
                    <Button
                      href={`https://better-call.dev/carthagenet/opg/${result}/content`}
                      target="_blank"
                      variant="outlined"
                      size="large"
                    >
                      {t('result')}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Form>
          </PaperStyled>
        </div>
      </Formik>
    </MainPage>
  );
};

export const ClaimWinningsPage = withTranslation(['common'])(ClaimWinningsPageComponent);
