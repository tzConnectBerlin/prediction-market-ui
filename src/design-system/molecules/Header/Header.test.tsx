import { ThemeProvider } from '@mui/material';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { lightTheme } from '../../../styles/theme';
import { Header, HeaderProps } from './Header';

const wallet = {
  network: 'edonet',
  pkh: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
};

const WrappedComponent = (args: HeaderProps) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Header {...args} />
    </ThemeProvider>
  );
};

describe('Snapshot testing Header Component', () => {
  it('renders correctly LoggedIn', () => {
    const container = renderer
      .create(
        <WrappedComponent
          walletAvailable
          address={wallet.pkh}
          network={wallet.network}
          stablecoinSymbol="PMM"
          actionText="Disconnect Wallet"
          primaryActionText="Sign in"
          handleConnect={() => {}}
          handleDisconnect={() => {}}
        />,
      )
      .toJSON();
    expect(container).toMatchSnapshot();
  });

  it('renders correctly LoggedOut', () => {
    const container = renderer
      .create(
        <WrappedComponent
          walletAvailable={false}
          address={wallet.pkh}
          network={wallet.network}
          stablecoinSymbol="PMM"
          actionText="Disconnect Wallet"
          primaryActionText="Sign in"
          handleConnect={() => {}}
          handleDisconnect={() => {}}
        />,
      )
      .toJSON();
    expect(container).toMatchSnapshot();
  });
});

describe('Element testing Header Component', () => {
  it('render correctly on LoggedOut and title', async () => {
    const { getByText, queryAllByText } = render(
      <WrappedComponent
        walletAvailable={false}
        address={wallet.pkh}
        network={wallet.network}
        stablecoinSymbol="PMM"
        actionText="Disconnect Wallet"
        primaryActionText="Sign in"
        handleConnect={() => {}}
        handleDisconnect={() => {}}
      />,
    );
    expect(getByText(/Sign in/i)).toBeInTheDocument();
    expect(queryAllByText(/Disconnect Wallet/i).length).toEqual(0);
  });

  it('render correctly on LoggedIn', async () => {
    const { getByText, container, queryAllByText } = render(
      <WrappedComponent
        walletAvailable
        address={wallet.pkh}
        network={wallet.network}
        stablecoinSymbol="PMM"
        actionText="Disconnect Wallet"
        primaryActionText="Sign in"
        handleConnect={() => {}}
        handleDisconnect={() => {}}
      />,
    );
    const img = container.querySelector('img');
    if (img) {
      fireEvent.click(img);
    }
    expect(getByText(/Disconnect Wallet/i)).toBeInTheDocument();
    expect(queryAllByText(/Sign in/i).length).toEqual(0);
  });
});
