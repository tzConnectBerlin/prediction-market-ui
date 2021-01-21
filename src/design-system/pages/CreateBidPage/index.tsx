import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
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
import { FormikTextField } from '../../atoms/TextField';
import { Bid, CreateQuestion } from '../../../interfaces';
import { createBid } from '../../../contracts/Market';
import { MainPage } from '../MainPage';
import { Slider } from '../../atoms/Slider';
import { Typography } from '../../atoms/Typography';
import { getMarketBids } from '../../../api/market';
import { useWallet } from '../../../wallet/hooks';

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

const CreateBidPageComponent: React.FC<CreateBidPageProps> = ({ t }) => {
  const [result, setResult] = useState('');
  const { questionHash, marketAddress } = useParams<PagePathParams>();
  const {
    state: { question },
  } = useLocation<CreateQuestion>();
  const initialValues: Bid = {
    question: questionHash,
    quantity: 0,
    rate: 0.5,
  };
  const { wallet } = useWallet();
  const { data: bidsData } = useQuery<Bid[], AxiosError, Bid[]>(
    `questionBids-${questionHash}`,
    () => {
      return getMarketBids(marketAddress!, questionHash);
    },
  );

  const onFormSubmit = async (formData: Bid, formikHelpers: FormikHelpers<Bid>) => {
    const response = await createBid(formData);
    formikHelpers.resetForm();
    setResult(response);
  };

  return (
    <MainPage title={t('createBidPage')}>
      <Formik initialValues={initialValues} onSubmit={onFormSubmit}>
        <Form>
          <OuterDivStyled>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <PaperStyled>
                  <Typography size="caption">{t('question')}</Typography>
                  <Typography size="h6">{question}</Typography>
                </PaperStyled>
              </Grid>
              <Grid item xs={12} sm={6}>
                <PaperStyled>
                  <Field
                    component={Slider}
                    label={t('rate')}
                    name="rate"
                    min={0}
                    max={1}
                    step={0.01}
                    tooltip="auto"
                    color="#2c7df7"
                    showValueInLabel
                    marks={[
                      {
                        value: 0,
                        label: t('No'),
                      },
                      {
                        value: 1,
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
      {bidsData && bidsData.length > 0 && (
        <>
          <Typography size="h5">{t('currentBids')}</Typography>
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
                {bidsData.map((row, index) => (
                  <TableRow key={row.question}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">{row.rate}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
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
