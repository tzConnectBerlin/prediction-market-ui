import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@mui/material';
import { Footer, FooterProps } from './Footer';
import { lightTheme as theme } from '../../../styles/theme';

const defaultProps: FooterProps = {
  title: 'About Tezos Prediction Markets',
  description: [
    'This software implements a crowd-funded prediction market. Once the market has been initiated by setting the question and other details, other participants can give their own assessments of the likelihood of the question coming true, and investing in the market. Not only will these initial participants have a stake in the market, they will also profit from its operation, taking a share of the market’s fees.',
    'From then on the market operates in a standard way–each token will pay out to one or zero coins,depending upon which way events transpire. A 5% fee on winnings rewards participants in the investment phase, and those who have contributed liquidity to the market during its operation.',
  ],
  links: [
    {
      label: 'HOW IT WORKS',
    },
    {
      label: 'ABOUT TEZOS',
      isExternal: true,
    },
  ],
};

const WrappedComponent: React.FC<any> = (props) => (
  <ThemeProvider theme={theme}>
    <Footer {...props} />
  </ThemeProvider>
);

describe('Snapshot testing Footer Component', () => {
  it('renders correctly with Props', () => {
    const footer = renderer.create(<WrappedComponent {...defaultProps} />).toJSON();
    expect(footer).toMatchSnapshot();
  });
});

describe('Element testing Header Component', () => {
  it('render correctly on LoggedOut and title', async () => {
    const { getByText } = render(<WrappedComponent {...defaultProps} />);

    expect(getByText(/About Tezos Prediction Markets/i)).toBeInTheDocument();
    expect(
      getByText(/This software implements a crowd-funded prediction market/i),
    ).toBeInTheDocument();
  });
});
