import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core';
import { ResolveMarketModal, ResolveMarketModalProps } from './ResolveMarketModal';
import { lightTheme } from '../../../theme';

const mockHandleSubmit = jest.fn();

const WrappedComponent: React.FC<Partial<ResolveMarketModalProps>> = (args) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <ResolveMarketModal handleSubmit={mockHandleSubmit} {...args} />
    </ThemeProvider>
  );
};

describe('Element testing ResolveMarketModal Component', () => {
  it('render correctly when open=true', () => {
    const { getByText } = render(<WrappedComponent open />);
    expect(getByText('market:resolveMarket')).toBeInTheDocument();
  });

  it('does not render when open=false', () => {
    const { queryByText } = render(<WrappedComponent />);
    expect(queryByText('market:resolveMarket')).toBeFalsy();
  });

  it('render correctly and returns selection on submit', async () => {
    const { getByText } = render(<WrappedComponent open />);
    const button = getByText('market:resolveMarket');
    await waitFor(async () => {
      fireEvent.click(button);
    });
    expect(mockHandleSubmit).toBeCalled();
  });
});
