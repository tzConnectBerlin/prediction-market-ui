import { Grid, TextField, Button, TextFieldProps } from '@material-ui/core';
import { DateTimePicker, DateTimePickerProps } from '@material-ui/pickers';
import { Form, Formik, Field, FieldProps } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
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

const CreateQuestionPageComponent: React.FC<ICreateQuestionPage> = ({ t }) => {
  const wallet = useWallet();
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
    await createQuestion(newFormData);
    console.log(hash);
  };

  return (
    <MainPage>
      <Formik initialValues={initialValues} onSubmit={onFormSubmit}>
        <Form>
          <Grid>
            <Field
              id="question-field"
              name="question"
              label={t('enterQuestion')}
              variant="outlined"
              component={FormikTextField}
            />
            <Field
              component={FormikDateTimePicker}
              name="auctionEndDate"
              minDateTime={new Date()}
            />
            <Field
              component={FormikDateTimePicker}
              name="marketCloseDate"
              minDateTime={new Date()}
            />
            <Button type="submit">{t('submit')}</Button>
          </Grid>
        </Form>
      </Formik>
    </MainPage>
  );
};

export const CreateQuestionPage = withTranslation(['common'])(CreateQuestionPageComponent);
