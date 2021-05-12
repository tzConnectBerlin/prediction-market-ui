import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Footer, Props } from './Footer';

const defaultProps: Props = {
  footerDescriptionFirst:
    'This software implements a crowd-funded prediction market. Once the market has been initiated by setting the question and other details, other participants can give their own assessments of the likelihood of the question coming true, and investing in the market. Not only will these initial participants have a stake in the market, they will also profit from its operation, taking a share of the market’s fees.',
  footerDescriptionSecond:
    'From then on the market operates in a standard way–each token will pay out to one or zero coins,depending upon which way events transpire. A 5% fee on winnings rewards participants in the investment phase, and those who have contributed liquidity to the market during its operation.',
  title: 'About Tezos Prediction Markets',
  footerLinkHow: 'how it works',
  footerLinkAbout: 'about tezos',
};

describe('Element testing Header Component', () => {
  it('render correctly on LoggedOut and title', async () => {
    const { getByText } = render(
      <Footer
        footerDescriptionFirst="This software implements a crowd-funded prediction market"
        footerDescriptionSecond=""
        title="About Tezos Prediction Markets"
        footerLinkHow="HOW IT WORKS"
        footerLinkAbout="ABOUT TEZOS"
      />,
    );

    expect(getByText(/About Tezos Prediction Markets/i)).toBeInTheDocument();
    expect(
      getByText(/This software implements a crowd-funded prediction market/i),
    ).toBeInTheDocument();
  });
});

describe('Snapshot testing Footer Component', () => {
  it('renders correctly with Props', () => {
    const footer = renderer
      .create(
        <Footer
          footerDescriptionFirst={defaultProps.footerDescriptionFirst}
          footerDescriptionSecond={defaultProps.footerDescriptionSecond}
          title={defaultProps.title}
          footerLinkAbout={defaultProps.footerLinkAbout}
          footerLinkHow={defaultProps.footerLinkHow}
        />,
      )
      .toJSON();
    expect(footer).toMatchSnapshot();
  });
});
