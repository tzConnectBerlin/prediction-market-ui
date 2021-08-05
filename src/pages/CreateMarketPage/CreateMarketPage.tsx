import React, { useState } from 'react';
import { validateAddress } from '@taquito/utils';
import styled from '@emotion/styled';
import { Grid, Paper, Box, useMediaQuery, Theme } from '@material-ui/core';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import { Form, Formik, FastField as Field, FormikHelpers } from 'formik';
import { withTranslation, WithTranslation, Trans } from 'react-i18next';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { addDays } from 'date-fns';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
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
import { FA12_CONTRACT } from '../../utils/globals';
import { logError } from '../../logger/logger';

const MIN_CONTRIBUTION = 100;
const TOKEN_TYPE = 'PMM';
const DEFAULT_AUCTION_LENGTH = 2;

type CreateMarketPageProps = WithTranslation;
interface CreateMarketForm {
  imageURL?: string;
  headlineQuestion: string;
  description: string;
  endsOn: Date;
  ticker: string;
  initialBid: number;
  initialContribution: number;
  adjudicator: string;
}

const StyleCenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;
const StyleLeftDiv = styled.div`
  display: flex;
  justify-content: flex-start;
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
  max-width: 86%;
`;

const CreateMarketPageComponent: React.FC<CreateMarketPageProps> = ({ t }) => {
  const { connected, activeAccount, connect } = useWallet();
  const { data: markets } = useMarkets();
  const { addToast } = useToasts();
  const content = (marketQuestion: string, marketId: number, urlHostname: string) => (
    <>
      <div>{t('txSubmitted')}</div>
      <TwitterShare
        color="grey"
        marketQuestion={marketQuestion}
        marketId={marketId}
        urlHostname={urlHostname}
      />
    </>
  );

  const [iconURL, setIconURL] = useState<string | undefined>();
  const initialValues: CreateMarketForm = {
    headlineQuestion: '',
    endsOn: addDays(new Date(), DEFAULT_AUCTION_LENGTH),
    description: '',
    initialBid: 50.0,
    initialContribution: 100,
    ticker: '',
    adjudicator: '',
  };

  const matchSmXs = useMediaQuery((theme: Theme) => theme.breakpoints.between('xs', 'sm'));
  const iconSize = matchSmXs ? 'lg' : 'xxl';
  const onFormSubmit = async (
    formData: CreateMarketForm,
    helpers: FormikHelpers<CreateMarketForm>,
  ) => {
    const account = activeAccount?.address ? activeAccount : await connect();
    if (account?.address && FA12_CONTRACT) {
      const ipfsData: IPFSMarketData = {
        auctionEndDate: formData.endsOn.toISOString(),
        question: formData.headlineQuestion,
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
          initialContribution: tokenMultiplyUp(formData.initialContribution),
        };
        await createMarket(marketCreateParams, account.address);
        const urlHostname = window.location.hostname;
        const marketQuestion = formData.headlineQuestion
          .toLowerCase()
          .replaceAll(' ', '-')
          .replaceAll('?', '');
        addToast(content(marketQuestion, marketCreateParams.marketId, urlHostname), {
          appearance: 'success',
          autoDismiss: false,
        });
        helpers.resetForm();
        setIconURL('');
      } catch (error) {
        logError(error);
        const errorText = error?.data[1]?.with?.string || t('txFailed');
        addToast(errorText, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  };

  const CreateMarketSchema = Yup.object().shape({
    imageURL: Yup.string().optional(),
    headlineQuestion: Yup.string().min(10, 'Min. 10 characters required').required(t('required')),
    description: Yup.string().min(10, 'Min. 10 characters required').required(t('required')),
    endsOn: Yup.date().required(t('required')),
    ticker: Yup.string().max(6, 'Max. 6 characters allowed').required(),
    initialBid: Yup.number()
      .min(0.01, 'Min. allowed 0.01')
      .max(99.99, 'Max. allowed 99.99')
      .required(t('required')),
    initialContribution: Yup.number()
      .min(MIN_CONTRIBUTION, `Quantity must be minimum ${MIN_CONTRIBUTION}`)
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
        message: 'Invalid Address',
      }),
  });

  return (
    <MainPage title={t('createQuestionPage')}>
      <Grid container spacing={3} direction="column" alignContent="center" justifyContent="center">
        <Grid item>
          <StyleCenterDiv>
            <HeadingWrapper elevation={0}>
              <Typography component="h1" size="2rem" marginBottom="1rem">
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
        enableReinitialize
      >
        {({ isValid }) => (
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
                    <StyleLeftDiv>
                      <Typography component="h3" size="1.3rem" marginBottom="1rem">
                        {t('create-market:section.marketDetails.label')}
                      </Typography>
                    </StyleLeftDiv>
                  </Grid>
                  <Grid container item>
                    <Grid
                      container
                      item
                      xs={12}
                      sm={2}
                      marginBottom="1rem"
                      marginTop="0.75rem"
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
                    <Grid item sm={1} />
                    <Grid item xs={12} sm={9}>
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
                      helpMessage={t('create-market:formFields.headlineQuestion.heading')}
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
                      helpMessage={t('create-market:formFields.description.heading')}
                      placeholder={t('inputFieldPlaceholder')}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
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
                      helpMessage={t('create-market:formFields.ticker.heading')}
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
                        <Typography component="h3" size="1.3rem" marginBottom="1rem">
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
                        token: TOKEN_TYPE,
                      })}
                      placeholder={t('inputFieldPlaceholder')}
                      name="initialContribution"
                      type="number"
                      pattern="[0-9]*"
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
                        <Typography size="body2" component="p" marginLeft="0.5rem">
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
                          !connected
                            ? 'create-market:formSubmitWallet'
                            : 'create-market:formSubmit',
                        )}
                        type="submit"
                        variant="contained"
                        size="medium"
                        disabled={!isValid}
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

const CreateMarketPage = withTranslation(['common', 'create-market'])(CreateMarketPageComponent);
export default CreateMarketPage;
