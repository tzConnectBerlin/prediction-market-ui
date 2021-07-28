import { Container } from '@material-ui/core';
import { AnimationProps, motion } from 'framer-motion';
import { useWallet, useBeaconWallet } from '@tz-contrib/react-wallet-provider';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Header } from '../../design-system/molecules/Header';
import { Footer } from '../../design-system/molecules/Footer';
import { APP_NAME, NETWORK } from '../../utils/globals';
import { DEFAULT_LANGUAGE } from '../../i18n';
import { setWalletProvider } from '../../contracts/Market';
import { useUserBalance } from '../../api/queries';
import { Links } from '../../design-system/molecules/ProfilePopover/ProfilePopover';
import { openInNewTab } from '../../utils/misc';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainerStyled = styled(Container)`
  padding-top: 1em;
  flex: 1 0 auto;
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
    address: '/portfolio',
  },
];

export const MainPage: React.FC<MainPageProps> = ({ title, children, description }) => {
  const history = useHistory();
  const { connected, connect, disconnect, activeAccount } = useWallet();
  const beaconWallet = useBeaconWallet();
  const { i18n, t } = useTranslation(['common', 'footer']);
  const lang = i18n.language || window.localStorage.i18nextLng || DEFAULT_LANGUAGE;
  const pageTitle = title ? `${title} - ${APP_NAME} - ${NETWORK}` : `${APP_NAME} - ${NETWORK}`;
  const { data: balance } = useUserBalance(activeAccount?.address);

  useEffect(() => {
    setWalletProvider(beaconWallet);
  }, [beaconWallet]);

  return (
    <PageContainer>
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      <Header
        title={t('appTitle')}
        handleHeaderClick={() => history.push('/')}
        stablecoinSymbol="PMM"
        actionText={t('disconnectWallet')}
        userBalance={balance ?? 0}
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
