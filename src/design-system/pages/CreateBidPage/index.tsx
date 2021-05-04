import React, { useState } from 'react';
import styled from '@emotion/styled';
import * as Yup from 'yup';
import {
  Grid,
  Button,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Form, Formik, Field, FormikHelpers } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { FormikTextField } from '../../atoms/TextField';
import {
  AuctionData,
  Bid,
  BidRegistryMDW,
  CreateQuestion,
  QuestionEntryMDW,
} from '../../../interfaces';
import { createBid, MarketErrors } from '../../../contracts/Market';
import { MainPage } from '../MainPage';
import { Slider } from '../../atoms/Slider';
import { Typography } from '../../atoms/Typography';
import { useWallet } from '../../../wallet/hooks';
import { Identicon } from '../../atoms/Identicon';
import { divideDown } from '../../../utils/math';
import { MARKET_ADDRESS } from '../../../utils/globals';
import { useContractQuestions } from '../../../api/queries';

type CreateBidPageProps = WithTranslation;

const OuterDivStyled = styled.div`
  flex-grow: 1;
`;

const PaperStyled = styled(Paper)`
  padding: 2em;
`;

interface PagePathParams {
  questionHash: string;
  marketAddress: string;
}

type CreateBidPageLocationState = CreateQuestion & AuctionData & QuestionEntryMDW;

const CreateBidSchema = Yup.object().shape({
  question: Yup.string().required(),
  quantity: Yup.number().min(1, 'Should be min 1').required('Required'),
  rate: Yup.number()
    .min(0.01, 'Should be min 0.01')
    .max(0.99, 'Should be max 0.99')
    .required('Required'),
});

const CreateBidPageComponent: React.FC<CreateBidPageProps> = ({ t }) => {
  const [result, setResult] = useState('');
  const { addToast } = useToasts();
  const { questionHash } = useParams<PagePathParams>();
  const {
    state: { question, yes, participants, iconURL, yesAnswer, auction_bids: auctionBids },
  } = useLocation<CreateBidPageLocationState>();
  const initialValues: Bid = {
    question: questionHash,
    quantity: 0,
    rate: yes ?? 0.5,
  };
  const { data: marketData } = useContractQuestions();
  const { wallet } = useWallet();

  const onFormSubmit = async (formData: Bid, formikHelpers: FormikHelpers<Bid>) => {
    try {
      const response = await createBid(formData, wallet.pkh!, MARKET_ADDRESS!);
      if (response) {
        addToast('Transaction Submitted', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
      formikHelpers.resetForm();
      setResult(response);
    } catch (error) {
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
  const userBids: BidRegistryMDW = marketData ? marketData[questionHash].auction_bids : auctionBids;
  return (
    <MainPage title={t('createBidPage')}>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={CreateBidSchema}
      >
        {({ isValid, isSubmitting, dirty }) => (
          <Form>
            <OuterDivStyled>
              <Grid container spacing={3} marginBottom={1}>
                <Grid item xs={12} sm={12}>
                  <PaperStyled>
                    <Grid container>
                      <Grid item sm={1}>
                        <Identicon url={iconURL} seed={questionHash} type="tzKtCat" />
                      </Grid>
                      <Grid item xs={10} paddingLeft={0.5}>
                        <Typography size="caption">{t('question')}</Typography>
                        <Typography size="h6">{question}</Typography>
                        {yesAnswer && (
                          <Grid item xs={6} sm={4}>
                            <Typography size="caption">{t('yesAnswerRegex')}</Typography>
                            <Typography size="h6">{yesAnswer}</Typography>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </PaperStyled>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PaperStyled>
                    <Field
                      component={Slider}
                      label={t('yesProbability')}
                      name="rate"
                      min={0.01}
                      max={0.99}
                      step={0.01}
                      tooltip="auto"
                      color="#2c7df7"
                      showValueInLabel
                      marks={[
                        {
                          value: 0.01,
                          label: t('No'),
                        },
                        {
                          value: 0.99,
                          label: t('Yes'),
                        },
                      ]}
                    />
                  </PaperStyled>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PaperStyled style={{ padding: '3.3em' }}>
                    <Field
                      component={FormikTextField}
                      label={t('quantity')}
                      name="quantity"
                      type="number"
                    />
                  </PaperStyled>
                </Grid>
                <Grid container direction="row-reverse" spacing={1} style={{ padding: '1rem' }}>
                  <Grid
                    item
                    xs={4}
                    sm={2}
                    md={1}
                    style={{
                      minWidth: !wallet.pkh ? '20rem' : undefined,
                    }}
                  >
                    <Button
                      type="submit"
                      variant="outlined"
                      size="large"
                      disabled={!wallet.pkh || !isValid || isSubmitting || !dirty}
                    >
                      {t(!wallet.pkh ? 'connectWalletContinue' : 'submit')}
                    </Button>
                  </Grid>
                  {result && (
                    <Grid xs={2} sm={2} md={2}>
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
        )}
      </Formik>
      {userBids && Object.keys(userBids).length > 0 && (
        <>
          <Typography size="h5">{t('currentBids')}</Typography>
          <Typography size="subtitle1" noWrap marginBottom={0.5}>
            {t('participants')}: {participants || Object.keys(userBids).length}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('indexNumber')}</TableCell>
                  <TableCell align="right">{t('rate')}</TableCell>
                  <TableCell align="right">{t('quantity')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(userBids).map(([userHash, row], index) => (
                  <TableRow key={`${userHash}-${index}`}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">{divideDown(Number(row.rate))}</TableCell>
                    <TableCell align="right">{divideDown(Number(row.quantity))}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </MainPage>
  );
};

export const CreateBidPage = withTranslation(['common'])(CreateBidPageComponent);
