import React, { useState } from 'react';
import { validateAddress } from '@taquito/utils';
import styled from '@emotion/styled';
import { Grid, Paper, Box, useMediaQuery, useTheme, Theme } from '@mui/material';
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined';
import { Form, Formik, FastField as Field, FormikHelpers } from 'formik';
import { withTranslation, WithTranslation, Trans } from 'react-i18next';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { addDays } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { FormikDateTimePicker } from '../../design-system/organisms/FormikDateTimePicker';
import { FormikTextField } from '../../design-system/molecules/FormikTextField';
import { MainPage } from '../MainPage/MainPage';
import { Identicon, StyledAvatar } from '../../design-system/atoms/Identicon/Identicon';
import { FormikSlider } from '../../design-system/molecules/FormikSlider';
import { Typography } from '../../design-system/atoms/Typography';
import { CustomButton } from '../../design-system/atoms/Button';
import { TwitterShare } from '../../design-system/atoms/TwitterShare';
import { FormikCheckBox } from '../../design-system/molecules/FormikCheckbox';
import { useMarkets } from '../../api/queries';
import { CreateMarket, IPFSMarketData } from '../../interfaces';
import { addIPFSData } from '../../ipfs/ipfs';
import { multiplyUp, tokenMultiplyUp } from '../../utils/math';
import { createMarket } from '../../contracts/Market';
import { CURRENCY_SYMBOL, FA12_CONTRACT, MARKET_CRREATOR } from '../../globals';
import { logError } from '../../logger/logger';
import { useStore } from '../../store/store';
import { questionToURL } from '../../utils/misc';
import { useConditionalWallet } from '../../wallet/hooks';

const MIN_CONTRIBUTION = 100;
const DEFAULT_AUCTION_LENGTH = 2;

type CreateMarketPageProps = WithTranslation;
interface CreateMarketForm {
  imageURL?: string;
  headlineQuestion: string;
  description: string;
  endsOn: Date;
  ticker: string;
  initialBid: number;
  initialContribution: number | string;
  adjudicator: string;
}

const StyleCenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;
const StyleLeftDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 0.25rem;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  align-items: flex-start;
  padding: 1rem 0rem 2rem 0rem;
  & .subheading {
    opacity: 0.6;
  }
  & .css-kon24v-MuiFormHelperText-root {
    font-size: 1rem;
  }
`;

const PaperStyled = styled(Paper)`
  padding: 3rem;
  &.auction-details {
    margin-top: 3.5rem;
  }
  @media (max-width: 600px) {
    padding: 2rem;
  }
`;

const HeadingWrapper = styled(Paper)`
  padding: 3.75rem 0rem 2.5rem 0rem;
  margin-top: 1rem;
`;

const StyledPanoramaOutlinedIcon = styled(PanoramaOutlinedIcon)`
  fill: rgba(29, 34, 39, 0.38);
`;

const StyledForm = styled(Form)<{ theme: Theme }>`
  width: 58.8%;
  @media (max-width: 900px) {
    width: 90%;
  }
  & .MuiInputBase-formControl {
    background-color: ${({ theme }) => theme.palette.grey[300]};
  }
`;

const StyledUrlField = styled(Grid)`
  padding-left: 2.625rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  @media (max-width: 600px) {
    padding-left: 0;
    width: max-content;
  }
