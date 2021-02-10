import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Button, Paper, Box, FormLabel } from '@material-ui/core';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { CreateQuestion } from '../../../interfaces';
import { withdrawAuctionWinnings } from '../../../contracts/Market';
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
  const { wallet } = useWallet();
  const { questionHash } = useParams<PagePathParams>();
  const {
    state: { question },
  } = useLocation<CreateQuestion>();

  const onSubmit = async () => {
    const response = await withdrawAuctionWinnings(questionHash);
    setResult(response);
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
