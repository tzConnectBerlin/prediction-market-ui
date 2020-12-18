import { useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Button, Paper, Box } from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { FormikTextField } from '../../atoms/TextField';
import { QuestionType } from '../../../interfaces';
import { closeAuction, createBid } from '../../../contracts/Market';
import { MainPage } from '../MainPage';

type CloseAuctionPageProps = WithTranslation;

const OuterDivStyled = styled.div`
  flex-grow: 1;
`;

const PaperStyled = styled(Paper)`
  padding: 2em;
`;

interface CloseAuctionForm {
  question: QuestionType;
}

const CloseAuctionPageComponent: React.FC<CloseAuctionPageProps> = ({ t }) => {
  const [result, setResult] = useState('');
  const initialValues: CloseAuctionForm = {
    question: '',
  };

  const onFormSubmit = async (formData: CloseAuctionForm) => {
    const response = await closeAuction(formData.question);
    setResult(response);
  };

  return (
    <MainPage title={t('closeAuctionPage')}>
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

export const CloseAuctionPage = withTranslation(['common'])(CloseAuctionPageComponent);
