import { useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Button, Paper, Box } from '@material-ui/core';
import { Form, Formik, Field, FormikHelpers } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { FormikTextField } from '../../atoms/TextField';
import { FormikDateTimePicker } from '../../atoms/DateTimePicker';
import { addIPFSData } from '../../../ipfs/ipfs';
import { CreateQuestion } from '../../../interfaces';
import { createQuestion } from '../../../contracts/Market';
import { MainPage } from '../MainPage';
import { Identicon } from '../../atoms/Identicon';
import { useWallet } from '../../../wallet/hooks';

type CreateQuestionPageProps = WithTranslation;

const PaperStyled = styled(Paper)`
  padding: 2em;
  max-width: 50rem;
  min-width: 40rem;
`;

const CreateQuestionSchema = Yup.object().shape({
  question: Yup.string().min(10, 'must be at least 10 characters').required('Required'),
  yesAnswer: Yup.string().required('Required'),
  iconURL: Yup.string().optional(),
  auctionEndDate: Yup.date()
    .max(Yup.ref('marketCloseDate'), 'Auction end date can not be more than market close date')
    .required('Required'),
  marketCloseDate: Yup.date()
    .min(Yup.ref('auctionEndDate'), 'Market close date can not be less than auction end date')
    .required('Required'),
});

const CreateQuestionPageComponent: React.FC<CreateQuestionPageProps> = ({ t }) => {
  const [result, setResult] = useState('');
  const { wallet } = useWallet();
  const [iconURL, setIconURL] = useState<string | undefined>('');
  const initialValues: CreateQuestion = {
    question: '',
    yesAnswer: '',
    auctionEndDate: new Date(),
    marketCloseDate: new Date(),
    iconURL: '',
  };
  const onFormSubmit = async (
    formData: CreateQuestion,
    formikHelpers: FormikHelpers<CreateQuestion>,
  ) => {
    let question = formData.question.trim();
    if (question.substr(-1) !== '?') {
      question = `${formData.question.trim()}?`;
    }
    const formIconURL = formData.iconURL === '' ? undefined : formData.iconURL;
    const dataToSubmit: CreateQuestion = { ...formData, question, iconURL: formIconURL };
    const hash = await addIPFSData(dataToSubmit);
    const newFormData: CreateQuestion = { ...dataToSubmit, question: hash };
    const response = await createQuestion(newFormData);
    formikHelpers.resetForm();
    setResult(response);
    setIconURL('');
  };

  return (
    <MainPage title={t('createQuestionPage')}>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={CreateQuestionSchema}
      >
        {({ isSubmitting, isValid, dirty }) => (
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
                  sm={12}
                  md={12}
                >
                  <Grid item xs={6} sm={6} md={6}>
                    <Field
                      id="question-field"
                      name="question"
                      label={t('enterQuestion')}
                      variant="outlined"
                      component={FormikTextField}
                      size="medium"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Field
                      component={FormikTextField}
                      label={t('yesAnswerRegex')}
                      name="yesAnswer"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Grid container>
                      <Grid item xs={1}>
                        <Identicon url={iconURL} />
                      </Grid>
                      <Grid item xs={11}>
                        <Field
                          id="question-field"
                          name="iconURL"
                          label={t('iconURL')}
                          variant="outlined"
                          component={FormikTextField}
                          size="medium"
                          fullWidth
                          handleChange={(val: any) => {
                            setIconURL(val.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" spacing={3}>
                    <Grid item xs={4} sm={4} style={{ margin: '3rem' }}>
                      <Field
                        component={FormikDateTimePicker}
                        label={t('auctionEndDate')}
                        name="auctionEndDate"
                        inputFormat="dd/MM/yyyy HH:mm"
                        disablePast
                      />
                    </Grid>
                    <Grid item xs={4} sm={4} style={{ margin: '3rem' }}>
                      <Field
                        component={FormikDateTimePicker}
                        label={t('marketCloseDate')}
                        name="marketCloseDate"
                        inputFormat="dd/MM/yyyy HH:mm"
                        disablePast
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="outlined"
                      size="large"
                      fullWidth
                      disabled={!wallet.pkh || !isValid || isSubmitting || !dirty}
                    >
                      {t(!wallet.pkh ? 'connectWalletContinue' : 'submit')}
                    </Button>
                  </Grid>
                  {result && (
                    <Grid item>
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

export const CreateQuestionPage = withTranslation(['common'])(CreateQuestionPageComponent);
