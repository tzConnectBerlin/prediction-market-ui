import { render } from '@testing-library/react';
import { Footer } from './Footer';

describe('Element testing Header Component', () => {
  it('render correctly on LoggedOut and title', async () => {
    const { getByText } = render(
      <Footer
        footerText="This software implements a crowd-funded prediction market"
        footerTextSecond=""
        footerTitle="About Tezos Prediction Markets"
        footerWorks="HOW IT WORKS"
        footerAbout="ABOUT TEZOS"
        handleSecondaryAction={() => {}}
      />,
    );

    expect(getByText(/About Tezos Prediction Markets/i)).toBeInTheDocument();
    expect(
      getByText(/This software implements a crowd-funded prediction market/i),
    ).toBeInTheDocument();
  });
});
