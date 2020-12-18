import { Container, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { useWallet } from '../../../wallet/hooks';
import { Header } from '../../molecules/Header';

const ContainerStyled = styled(Container)`
  padding-top: 1em;
`;

interface MainPageProps {
  title?: string;
}

export const MainPage: React.FC<MainPageProps> = ({ title, children }) => {
  const { wallet, setWallet } = useWallet();
  const history = useHistory();
  return (
    <>
      <Header walletAvailable={!!wallet?.pkh} setWallet={setWallet} wallet={wallet} />
      {title && (
        <ContainerStyled>
          <IconButton
            onClick={() => {
              history.push('/');
            }}
          >
            <ArrowBack />
          </IconButton>
          <span>{title}</span>
        </ContainerStyled>
      )}
      <ContainerStyled>{children}</ContainerStyled>
    </>
  );
};
