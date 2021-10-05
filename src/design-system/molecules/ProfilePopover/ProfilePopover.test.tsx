import { ThemeProvider } from '@mui/system';
import { render } from '@testing-library/react';
import { lightTheme } from '../../../styles/theme';
import { ProfilePopover } from './ProfilePopover';

/**
 * TODO: find a way for snapshot test
 */
describe('Element testing ProfilePopover Component', () => {
  it('render correctly on open popover', async () => {
    const { getByText, getAllByText } = render(
      <ThemeProvider theme={lightTheme}>
        <ProfilePopover
          address="tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"
          network="edonet"
          stablecoinSymbol="PMM"
          actionText="Disconnect Wallet"
          userBalance={0}
          isOpen
          handleAction={() => {}}
          onClose={() => {}}
          handleCallback={() => {}}
        />
        ,
      </ThemeProvider>,
    );

    expect(getByText(/Disconnect Wallet/i)).toBeInTheDocument();
    expect(getAllByText(/PMM/i)[0]).toBeInTheDocument();
    expect(getAllByText(/PMM/i)[1]).toBeInTheDocument();
  });
});
