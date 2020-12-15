import { Container } from '@material-ui/core';
import styled from '@emotion/styled';
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
  return (
    <>
      <Header walletAvailable={!!wallet?.pkh} setWallet={setWallet} wallet={wallet} />
      {title && <ContainerStyled>{title}</ContainerStyled>}
      <ContainerStyled>{children}</ContainerStyled>
    </>
  );
};
