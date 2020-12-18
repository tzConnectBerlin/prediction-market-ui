import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Button, Paper, Box } from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { FormikTextField } from '../../atoms/TextField';
import { FormikDateTimePicker } from '../../atoms/DateTimePicker';
import { RadioButtonGroup, RadioButtonField } from '../../atoms/RadioButtonGroup';
import { BuyToken, TokenType } from '../../../interfaces';
import { buyToken } from '../../../contracts/Market';
import { MainPage } from '../MainPage';

type BuyTokenPageProps = WithTranslation;

const OuterDivStyled = styled.div`
  flex-grow: 1;
`;

const PaperStyled = styled(Paper)`
  padding: 2em;
`;

const BuyTokenPageComponent: React.FC<BuyTokenPageProps> = ({ t }) => {
  const [result, setResult] = useState('');
  const initialValues: BuyToken = {
    question: '',
    deadline: new Date(),
    quantity: 0,
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

  const onFormSubmit = async (formData: BuyToken) => {
    const response = await buyToken(formData);
    setResult(response);
  };

  return (
    <MainPage title={t('buyTokenPage')}>
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
              <Grid item xs={12} sm={4}>
                <PaperStyled>
                  <Field
                    component={RadioButtonGroup}
                    title={t('selectToken')}
                    name="tokenType"
                    values={tokenFieldData}
                    labelPlacement="start"
                    row
                  />
                </PaperStyled>
              </Grid>
              <Grid item xs={12} sm={4}>
                <PaperStyled>
                  <Field
                    component={FormikTextField}
                    label={t('quantity')}
                    name="quantity"
                    type="number"
                  />
                </PaperStyled>
              </Grid>
              <Grid item xs={12} sm={4}>
                <PaperStyled>
                  <Field
                    component={FormikDateTimePicker}
                    label={t('executionDeadline')}
                    name="executionDeadline"
                    inputFormat="dd/MM/yyyy hh:mm"
                    disablePast
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

export const BuyTokenPage = withTranslation(['common'])(BuyTokenPageComponent);
