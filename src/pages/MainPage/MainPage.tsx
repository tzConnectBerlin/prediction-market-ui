import * as React from 'react';
import { Container, Grid } from '@material-ui/core';
import Headroom from 'react-headroom';
import { AnimationProps, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../../design-system/molecules/Header';
import { Footer } from '../../design-system/molecules/Footer';
import {
  APP_NAME,
  CURRENCY_SYMBOL,
  ENABLE_MARKET_CREATION,
  NETWORK,
  TORUS_ENABLED,
  TORUS_PROVIDER,
  WERT_PARTNER_ID,
} from '../../globals';
import { DEFAULT_LANGUAGE } from '../../i18n';
import { setSigner, setWalletProvider } from '../../contracts/Market';
import { useOpenPositions, useUserBalance } from '../../api/queries';
import { Links } from '../../interfaces';
import { Modal } from '../../design-system/atoms/Modal';
import { Typography } from '../../design-system/atoms/Typography';
import { CustomButton } from '../../design-system/atoms/Button';
import { hasModalShown, openInNewTab, setModalShown, getConnectionURL } from '../../utils/misc';
import { useConditionalBeaconWallet, useConditionalWallet, useTorusSDK } from '../../wallet/hooks';
import { getAddressAndSecretKey } from '../../wallet/utils';
import { logError } from '../../logger/logger';

const MainContainer = styled.main`
  margin-bottom: 2.5rem;
  @media (max-width: 600px) {
    margin-bottom: 5rem;
  }
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
    label: 'View Portfolio',
    url: '/portfolio',
  },
];

if (WERT_PARTNER_ID) {
  profileLinks.push({
    label: 'Buy Tezos',
    url: '/buy-tezos',
  });
}

export const MainPage: React.FC<MainPageProps> = ({ title, children, description }) => {
  const history = useHistory();
  const [modalShown, setModalState] = React.useState(hasModalShown());
  const sdk = useTorusSDK();
  const params = new URLSearchParams(window.location.search);
  const { connected, connect, disconnect, activeAccount } = useConditionalWallet();
  const beaconWallet = useConditionalBeaconWallet();
  const { i18n, t } = useTranslation(['common', 'footer']);
  const lang = i18n.language || window.localStorage.i18nextLng || DEFAULT_LANGUAGE;
  const pageTitle = title ? `${title} - ${APP_NAME} - ${NETWORK}` : `${APP_NAME} - ${NETWORK}`;
  const { data: balance } = useUserBalance(activeAccount?.address);
  const pageDescription = description ?? t('description');
  const openPositions = useOpenPositions(activeAccount?.address);

  const updateModalStatus = React.useCallback(() => {
    setModalShown();
    setModalState(true);
  }, []);

  React.useEffect(() => {
    beaconWallet && setWalletProvider(beaconWallet);
  }, [beaconWallet]);

  React.useEffect(() => {
    const initKey = async () => {
      try {
        const token = params.get('access_token');

        if (token && sdk) {
          history.push('/');
          // eslint-disable-next-line global-require
          const jwtDecode = require('jwt-decode').default;
          const decodedToken: any = jwtDecode(token);
          const { privateKey } = await sdk.getTorusKey(
            TORUS_PROVIDER,
            decodedToken.sub,
            { verifier_id: decodedToken.sub },
            token,
          );
          const { address, secretKey } = await getAddressAndSecretKey(privateKey);
          setSigner(secretKey);
          connect(secretKey, address);
        }
      } catch (error) {
        logError(error);
      }
    };
    if (sdk && params && TORUS_ENABLED) {
      initKey();
    }
  }, [params, sdk]);

  const handleTorusConnect = React.useCallback(() => {
    window.location.href = getConnectionURL(window.location.href);
  }, []);

  const handleTorusDisconnect = React.useCallback(() => {
    setSigner();
    disconnect();
  }, []);

  const handleConnect = React.useMemo(() => {
    if (TORUS_ENABLED) {
      return handleTorusConnect;
    }
    return connect as any;
  }, [connect, handleTorusConnect]);

  const handleDisconnect = React.useMemo(() => {
    if (TORUS_ENABLED) {
      return handleTorusDisconnect;
    }
    return disconnect;
  }, [TORUS_ENABLED]);

  return (
    <>
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
        {pageDescription && (
          <meta
            property="og:image"
            content={`https://og-image-tz-connect.vercel.app/**${encodeURIComponent(
              pageDescription,
            )}**.png?theme=light&md=1&fontSize=75px&images=https%3A%2F%2Fcdn.statically.io%2Fgh%2FtzConnectBerlin%2Fprediction-market-ui%2Fformula1%2Fpublic%2Fimages%2Fprediction-market-share.png&widths=350&heights=350`}
          />
        )}
      </Helmet>
      <header>
        <CustomHeader downTolerance={80} disableInlineStyles>
          <Header
            openPositions={openPositions}
            handleHeaderClick={() => history.push('/')}
            stablecoinSymbol={CURRENCY_SYMBOL}
            actionText={t('signOut')}
            userBalance={balance}
            primaryActionText={t('connectWallet')}
            secondaryActionText={ENABLE_MARKET_CREATION ? t('createQuestionPage') : undefined}
            handleSecondaryAction={() => history.push('/create-market')}
            handleProfileAction={() => history.push('/portfolio')}
            walletAvailable={connected ?? false}
            address={activeAccount?.address ?? ''}
            handleConnect={handleConnect}
            handleDisconnect={handleDisconnect}
            network={NETWORK}
            profileLinks={profileLinks}
          />
        </CustomHeader>
      </header>
      <MainContainer>
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
          <ContentContainerStyled>{children}</ContentContainerStyled>
        </motion.div>
      </MainContainer>
      <Footer
        description={[t('footer:footerDescriptionFirst')]}
        links={[
          {
            label: t('footer:footerLinkHow'),
            handleLinkClick: () => {
              history.push('/about');
            },
          },
          {
            label: t('footer:footerLinkAbout'),
            isExternal: true,
            handleLinkClick: () => {
              openInNewTab('https://tezos.com/');
            },
          },
          {
            label: 'Report an issue',
            isExternal: true,
            handleLinkClick: () => {
              openInNewTab(
                'https://github.com/tzConnectBerlin/prediction-market-ui/issues/new?assignees=&labels=&template=bug_report.md&title=',
              );
            },
          },
          {
            label: 'Feedback',
            isExternal: true,
            handleLinkClick: () => {
              openInNewTab(
                'https://docs.google.com/forms/d/e/1FAIpQLSenDZzoCdBui-MLyT2B_RQXtYoOfnq5QwPJQ41hK5IEEFrHXw/viewform',
              );
            },
          },
        ]}
      />
      <Modal open={!modalShown} onClose={updateModalStatus}>
        <Grid
          container
          direction="column"
          p={4}
          alignItems="center"
          justifyContent="center"
          justifyItems="center"
          spacing={3}
        >
          <Grid item>
            <Typography size="h2">Welcome to the Formula One Prediction Market Demo</Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomButton
              label="Learn How It Works"
              color="secondary"
              sx={{ px: '0.7rem', py: '0.7rem' }}
              fullWidth
              onClick={() => {
                updateModalStatus();
                openInNewTab(`${window.location.protocol}//${window.location.host}/about`);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomButton
              label="Get tez or PMM"
              color="secondary"
              sx={{ px: '0.7rem', py: '0.7rem' }}
              onClick={() => {
                updateModalStatus();
                openInNewTab('https://faucet.tzconnect.berlin/');
              }}
            />
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};
