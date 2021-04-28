import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Button, Paper, Box, Checkbox, FormControlLabel } from '@material-ui/core';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import { Form, Formik, Field, FormikHelpers } from 'formik';
import { withTranslation, WithTranslation, Trans } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FormikDateTimePicker } from '../../organisms/FormikDateTimePicker';
import { FormikTextField } from '../../molecules/FormikTextField';
import { addIPFSData } from '../../../ipfs/ipfs';
import { CreateQuestion } from '../../../interfaces';
import { createQuestion, MarketErrors } from '../../../contracts/Market';
import { MainPage } from '../MainPage';
import { Identicon, StyledAvatar } from '../../atoms/Identicon/Identicon';
import { useWallet } from '../../../wallet/hooks';
import { FormikSlider } from '../../molecules/FormikSlider';
import { Typography } from '../../atoms/Typography';
import { MARKET_ADDRESS } from '../../../utils/globals';
import { CustomButton } from '../../atoms/Button';

const MIN_CONTRIBUTION = 100;
const TOKEN_TYPE = 'USDtz';
type CreateQuestionPageProps = WithTranslation;
type CreateQuestionForm = CreateQuestion;

const StyleCenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  align-items: flex-start;
  padding-bottom: 2rem;
  & .subheading {
    opacity: 0.6;
  }
`;

const PaperStyled = styled(Paper)`
  padding: 2em;
  min-width: 70%;
  &.auction-details {
    margin-top: 4em;
  }
`;

const HeadingWrapper = styled(Paper)`
  padding: 2em;
  margin-top: 1rem;
  max-width: 75%;
  & .subheading {
    opacity: 0.6;
  }
`;

const StyledPanoramaOutlinedIcon = styled(PanoramaOutlinedIcon)`
  fill: rgba(29, 34, 39, 0.38);
`;

const StyledForm = styled(Form)`
  max-width: 76%;
