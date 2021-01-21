import { useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Button, Paper, Box } from '@material-ui/core';
import { Form, Formik, Field, FormikHelpers, useFormikContext } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { FormikTextField } from '../../atoms/TextField';
import { FormikDateTimePicker } from '../../atoms/DateTimePicker';
import { addIPFSData } from '../../../ipfs/ipfs';
import { CreateQuestion } from '../../../interfaces';
import { createQuestion } from '../../../contracts/Market';
import { MainPage } from '../MainPage';
import { Identicon } from '../../atoms/Identicon';
import { useWallet } from '../../../wallet/hooks';

type CreateQuestionPageProps = WithTranslation;

const OuterDivStyled = styled.div`
  flex-grow: 1;
`;

const PaperStyled = styled(Paper)`
  padding: 2em;
`;

const CreateQuestionPageComponent: React.FC<CreateQuestionPageProps> = ({ t }) => {
  const [result, setResult] = useState('');
  const { wallet } = useWallet();
  const [iconURL, setIconURL] = useState<string | undefined>('');
  const initialValues: CreateQuestion = {
    question: '',
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
                    size="medium"
                    fullWidth
                  />
                </PaperStyled>
              </Grid>
              <Grid item xs={12} sm={12}>
                <PaperStyled>
                  <Grid container xs={12} sm={12}>
                    <Grid item xs={1}>
                      <Identicon url={iconURL} />
                    </Grid>
                    <Grid item xs={10}>
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
                </PaperStyled>
              </Grid>
              <Grid item xs={12} sm={6}>
                <PaperStyled>
                  <Field
                    component={FormikDateTimePicker}
                    label={t('auctionEndDate')}
                    name="auctionEndDate"
                    inputFormat="dd/MM/yyyy HH:mm"
                    disablePast
                  />
                </PaperStyled>
              </Grid>
              <Grid item xs={12} sm={6}>
                <PaperStyled>
                  <Field
                    component={FormikDateTimePicker}
                    label={t('marketCloseDate')}
                    name="marketCloseDate"
                    inputFormat="dd/MM/yyyy HH:mm"
                    disablePast
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

export const CreateQuestionPage = withTranslation(['common'])(CreateQuestionPageComponent);
