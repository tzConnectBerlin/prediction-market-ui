import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Header } from './Header';

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
    const { getByText, queryAllByText } = render(
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

    expect(getByText(/Prediction Market/i)).toBeInTheDocument();
    expect(getByText(/Sign in/i)).toBeInTheDocument();
    expect(queryAllByText(/Disconnect Wallet/i).length).toEqual(0);
  });

  it('render correctly on LoggedIn', async () => {
    const { getByText, container, queryAllByText } = render(
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
    const img = container.querySelector('img');
    if (img) {
      fireEvent.click(img);
    }
    expect(getByText(/Prediction Market/i)).toBeInTheDocument();
    expect(getByText(/Disconnect Wallet/i)).toBeInTheDocument();
    expect(queryAllByText(/Sign in/i).length).toEqual(0);
  });
});
