import { useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Button, Paper, Box } from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { FormikTextField } from '../../atoms/TextField';
import { Bid } from '../../../interfaces';
import { createBid } from '../../../contracts/Market';
import { MainPage } from '../MainPage';

type CreateBidPageProps = WithTranslation;

const OuterDivStyled = styled.div`
  flex-grow: 1;
`;

const PaperStyled = styled(Paper)`
  padding: 2em;
`;

interface PagePathParams {
  questionHash: string;
}

const CreateBidPageComponent: React.FC<CreateBidPageProps> = ({ t }) => {
  const [result, setResult] = useState('');
  const { questionHash } = useParams<PagePathParams>();
  const initialValues: Bid = {
    question: questionHash,
    quantity: 0,
    rate: 0,
  };

  const onFormSubmit = async (formData: Bid) => {
    const response = await createBid(formData);
    setResult(response);
  };

  return (
    <MainPage title={t('createBidPage')}>
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
                    disabled
                  />
                </PaperStyled>
              </Grid>
              <Grid item xs={12} sm={6}>
                <PaperStyled>
                  <Field
                    component={FormikTextField}
                    label={t('rate')}
                    name="rate"
                    type="number"
                    min="0.1"
                    step="0.1"
                    max="0.99"
                  />
                </PaperStyled>
              </Grid>
              <Grid item xs={12} sm={6}>
                <PaperStyled>
                  <Field
                    component={FormikTextField}
                    label={t('quantity')}
                    name="quantity"
                    type="number"
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

export const CreateBidPage = withTranslation(['common'])(CreateBidPageComponent);
