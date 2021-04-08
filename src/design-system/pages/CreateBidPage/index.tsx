import React, { useState } from 'react';
import styled from '@emotion/styled';
import * as Yup from 'yup';
import { Grid, Button, Paper, Box } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Form, Formik, Field, FormikHelpers } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router-dom';
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

interface TableType {
  id: number | string;
  address: string;
  rate: number;
  quantity: number;
}

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

const TableColumns = [
  { field: 'address', headerName: 'Address', type: 'string', sortable: false, width: 350 },
  { field: 'rate', headerName: 'Probability', type: 'number', sortable: true, width: 230 },
  { field: 'quantity', headerName: 'Quantity', type: 'number', sortable: true, width: 230 },
];

const CreateBidSchema = Yup.object().shape({
  question: Yup.string().required(),
  quantity: Yup.number().min(50, 'Should be min 50').required('Required'),
  rate: Yup.number()
    .min(0.01, 'Should be min 0.01')
    .max(0.99, 'Should be max 0.99')
    .required('Required'),
});

const CreateBidPageComponent: React.FC<CreateBidPageProps> = ({ t }) => {
  const [result, setResult] = useState('');
  const history = useHistory();
  const { addToast } = useToasts();
  const { questionHash } = useParams<PagePathParams>();
  const {
    state: { question, yes, iconURL, yesAnswer, auction_bids: auctionBids },
  } = useLocation<CreateBidPageLocationState>();
  const initialValues: Bid = {
    question: questionHash,
    quantity: 50,
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
          onDismiss: () => history.push('/'),
        });
      }
      formikHelpers.resetForm();
      setResult(response);
    } catch (error) {
      console.log(error);
      const errorText =
        error?.message ??
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
  let rows = Object.entries(userBids).reduce((acc, [address, data], index) => {
    acc.push({
      id: `${address}-${index}`,
      address,
      rate: divideDown(Number(data.rate)),
      quantity: divideDown(Number(data.quantity)),
    });
    return acc;
  }, new Array<TableType>());
  rows = rows.sort((a, b) => b.rate - a.rate);
  return (
    <MainPage title={t('createBidPage')}>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={CreateBidSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <OuterDivStyled>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <PaperStyled>
                    <Grid container>
                      <Grid item xs={1}>
                        <Identicon url={iconURL} seed={questionHash} type="tzKtCat" />
                      </Grid>
                      <Grid item xs={10}>
                        <Typography size="caption">{t('question')}</Typography>
                        <Typography size="h6">{question}</Typography>
                        {yesAnswer && (
                          <Grid item xs={4} sm={4}>
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
                    xs={2}
                    sm={2}
                    md={2}
                    style={{
                      minWidth: !wallet.pkh ? '20rem' : undefined,
                    }}
                  >
                    <Button
                      type="submit"
                      variant="outlined"
                      size="large"
                      disabled={!wallet.pkh || !isValid || isSubmitting}
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
          <Box style={{ height: 400, width: '100%' }} paddingBottom="3rem" paddingTop="1rem">
            <DataGrid rows={rows} columns={TableColumns} pageSize={10} />
          </Box>
        </>
      )}
    </MainPage>
  );
};

export const CreateBidPage = withTranslation(['common'])(CreateBidPageComponent);
