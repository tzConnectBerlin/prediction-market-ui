import renderer from 'react-test-renderer';
import { render, waitFor } from '@testing-library/react';
import { ProfilePopover } from '../ProfilePopover';

describe('Element testing ProfilePopover Component', () => {
  it('render correctly on open popover', async () => {
    const { findByText } = await render(
      <ProfilePopover
        address="tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"
        network="edonet"
        stablecoinSymbol="USDtz"
        actionText="Disconnect Wallet"
        stablecoin="0"
        isOpen
        handleAction={() => {}}
        onClose={() => {}}
      />,
    );

    waitFor(() => {
      expect(findByText(/Disconnect Wallet/i)).toBeInTheDocument();
      expect(findByText(/USDtz/i)).toBeInTheDocument();
    });
  });
});