`;

const CreateQuestionSchema = Yup.object().shape({
  question: Yup.string().min(10, 'must be at least 10 characters').required('Required'),
  description: Yup.string().min(10, 'must be at least 10 characters').required('Required'),
  yesAnswer: Yup.string().required('Required'),
  imageURL: Yup.string().optional(),
  endsOn: Yup.date().min(new Date(), 'Should be greater than current time').required('Required'),
  rate: Yup.number()
    .min(0.01, 'Probability can not be set less than 0.01')
    .max(0.99, 'Probability can not be set greater than 0.99')
    .required('Required'),
  quantity: Yup.number().min(100, 'Quantity must be minimum 100').required('Required'),
});

const CreateQuestionPageComponent: React.FC<CreateQuestionPageProps> = ({ t }) => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { wallet } = useWallet();
  const [iconURL, setIconURL] = useState<string | undefined>();
  const initialValues: CreateQuestionForm = {
    question: '',
    yesAnswer: '',
    auctionEndDate: new Date(),
    marketCloseDate: new Date(),
    iconURL: '',
    quantity: 100,
    rate: 0.5,
  };
  const onFormSubmit = async (
    formData: CreateQuestionForm,
    formikHelpers: FormikHelpers<CreateQuestionForm>,
  ) => {
    try {
      let question = formData.question.trim();
      if (question.substr(-1) !== '?') {
        question = `${formData.question.trim()}?`;
      }
      const formIconURL = formData.iconURL === '' ? undefined : formData.iconURL;
      const dataToSubmit: CreateQuestion = {
        question,
        iconURL: formIconURL,
        marketCloseDate:
          formData.marketCloseDate instanceof Date
            ? formData.marketCloseDate.toISOString()
            : formData.marketCloseDate,
        auctionEndDate:
          formData.auctionEndDate instanceof Date
            ? formData.auctionEndDate.toISOString()
            : formData.auctionEndDate,
        yesAnswer: formData.yesAnswer,
      };
      const hash = await addIPFSData(dataToSubmit);
      const newFormData: CreateQuestion = {
        ...dataToSubmit,
        question: hash,
        rate: formData.rate!,
        quantity: formData.quantity!,
      };
      const response = await createQuestion(newFormData, wallet.pkh!, MARKET_ADDRESS!);
      if (response) {
        addToast('Transaction Submitted', {
          appearance: 'success',
          autoDismiss: true,
          onDismiss: () => history.push('/'),
        });
      }
      formikHelpers.resetForm();
      setIconURL('');
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
    <MainPage title={t('createQuestionPage')}>
      <Grid container spacing={3} direction="column" alignContent="center" justifyContent="center">
        <Grid item>
          <StyleCenterDiv>
            <HeadingWrapper elevation={0}>
              <Typography component="h1" size="2rem">
                {t('createQuestionPage')}
              </Typography>
              <Typography size="subtitle1" className="subheading" component="h2">
                {t('create-market:pageDescription')}
              </Typography>
            </HeadingWrapper>
          </StyleCenterDiv>
        </Grid>
      </Grid>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={CreateQuestionSchema}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <StyledFormWrapper>
            <StyledForm>
              <PaperStyled>
                <Grid
                  container
                  spacing={3}
                  direction="column"
                  alignContent="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <StyleCenterDiv>
                      <div>
                        <Typography component="h3" size="1.3rem">
                          {t('create-market:section.marketDetails.label')}
                        </Typography>
                        <Typography size="subtitle2" className="subheading" component="h4">
                          {t('create-market:section.marketDetails.subtitle')}
                        </Typography>
                      </div>
                    </StyleCenterDiv>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Grid container>
                      <Grid item xs={3} lg={2} md={2}>
                        {iconURL ? (
                          <Identicon url={iconURL} type="blockies" />
                        ) : (
                          <StyledAvatar className="xl">
                            <StyledPanoramaOutlinedIcon />
                          </StyledAvatar>
                        )}
                      </Grid>
                      <Grid item xs={9} lg={10} md={10}>
                        <Field
                          id="image-url-field"
                          name="imageURL"
                          label={t('create-market:formFields.imageURL.label')}
                          helpMessage={t('create-market:formFields.imageURL.heading')}
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
                  <Grid item xs={12} md={12} lg={12} minWidth="97%">
                    <Field
                      id="question-field"
                      name="question"
                      label={t('create-market:formFields.headlineQuestion.label')}
                      component={FormikTextField}
                      size="medium"
                      fullWidth
                      required
                      InputProps={{
                        endAdornment: '?',
                      }}
                      tooltip
                      tooltipText={t('create-market:formFields.headlineQuestion.tooltip')}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Field
                      id="question-description-field"
                      name="description"
                      label={t('create-market:formFields.description.label')}
                      component={FormikTextField}
                      size="medium"
                      fullWidth
                      multiline
                      rows="3"
                      required
                      tooltip
                      tooltipText={t('create-market:formFields.description.tooltip')}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Field
                      id="endsOn-field"
                      component={FormikDateTimePicker}
                      label={t('create-market:formFields.endsOn.label')}
                      name="endsOn"
                      fullWidth
                      required
                      tooltip
                      tooltipText={t('create-market:formFields.endsOn.tooltip')}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12} minWidth="97%">
                    <Field
                      id="ticker-field"
                      name="ticker"
                      label={t('create-market:formFields.ticker.label')}
                      component={FormikTextField}
                      size="medium"
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: '$',
                      }}
                      tooltip
                      tooltipText={t('create-market:formFields.ticker.tooltip')}
                    />
                  </Grid>
                </Grid>
              </PaperStyled>

              <PaperStyled className="auction-details">
                <Grid
                  container
                  spacing={3}
                  direction="column"
                  alignContent="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <StyleCenterDiv>
                      <div>
                        <Typography component="h3" size="1.3rem">
                          {t('auctionDetails')}
                        </Typography>
                        <Typography size="subtitle2" className="subheading" component="h4">
                          {t('create-market:section.auctionPhase.subtitle')}
                        </Typography>
                      </div>
                    </StyleCenterDiv>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12} minWidth="97%">
                    <Field
                      id="auction-length-field"
                      name="auctionLength"
                      label={t('create-market:formFields.auctionLength.label')}
                      helpMessage={t('create-market:formFields.auctionLength.heading')}
                      component={FormikTextField}
                      size="medium"
                      fullWidth
                      required
                      InputProps={{
                        endAdornment: t('days'),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Field
                      component={FormikSlider}
                      label={t('create-market:formFields.initialBid.label')}
                      name="initialBid"
                      min={1}
                      max={99}
                      step={0.01}
                      tooltip="auto"
                      required
                      tooltipText={t('create-market:formFields.initialBid.tooltip')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      label={t('create-market:formFields.initialContribution.label')}
                      helpMessage={t('create-market:formFields.initialContribution.heading', {
                        amount: MIN_CONTRIBUTION,
                        token: TOKEN_TYPE,
                      })}
                      name="initialContribution"
                      type="number"
                      min={MIN_CONTRIBUTION}
                      fullWidth
                      InputProps={{
                        endAdornment: TOKEN_TYPE,
                      }}
                      required
                    />
                  </Grid>
                </Grid>
              </PaperStyled>
              <Box mt="2rem">
                <Grid
                  container
                  spacing={3}
                  direction="column"
                  alignContent="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <FormControlLabel
                      value="end"
                      control={<Checkbox />}
                      label={
                        <Typography size="body2" component="p">
                          <Trans i18nKey="multiline">{t('create-market:tosCheckbox')}</Trans>
                        </Typography>
                      }
                      labelPlacement="end"
                    />
                  </Grid>
                  <Grid item>
                    <StyleCenterDiv>
                      <CustomButton
                        label={t(
                          !wallet.pkh ? 'connectWalletContinue' : 'create-market:formSubmit',
                        )}
                        type="submit"
                        variant="contained"
                        size="medium"
                        disabled={!wallet.pkh || !isValid || isSubmitting || !dirty}
                      />
                    </StyleCenterDiv>
                  </Grid>
                  <Grid item>
                    <StyleCenterDiv>
                      <Typography size="caption" className="subheading" component="p">
                        <Trans i18nKey="multiline">{t('create-market:walletFlow')}</Trans>
                      </Typography>
                    </StyleCenterDiv>
                  </Grid>
                </Grid>
              </Box>
            </StyledForm>
          </StyledFormWrapper>
        )}
      </Formik>
    </MainPage>
  );
};

export const CreateQuestionPage = withTranslation(['common', 'create-market'])(
  CreateQuestionPageComponent,
);
