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
        <Header
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
      <Header
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
      <Header
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
