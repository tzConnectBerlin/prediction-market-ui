import { render } from '@testing-library/react';
import { ProfilePopover } from './ProfilePopover';

/**
 * TODO: find a way for snapshot test
 */
describe('Element testing ProfilePopover Component', () => {
  it('render correctly on open popover', async () => {
    const { getByText } = render(
      <ProfilePopover
        address="tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"
        network="edonet"
        stablecoinSymbol="PMM"
        actionText="Disconnect Wallet"
        userBalance="0"
        isOpen
        handleAction={() => {}}
        onClose={() => {}}
      />,
    );

    expect(getByText(/Disconnect Wallet/i)).toBeInTheDocument();
    expect(getByText(/PMM/i)).toBeInTheDocument();
  });
});