`;

const StyledQuestionGrid = styled(Grid)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

interface SuccessNotificationProps {
  successMessage: string;
  title: string;
  text: string;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({ successMessage, ...rest }) => (
  <>
    <div>{successMessage}</div>
    <TwitterShare color="grey" {...rest} />
  </>
);

const CreateMarketPageComponent: React.FC<CreateMarketPageProps> = ({ t }) => {
  const { connected, activeAccount, connect } = useConditionalWallet();
  const { data: markets } = useMarkets();
  const { addToast } = useToasts();
  const history = useHistory();
  const { pendingMarketIds, setPendingMarketIds } = useStore((state) => state);
  const theme = useTheme();

  const [iconURL, setIconURL] = useState<string | undefined>();
  const initialValues: CreateMarketForm = {
    headlineQuestion: '',
    endsOn: addDays(new Date(), DEFAULT_AUCTION_LENGTH),
    description: '',
    initialBid: 50.0,
    initialContribution: '',
    ticker: '',
    adjudicator: MARKET_CRREATOR || '',
  };

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const matchSmXs = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const iconSize = matchSmXs ? 'lg' : 'xxl';
  const onFormSubmit = async (
    formData: CreateMarketForm,
    helpers: FormikHelpers<CreateMarketForm>,
  ) => {
    const finalQuestion = formData.headlineQuestion.trim().endsWith('?')
      ? formData.headlineQuestion.trim()
      : `${formData.headlineQuestion.trim()}?`;
    if (activeAccount?.address && FA12_CONTRACT) {
      const ipfsData: IPFSMarketData = {
        auctionEndDate: formData.endsOn.toISOString(),
        question: finalQuestion,
        iconURL: formData.imageURL,
        ticker: formData.ticker.toUpperCase(),
      };
      try {
        const ipfsHash = await addIPFSData(ipfsData);
        const marketCreateParams: CreateMarket = {
          marketId: typeof markets === 'undefined' ? 1 : Number(markets[0]?.marketId ?? 0) + 1,
          ipfsHash,
          description: formData.description,
          adjudicator: formData.adjudicator,
          tokenType: 'fa12',
          tokenAddress: FA12_CONTRACT,
          auctionEnd: formData.endsOn.toISOString(),
          initialBid: multiplyUp(formData.initialBid / 100),
          initialContribution: tokenMultiplyUp(Number(formData.initialContribution)),
        };
        await createMarket(marketCreateParams, activeAccount?.address);
        setPendingMarketIds([...pendingMarketIds, marketCreateParams.marketId]);
        const marketQuestion = questionToURL(formData.headlineQuestion);
        const text = `${t('twitterShareMessage')} ${window.location.protocol}//${
          window.location.hostname
        }/market/${marketCreateParams.marketId}/${marketQuestion}`;
        addToast(
          <SuccessNotification
            successMessage={`${t('txSubmitted')}. ${t('createMarketSuccess')}`}
            title={t('shareNow')}
            text={text}
          />,
          {
            appearance: 'success',
            autoDismiss: true,
            onDismiss: () => history.push('/'),
          },
        );
        helpers.resetForm();
        setIconURL('');
      } catch (error: any) {
        logError(error);
        const errorText = error?.data?.[1]?.with?.string || error?.description || t('txFailed');
        addToast(errorText, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  };

  const CreateMarketSchema = Yup.object().shape({
    imageURL: Yup.string().optional(),
    headlineQuestion: Yup.string()
      .min(10, t('create-market:validations.minCharacters', { min: 10 }))
      .required(t('required')),
    description: Yup.string()
      .min(10, t('create-market:validations.minCharacters', { min: 10 }))
      .required(t('required')),
    endsOn: Yup.date().required(t('required')),
    ticker: Yup.string()
      .max(6, t('create-market:validations.maxTicker', { max: 6 }))
      .required(t('required')),
    initialBid: Yup.number()
      .min(0.01, t('create-market:validations.minAllowed', { min: 0.01 }))
      .max(99.99, t('create-market:validations.maxAllowed', { max: 99.99 }))
      .required(t('required')),
    initialContribution: Yup.number()
      .min(
        MIN_CONTRIBUTION,
        t('create-market:validations.initialContribution', { min: MIN_CONTRIBUTION }),
      )
      .required(t('required')),
    termsAndConditions: Yup.boolean()
      .test({
        test: (value) => value === true,
        message: t('required'),
      })
      .required(),
    adjudicator: Yup.string()
      .test({
        test: (value) => Boolean(value),
        message: t('required'),
      })
      .test({
        test: (value) => validateAddress(value) === 3,
        message: t('invalidAddress'),
      }),
  });

  return (
    <MainPage title={t('createQuestionPage')}>
      <Grid
        container
        direction="column"
        alignContent="center"
        justifyContent="center"
        width={isTablet ? '90%' : '58.8%'}
        margin="auto"
      >
        <Grid item>
          <StyleCenterDiv>
            <HeadingWrapper elevation={0}>
              <Typography size="h1" marginBottom="1rem">
                {t('createQuestionPage')}
              </Typography>
              <Typography size="body1" color={theme.palette.text.secondary}>
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
        {({ isValid }) => (
          <StyledFormWrapper>
            <StyledForm theme={theme}>
              <PaperStyled>
                <Grid
                  container
                  spacing={3}
                  direction="column"
                  alignContent="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <StyleLeftDiv>
                      <Typography size="h2" marginBottom="1rem">
                        {t('create-market:section.marketDetails.label')}
                      </Typography>
                    </StyleLeftDiv>
                  </Grid>
                  <Grid container item width="auto">
                    <Grid
                      container
                      item
                      xs={12}
                      sm={1}
                      marginBottom="1rem"
                      marginTop="0.75rem"
                      paddingLeft={isMobile ? '0' : '1.5rem'}
                      justifyContent="center"
                    >
                      {iconURL ? (
                        <Identicon url={iconURL} type="blockies" iconSize={iconSize} />
                      ) : (
                        <StyledAvatar className={iconSize}>
                          <StyledPanoramaOutlinedIcon />
                        </StyledAvatar>
                      )}
                    </Grid>
                    <StyledUrlField container item xs={12} sm={11}>
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
                    </StyledUrlField>
                  </Grid>

                  <StyledQuestionGrid item xs={12} md={12} lg={12} minWidth="97%">
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
                      helpMessage={t('create-market:formFields.headlineQuestion.heading')}
                      placeholder={t('inputFieldPlaceholder')}
                    />
                  </StyledQuestionGrid>
                  <StyledQuestionGrid item xs={12} md={12} lg={12}>
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
                      helpMessage={t('create-market:formFields.description.heading')}
                      placeholder={t('inputFieldPlaceholder')}
                    />
                  </StyledQuestionGrid>
                  {!MARKET_CRREATOR && (
                    <StyledQuestionGrid item xs={12} md={12} lg={12}>
                      <Field
                        id="question-adjudicator-field"
                        name="adjudicator"
                        label={t('create-market:formFields.adjudicator.label')}
                        helpMessage={t('create-market:formFields.adjudicator.heading')}
                        component={FormikTextField}
                        size="medium"
                        fullWidth
                        required
                        placeholder={t('inputFieldPlaceholder')}
                      />
                    </StyledQuestionGrid>
                  )}
                  <StyledQuestionGrid item xs={12} md={12} lg={12} minWidth="97%">
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
                      helpMessage={t('create-market:formFields.ticker.heading')}
                      placeholder={t('inputFieldPlaceholder')}
                    />
                  </StyledQuestionGrid>
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
                        <Typography size="h2" marginBottom="1rem">
                          {t('create-market:section.auctionPhase.label')}
                        </Typography>
                        <Typography size="body1" color={theme.palette.text.secondary}>
                          {t('create-market:section.auctionPhase.subtitle')}
                        </Typography>
                      </div>
                    </StyleCenterDiv>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12} minWidth="97%">
                    <Field
                      id="endsOn-field"
                      component={FormikDateTimePicker}
                      label={t('create-market:formFields.endsOn.label')}
                      name="endsOn"
                      fullWidth
                      required
                      helpMessage={t('create-market:formFields.endsOn.heading')}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Field
                      component={FormikSlider}
                      label={t('create-market:formFields.initialBid.label')}
                      name="initialBid"
                      min={1}
                      max={99}
                      textFieldInputProps={{
                        endAdornment: '%',
                      }}
                      step={0.01}
                      required
                      helpMessage={t('create-market:formFields.initialBid.heading')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      label={t('create-market:formFields.initialContribution.label')}
                      helpMessage={t('create-market:formFields.initialContribution.heading', {
                        amount: MIN_CONTRIBUTION,
                        token: CURRENCY_SYMBOL,
                      })}
                      placeholder={t('inputFieldPlaceholder')}
                      name="initialContribution"
                      type="number"
                      pattern="[0-9]*"
                      min={MIN_CONTRIBUTION}
                      fullWidth
                      InputProps={{
                        endAdornment: CURRENCY_SYMBOL,
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
                  <Grid item marginX={isTablet ? '0' : '3.5rem'}>
                    <Field
                      component={FormikCheckBox}
                      name="termsAndConditions"
                      type="checkbox"
                      label={
                        <Typography size="body1" marginLeft="0.5rem">
                          <Trans i18nKey="multiline">{t('create-market:tosCheckbox')}</Trans>
                        </Typography>
                      }
                      labelPlacement="end"
                      required
                    />
                  </Grid>
                  <Grid item marginTop="0.75rem" marginBottom="0.2rem">
                    <StyleCenterDiv>
                      <CustomButton
                        label={t(!connected ? 'connectWalletContinue' : 'create-market:formSubmit')}
                        type={!connected ? 'button' : 'submit'}
                        variant="contained"
                        size="medium"
                        onClick={!connected ? connect : undefined}
                      />
                    </StyleCenterDiv>
                  </Grid>
                  <Grid item flexDirection="column">
                    <StyleCenterDiv>
                      <Typography mb="1rem" size="body1">
                        {t('requiredField')}
                      </Typography>
                    </StyleCenterDiv>
                    <StyleCenterDiv>
                      <Typography
                        size="body1"
                        color={theme.palette.text.secondary}
                        textAlign="center"
                      >
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

const CreateMarketPage = withTranslation(['common', 'create-market'])(CreateMarketPageComponent);
export default CreateMarketPage;
