import React from 'react';
import styled from '@emotion/styled';
import { Grid, Button, Paper, Box, FormLabel } from '@material-ui/core';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { CreateQuestion } from '../../../interfaces';
import { closeAuction, MarketErrors } from '../../../contracts/Market';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography';
import { useWallet } from '../../../wallet/hooks';

type CloseAuctionPageProps = WithTranslation;

const PaperStyled = styled(Paper)`
  padding: 2em;
  max-width: 50rem;
  min-width: 40rem;
`;
interface PagePathParams {
  questionHash: string;
}

const CloseAuctionPageComponent: React.FC<CloseAuctionPageProps> = ({ t }) => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { wallet } = useWallet();
  const { questionHash } = useParams<PagePathParams>();
  const {
    state: { question },
  } = useLocation<CreateQuestion>();

  const onSubmit = async () => {
    try {
      const response = await closeAuction(questionHash);
      if (response) {
        addToast('Transaction Submitted', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
      history.push('/');
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

  return (
    <MainPage title={t('closeAuctionPage')}>
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
        </Grid>
      </PaperStyled>
    </MainPage>
  );
};

export const CloseAuctionPage = withTranslation(['common'])(CloseAuctionPageComponent);
