import { useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Button, Paper, Box } from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { FormikTextField } from '../../atoms/TextField';
import { QuestionType } from '../../../interfaces';
import { withdrawAuctionWinnings } from '../../../contracts/Market';
import { MainPage } from '../MainPage';

type WithdrawAuctionPageProps = WithTranslation;

const OuterDivStyled = styled.div`
  flex-grow: 1;
`;

const PaperStyled = styled(Paper)`
  padding: 2em;
`;

interface WithdrawAuctionForm {
  question: QuestionType;
}

const WithdrawAuctionPageComponent: React.FC<WithdrawAuctionPageProps> = ({ t }) => {
  const [result, setResult] = useState('');
  const initialValues: WithdrawAuctionForm = {
    question: '',
  };

  const onFormSubmit = async (formData: WithdrawAuctionForm) => {
    const response = await withdrawAuctionWinnings(formData.question);
    setResult(response);
  };

  return (
    <MainPage title={t('withdrawAuctionWinningsPage')}>
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

export const WithdrawAuctionPage = withTranslation(['common'])(WithdrawAuctionPageComponent);
