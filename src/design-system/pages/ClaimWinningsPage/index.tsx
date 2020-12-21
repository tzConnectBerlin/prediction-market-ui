import { useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Button, Paper, Box } from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { FormikTextField } from '../../atoms/TextField';
import { ClaimWinnings } from '../../../interfaces';
import { claimWinnings } from '../../../contracts/Market';
import { MainPage } from '../MainPage';

type ClaimWinningsPageProps = WithTranslation;

const OuterDivStyled = styled.div`
  flex-grow: 1;
`;

const PaperStyled = styled(Paper)`
  padding: 2em;
`;

const ClaimWinningsPageComponent: React.FC<ClaimWinningsPageProps> = ({ t }) => {
  const [result, setResult] = useState('');
  const initialValues: ClaimWinnings = {
    question: '',
    winningToken: 0,
  };

  const onFormSubmit = async (formData: ClaimWinnings) => {
    const response = await claimWinnings(formData);
    setResult(response);
  };

  return (
    <MainPage title={t('claimWinningsPage')}>
      <Formik initialValues={initialValues} onSubmit={onFormSubmit}>
        <Form>
          <OuterDivStyled>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <PaperStyled>
                  <Field
                    id="question-field"
                    name="question"
                    label={t('enterQuestionIPFS')}
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
                  <Button type="submit" variant="outlined" size="large">
                    {t('submit')}
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
