import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Button, Paper, Box, FormLabel } from '@material-ui/core';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { CreateQuestion } from '../../../interfaces';
import { MarketErrors, withdrawAuctionWinnings } from '../../../contracts/Market';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography/Typography';
import { useWallet } from '../../../wallet/hooks';

type WithdrawAuctionPageProps = WithTranslation;

const PaperStyled = styled(Paper)`
  padding: 2em;
  max-width: 50rem;
  min-width: 40rem;
`;

interface PagePathParams {
  questionHash: string;
}
const WithdrawAuctionPageComponent: React.FC<WithdrawAuctionPageProps> = ({ t }) => {
  const [result, setResult] = useState('');
  const { addToast } = useToasts();
  const { wallet } = useWallet();
  const { questionHash } = useParams<PagePathParams>();
  const {
    state: { question },
  } = useLocation<CreateQuestion>();

  const onSubmit = async () => {
    try {
      const response = await withdrawAuctionWinnings(questionHash);
      if (response) {
        addToast('Transaction Submitted', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
      setResult(response);
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
    <MainPage title={t('withdrawAuctionWinningsPage')}>
      <PaperStyled>
        <Grid container spacing={3} direction="column">
          <Grid item xs={12}>
            <FormLabel>{t('question')}</FormLabel>
            <Typography size="h6">{question}</Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Button
              type="submit"
              variant="outlined"
              size="large"
              onClick={onSubmit}
              disabled={!wallet.pkh}
              fullWidth
            >
              {t(!wallet.pkh ? 'connectWalletContinue' : 'submit')}
            </Button>
          </Grid>
          {result && (
            <Grid item xs={6} sm={6}>
              <Box>
                <Button
                  href={`https://better-call.dev/carthagenet/opg/${result}/content`}
                  target="_blank"
                  variant="outlined"
                  size="large"
                  fullWidth
                >
                  {t('result')}
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </PaperStyled>
    </MainPage>
  );
};

export const WithdrawAuctionPage = withTranslation(['common'])(WithdrawAuctionPageComponent);
