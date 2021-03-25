import { Container, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import BigNumber from 'bignumber.js';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useWallet } from '../../../wallet/hooks';
import { Typography } from '../../atoms/Typography';
import { Header } from '../../molecules/Header';
import { APP_NAME, NETWORK, MARKET_ADDRESS } from '../../../utils/globals';
import { DEFAULT_LANGUAGE } from '../../../i18n';
import { getAllStablecoinBalances } from '../../../api/mdw';
import { StableCoinResponse } from '../../../interfaces';

const ContainerStyled = styled(Container)`
  padding-top: 1em;
`;

interface MainPageProps {
  title?: string;
  description?: string;
}

interface MainPageLocationStateParams {
  backPath?: string;
}

export const MainPage: React.FC<MainPageProps> = ({ title, children, description }) => {
  const { wallet, setWallet } = useWallet();
  const { state } = useLocation<MainPageLocationStateParams>();
  const history = useHistory();
  const { i18n, t } = useTranslation(['common']);
  const lang = i18n.language || window.localStorage.i18nextLng || DEFAULT_LANGUAGE;
  const pageTitle = title ? `${title} - ${APP_NAME} - ${NETWORK}` : `${APP_NAME} - ${NETWORK}`;
  const [userBalance, setUserBalance] = useState('0');
  const { data: stableCoinData } = useQuery<StableCoinResponse, AxiosError, StableCoinResponse>(
    'stablecoinData',
    async () => {
      return getAllStablecoinBalances();
    },
  );

  useEffect(() => {
    stableCoinData && wallet && wallet.pkh && stableCoinData[wallet.pkh]
      ? setUserBalance(new BigNumber(stableCoinData[wallet.pkh]).shiftedBy(-18).toString())
      : setUserBalance('0');
  }, [wallet, stableCoinData]);

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      <Header
        title={t('appTitle')}
        walletAvailable={!!wallet?.pkh}
        setWallet={setWallet}
        wallet={wallet}
        onClick={() => history.push('/')}
        marketAddress={MARKET_ADDRESS}
        userBalance={userBalance}
      />
      {title && (
        <ContainerStyled>
          <IconButton
            onClick={() => {
              state?.backPath ? history.push(state.backPath) : history.goBack();
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography size="2rem" component="h1">
            {title}
          </Typography>
        </ContainerStyled>
      )}
      <ContainerStyled>{children}</ContainerStyled>
    </>
  );
};
