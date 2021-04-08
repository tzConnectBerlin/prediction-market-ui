import React from 'react';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { useToasts } from 'react-toast-notifications';
import { Grid, Button, Paper, FormLabel } from '@material-ui/core';
import { Form, Formik, Field, FormikHelpers } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { FormikTextField } from '../../atoms/TextField';
import { RadioButtonGroup, RadioButtonField } from '../../atoms/RadioButtonGroup';
import { BuyToken, CreateQuestion, TokenType } from '../../../interfaces';
import { buyToken, MarketErrors } from '../../../contracts/Market';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography';
import { useWallet } from '../../../wallet/hooks';
import { Identicon } from '../../atoms/Identicon';
import { MARKET_ADDRESS } from '../../../utils/globals';

type BuyTokenPageProps = WithTranslation;

const PaperStyled = styled(Paper)`
  padding: 2em;
  max-width: 50rem;
  min-width: 40rem;
`;

interface PagePathParams {
  questionHash: string;
}

const BuyTokenPageComponent: React.FC<BuyTokenPageProps> = ({ t }) => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { wallet } = useWallet();
  const { questionHash } = useParams<PagePathParams>();
  const {
    state: { question, iconURL },
  } = useLocation<CreateQuestion>();

  const BuyTokenSchema = Yup.object().shape({
    question: Yup.string().required('Required'),
    quantity: Yup.number().min(1, 'Quantity must be minimum 1').required('Required'),
    tokenType: Yup.string().oneOf([TokenType.no, TokenType.yes]).required('Required'),
  });

  const initialValues: BuyToken = {
    question: questionHash,
    quantity: 0,
    tokenType: TokenType.yes,
  };

  const tokenFieldData: RadioButtonField[] = [
    {
      fieldLabel: t(TokenType.no),
      fieldValue: TokenType.no,
    },
    {
      fieldLabel: t(TokenType.yes),
      fieldValue: TokenType.yes,
    },
  ];

  const onFormSubmit = async (formData: BuyToken, formikHelpers: FormikHelpers<BuyToken>) => {
    try {
      const response = await buyToken(formData, wallet.pkh!, MARKET_ADDRESS!);
      if (response) {
        addToast('Transaction Submitted', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
      formikHelpers.resetForm();
      history.push('/');
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
    <MainPage title={t('buyTokenPage')}>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={BuyTokenSchema}
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
                  <Grid item xs={12} sm={12} md={12}>
                    <FormLabel title={t('question')}>{t('question')}</FormLabel>
                    <Grid
                      container
                      item
                      xs={12}
                      direction="row"
                      spacing={3}
                      sx={{ paddingTop: '1rem' }}
                    >
                      <Grid item xs={2} style={{ paddingRight: '4rem' }}>
                        <Identicon seed={questionHash} url={iconURL} type="tzKtCat" />
                      </Grid>
                      <Grid item xs={8} style={{ paddingLeft: '0' }}>
                        <Typography size="h6">{question}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Field
                      component={RadioButtonGroup}
                      title={t('selectToken')}
                      name="tokenType"
                      values={tokenFieldData}
                      labelPlacement="start"
                      row
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Field
                      component={FormikTextField}
                      label={t('quantity')}
                      name="quantity"
                      type="number"
                      min="1"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Button
                      type="submit"
                      variant="outlined"
                      size="large"
                      disabled={!wallet.pkh || !isValid || isSubmitting || !dirty}
                      fullWidth
                    >
                      {t(!wallet.pkh ? 'connectWalletContinue' : 'submit')}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </PaperStyled>
          </div>
        )}
      </Formik>
    </MainPage>
  );
};

export const BuyTokenPage = withTranslation(['common'])(BuyTokenPageComponent);
