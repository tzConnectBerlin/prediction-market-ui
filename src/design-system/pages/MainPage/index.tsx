import { Container, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWallet } from '../../../wallet/hooks';
import { Typography } from '../../atoms/Typography';
import { Header } from '../../molecules/Header';
import { APP_NAME, NETWORK } from '../../../utils/globals';
import { DEFAULT_LANGUAGE } from '../../../i18n';

const ContainerStyled = styled(Container)`
  padding-top: 1em;
`;

interface MainPageProps {
  title?: string;
  description?: string;
}

export const MainPage: React.FC<MainPageProps> = ({ title, children, description }) => {
  const { wallet, setWallet } = useWallet();
  const history = useHistory();
  const { i18n } = useTranslation();
  const lang = i18n.language || window.localStorage.i18nextLng || DEFAULT_LANGUAGE;
  const pageTitle = title ? `${title} - ${APP_NAME} - ${NETWORK}` : `${APP_NAME} - ${NETWORK}`;
  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      <Header walletAvailable={!!wallet?.pkh} setWallet={setWallet} wallet={wallet} />
      {title && (
        <ContainerStyled>
          <IconButton onClick={history.goBack}>
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
