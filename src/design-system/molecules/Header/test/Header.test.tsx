import { render, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Header } from '../Header';

const wallet = {
  network: 'edonet',
  pkh: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
};

describe('Snapshot testing Header Component', () => {
  it('renders correctly LoggedIn', () => {
    const container = renderer
      .create(
        <Header
          title="Prediction Market"
          walletAvailable
          setWallet={() => {}}
          wallet={wallet}
          address={wallet.pkh}
          network={wallet.network}
          stablecoinSymbol="USDtz"
          actionText="Disconnect Wallet"
          primaryActionText="Sign in"
          handlePrimaryAction={() => {}}
        />,
      )
      .toJSON();
    expect(container).toMatchSnapshot();
  });

  it('renders correctly LoggedOut', () => {
    const container = renderer
      .create(
        <Header
          title="Prediction Market"
          walletAvailable={false}
          setWallet={() => {}}
          wallet={wallet}
          address={wallet.pkh}
          network={wallet.network}
          stablecoinSymbol="USDtz"
          actionText="Disconnect Wallet"
          primaryActionText="Sign in"
          handlePrimaryAction={() => {}}
        />,
      )
      .toJSON();
    expect(container).toMatchSnapshot();
  });
});

describe('Element testing Header Component', () => {
  it('render correctly on LoggedOut and title', async () => {
    const { findByText } = await render(
      <Header
        title="Prediction Market"
        walletAvailable={false}
        setWallet={() => {}}
        wallet={wallet}
        address={wallet.pkh}
        network={wallet.network}
        stablecoinSymbol="USDtz"
        actionText="Disconnect Wallet"
        primaryActionText="Sign in"
        handlePrimaryAction={() => {}}
      />,
    );

    waitFor(() => {
      expect(findByText(/Prediction Market/i)).toBeInTheDocument();
      expect(findByText(/SIGN IN/i)).toBeInTheDocument();
      expect(findByText(/Disconnect Wallet/i)).not.toBeInTheDocument();
    });
  });

  it('render correctly on LoggedIn', async () => {
    const { findByText } = await render(
      <Header
        title="Prediction Market"
        walletAvailable
        setWallet={() => {}}
        wallet={wallet}
        address={wallet.pkh}
        network={wallet.network}
        stablecoinSymbol="USDtz"
        actionText="Disconnect Wallet"
        primaryActionText="Sign in"
        handlePrimaryAction={() => {}}
      />,
    );
    waitFor(() => {
      expect(findByText(/Disconnect Wallet/i)).toBeInTheDocument();
      expect(findByText(/SIGN IN/i)).not.toBeInTheDocument();
    });
  });
});
