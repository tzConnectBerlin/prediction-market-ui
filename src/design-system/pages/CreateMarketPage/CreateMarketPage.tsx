import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Paper, Box, useMediaQuery, Theme } from '@material-ui/core';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import { Form, Formik, Field } from 'formik';
import { withTranslation, WithTranslation, Trans } from 'react-i18next';
import * as Yup from 'yup';
import { FormikDateTimePicker } from '../../organisms/FormikDateTimePicker';
import { FormikTextField } from '../../molecules/FormikTextField';
import { CreateQuestion } from '../../../interfaces';
import { MainPage } from '../MainPage/MainPage';
import { Identicon, StyledAvatar } from '../../atoms/Identicon/Identicon';
import { useWallet } from '../../../wallet/hooks';
import { FormikSlider } from '../../molecules/FormikSlider';
import { Typography } from '../../atoms/Typography';
import { CustomButton } from '../../atoms/Button';
import { FormikCheckBox } from '../../molecules/FormikCheckbox';

const MIN_CONTRIBUTION = 100;
const TOKEN_TYPE = 'USDtz';
type CreateMarketPageProps = WithTranslation;
type CreateMarketForm = CreateQuestion;

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
  padding: 2rem;
  min-width: 70%;
  &.auction-details {
    margin-top: 4rem;
  }
`;

const HeadingWrapper = styled(Paper)`
  padding: 2rem;
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

const CreateMarketSchema = Yup.object().shape({
  imageURL: Yup.string().optional(),
  headlineQuestion: Yup.string().min(10).required('Required'),
  description: Yup.string().min(10).required('Required'),
  endsOn: Yup.date().min(new Date()).required('Required'),
  ticker: Yup.string().required(),
  auctionLength: Yup.number().integer().required(),
  initialBid: Yup.number().min(0.01).max(99.99).required('Required'),
  initialContribution: Yup.number().min(100, 'Quantity must be minimum 100').required('Required'),
  termsAndConditions: Yup.boolean()
    .test({
      test: (value) => value === true,
      message: 'Required',
    })
    .required(),
});

const CreateMarketPageComponent: React.FC<CreateMarketPageProps> = ({ t }) => {
  const { wallet } = useWallet();
  const [iconURL, setIconURL] = useState<string | undefined>();
  const initialValues: CreateMarketForm = {
    question: '',
    yesAnswer: '',
    auctionEndDate: new Date(),
    marketCloseDate: new Date(),
    iconURL: '',
    quantity: 100,
    rate: 0.5,
  };
  const matchSmXs = useMediaQuery((theme: Theme) => theme.breakpoints.between('xs', 'sm'));
  const iconSize = matchSmXs ? 'lg' : 'xxl';
  const onFormSubmit = async (formData: CreateMarketForm) => {
    console.log(formData);
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
        validationSchema={CreateMarketSchema}
      >
        {({ isSubmitting, isValid, dirty, errors, values }) => (
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
                          <Identicon url={iconURL} type="blockies" iconSize={iconSize} />
                        ) : (
                          <StyledAvatar className={iconSize}>
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
                          placeholder={t('inputFieldPlaceholder')}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12} minWidth="97%">
                    <Field
                      id="headlineQuestion-field"
                      name="headlineQuestion"
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
                      placeholder={t('inputFieldPlaceholder')}
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
                      placeholder={t('inputFieldPlaceholder')}
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
                      placeholder={t('inputFieldPlaceholder')}
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
                          {t('create-market:section.auctionPhase.label')}
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
                      placeholder={t('inputFieldPlaceholder')}
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
                      placeholder={t('inputFieldPlaceholder')}
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
                    <Field
                      component={FormikCheckBox}
                      name="termsAndConditions"
                      type="checkbox"
                      label={
                        <Typography size="body2" component="p">
                          <Trans i18nKey="multiline">{t('create-market:tosCheckbox')}</Trans>
                        </Typography>
                      }
                      labelPlacement="end"
                      required
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

export const CreateMarketPage = withTranslation(['common', 'create-market'])(
  CreateMarketPageComponent,
);
