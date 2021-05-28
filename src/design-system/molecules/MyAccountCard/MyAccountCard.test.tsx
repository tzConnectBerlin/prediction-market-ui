import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { MyAccountCard } from './MyAccountCard';

describe('Snapshot testing MarketCard Component', () => {
  it('renders correctly with key and balance', () => {
    const Card = renderer
      .create(
        <MyAccountCard
          title="My account card"
          walletLabel="Wallet"
          walletName="Temple"
          keyLabel="Key"
          address="tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"
          balanceLabel="Balance"
          balance={0}
        />,
      )
      .toJSON();
    expect(Card).toMatchSnapshot();
  });
});

describe('Element testing MyAccountCard Component', () => {
  it('renders correctly', async () => {
    const { getByText } = render(
      <MyAccountCard
        title="Wallet"
        walletLabel="Wallet"
        walletName="Temple"
        keyLabel="Key"
        address="tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"
        balanceLabel="Balance"
        balance={0}
      />,
    );

    expect(getByText(/Balance/i)).toBeInTheDocument();
    expect(getByText(/Key/i)).toBeInTheDocument();
  });
});
