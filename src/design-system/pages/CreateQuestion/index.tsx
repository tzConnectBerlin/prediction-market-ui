import { Grid, TextField, Button, TextFieldProps, Paper, Box } from '@material-ui/core';
import { DateTimePicker, DateTimePickerProps } from '@material-ui/pickers';
import { Form, Formik, Field, FieldProps } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useState } from 'react';
import styled from '@emotion/styled';
import { addIPFSData } from '../../../ipfs/ipfs';
import { CreateQuestion } from '../../../interfaces';
import { createQuestion, setWallet } from '../../../contracts/Market';
import { MainPage } from '../MainPage';
import { useWallet } from '../../../wallet/hooks';

type ICreateQuestionPage = WithTranslation;

type IFormikTextField = FieldProps & TextFieldProps;
type IFormikDateTimePicker = DateTimePickerProps & FieldProps;

const FormikDateTimePicker: React.FC<IFormikDateTimePicker> = ({
  form: { setFieldValue },
  field: { value, name },
  ...rest
}) => {
  return (
    <DateTimePicker
      {...rest}
      value={value}
      onChange={(val) => setFieldValue(name, val.toISOString())}
      renderInput={(props) => <TextField name={name} {...props} />}
    />
  );
};

const FormikTextField: React.FC<IFormikTextField> = ({
  form: { setFieldValue },
  field: { value, name },
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      name={name}
      value={value}
      onChange={(val) => {
        setFieldValue(name, val.target.value);
      }}
    />
  );
};

const OuterDivStyled = styled.div`
  flex-grow: 1;
`;

const PaperStyled = styled(Paper)`
  padding: 2em;
`;

const CreateQuestionPageComponent: React.FC<ICreateQuestionPage> = ({ t }) => {
  const { wallet } = useWallet();
  const [result, setResult] = useState('');
  setWallet(wallet.wallet);
  const initialValues: CreateQuestion = {
    question: '',
    auctionEndDate: new Date(),
    marketCloseDate: new Date(),
  };

  const onFormSubmit = async (formData: CreateQuestion) => {
    console.log(formData);
    const hash = await addIPFSData(formData);
    const newFormData: CreateQuestion = { ...formData, question: hash };
    const response = await createQuestion(newFormData);
    setResult(response);
  };

  return (
    <MainPage>
      <Formik initialValues={initialValues} onSubmit={onFormSubmit}>
        <Form>
          <OuterDivStyled>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <PaperStyled>
                  <Field
                    id="question-field"
                    name="question"
                    label={t('enterQuestion')}
                    variant="outlined"
                    component={FormikTextField}
                  />
                </PaperStyled>
              </Grid>
              <Grid item xs={12} sm={6}>
                <PaperStyled>
                  <Field
                    component={FormikDateTimePicker}
                    label="Auction End Date"
                    name="auctionEndDate"
                    minDateTime={new Date()}
                  />
                </PaperStyled>
              </Grid>
              <Grid item xs={12} sm={6}>
                <PaperStyled>
                  <Field
                    component={FormikDateTimePicker}
                    label="Market Close Date"
                    name="marketCloseDate"
                    minDateTime={new Date()}
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

export const CreateQuestionPage = withTranslation(['common'])(CreateQuestionPageComponent);
