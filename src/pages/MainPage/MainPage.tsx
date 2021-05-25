import { Container } from '@material-ui/core';
import { AnimationProps, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWallet } from '../../wallet/hooks';
import { Header } from '../../design-system/molecules/Header';
import { Footer } from '../../design-system/molecules/Footer';
import { APP_NAME, NETWORK } from '../../utils/globals';
import { DEFAULT_LANGUAGE } from '../../i18n';
import { getBeaconInstance } from '../../wallet';
import { setWalletProvider } from '../../contracts/Market';

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
    transition: { duration: 1 },
  },
  out: {
    opacity: 0,
    transition: { duration: 1 },
  },
};

export const MainPage: React.FC<MainPageProps> = ({ title, children, description }) => {
  const { wallet, setWallet } = useWallet();
  const history = useHistory();
  const { i18n, t } = useTranslation(['common', 'footer']);
  const lang = i18n.language || window.localStorage.i18nextLng || DEFAULT_LANGUAGE;
  const pageTitle = title ? `${title} - ${APP_NAME} - ${NETWORK}` : `${APP_NAME} - ${NETWORK}`;
  const connectWallet = async () => {
    const newWallet = await getBeaconInstance(APP_NAME, true, NETWORK);
    newWallet?.wallet && setWalletProvider(newWallet.wallet);
    newWallet && setWallet(newWallet);
  };

  return (
    <PageContainer>
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
        handleHeaderClick={() => history.push('/')}
        address={wallet?.pkh ?? ''}
        network={wallet?.network ?? ''}
        stablecoinSymbol="USDtz"
        actionText={t('disconnectWallet')}
        userBalance={0}
        primaryActionText={t('signIn')}
        handlePrimaryAction={connectWallet}
        secondaryActionText={t('createQuestionPage')}
        handleSecondaryAction={() => history.push('/market/create-market')}
      />
      <main>
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
          <ContentContainerStyled>{children}</ContentContainerStyled>
        </motion.div>
      </main>
      <Footer
        title={t('footer:title')}
        description={[t('footer:footerDescriptionFirst'), t('footer:footerDescriptionSecond')]}
        links={[
          { label: t('footer:footerLinkHow') },
          { label: t('footer:footerLinkAbout'), isExternal: true },
        ]}
      />
    </PageContainer>
  );
};
