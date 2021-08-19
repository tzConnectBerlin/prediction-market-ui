import { Container, Theme, useTheme } from '@material-ui/core';
import Headroom from 'react-headroom';
import { AnimationProps, motion } from 'framer-motion';
import { useWallet, useBeaconWallet } from '@tezos-contrib/react-wallet-provider';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Header } from '../../design-system/molecules/Header';
import { Footer } from '../../design-system/molecules/Footer';
import { APP_NAME, CURRENCY_SYMBOL, NETWORK } from '../../utils/globals';
import { DEFAULT_LANGUAGE } from '../../i18n';
import { setWalletProvider } from '../../contracts/Market';
import { useUserBalance } from '../../api/queries';
import { Links } from '../../interfaces';
import { openInNewTab } from '../../utils/misc';

const PageContainer = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const ContentContainerStyled = styled(Container)`
  padding-top: 1em;
  flex: 1 0 auto;
`;

const CustomHeader = styled(Headroom)`
  .headroom {
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    &.headroom--unfixed {
      position: absolute;
      transform: translateY(0);
    }
    &.headroom--scrolled {
      transition: transform 200ms ease-in-out;
    }
    &.headroom--unpinned {
      position: fixed;
      transform: translateY(-100%);
    }
    &.headroom--pinned {
      position: fixed;
      transform: translateY(0%);
    }
  }
`;

interface MainPageProps {
  title?: string;
  description?: string;
}

const pageVariants: AnimationProps['variants'] = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const profileLinks: Links[] = [
  {
    label: 'My Portfolio',
    url: '/portfolio',
  },
];

export const MainPage: React.FC<MainPageProps> = ({ title, children, description }) => {
  const history = useHistory();
  const theme = useTheme();
  const { connected, connect, disconnect, activeAccount } = useWallet();
  const beaconWallet = useBeaconWallet();
  const { i18n, t } = useTranslation(['common', 'footer']);
  const lang = i18n.language || window.localStorage.i18nextLng || DEFAULT_LANGUAGE;
  const pageTitle = title ? `${title} - ${APP_NAME} - ${NETWORK}` : `${APP_NAME} - ${NETWORK}`;
  const { data: balance } = useUserBalance(activeAccount?.address);
  const pageDescription = description ?? t('description');

  useEffect(() => {
    setWalletProvider(beaconWallet);
  }, [beaconWallet]);

  return (
    <PageContainer theme={theme}>
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        <meta name="title" property="og:title" content="Tezos Prediction Market" />
        <meta name="twitter:title" content="Tezos Prediction Market" />
        <meta property="og:url" content={window.location.href} />
        <meta property="twitter:domain" content={window.location.href} />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta name="description" property="og:description" content={pageDescription} />
        <meta name="description" property="twitter:description" content={pageDescription} />
      </Helmet>
      <CustomHeader downTolerance={80} disableInlineStyles>
        <Header
          title={t('appTitle')}
          handleHeaderClick={() => history.push('/')}
          stablecoinSymbol={CURRENCY_SYMBOL}
          actionText={t('disconnectWallet')}
          userBalance={balance}
          primaryActionText={t('signIn')}
          secondaryActionText={t('createQuestionPage')}
          handleSecondaryAction={() => history.push('/create-market')}
          walletAvailable={connected ?? false}
          address={activeAccount?.address ?? ''}
          handleConnect={connect}
          handleDisconnect={disconnect}
          network={activeAccount?.network.name ?? ''}
          profileLinks={profileLinks}
        />
      </CustomHeader>
      <main>
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
          <ContentContainerStyled>{children}</ContentContainerStyled>
        </motion.div>
      </main>
      <Footer
        description={[t('footer:footerDescriptionFirst')]}
        links={[
          {
            label: t('footer:footerLinkHow'),
            isExternal: true,
            handleLinkClick: () => {
              openInNewTab('https://pm-manual.tzconnect.berlin/');
            },
          },
          {
            label: t('footer:footerLinkAbout'),
            isExternal: true,
            handleLinkClick: () => {
              openInNewTab('https://tezos.com/');
            },
          },
        ]}
      />
    </PageContainer>
  );
};
