import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Typography } from './Typography';

describe('Snapshot testing Typography Component', () => {
  it('renders correctly with small text', () => {
    const component = renderer.create(<Typography>ABCD</Typography>).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with small truncate true', () => {
    const component = renderer
      .create(
        <Typography truncate>
          {'Lorem ipsum dolor sit amet consectetur adipisicing elit.'.repeat(20)}
        </Typography>,
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});

describe('Element testing Typography Component', () => {
  it('render correctly with small texts', async () => {
    const { getByText } = render(<Typography>ABCD</Typography>);
    expect(getByText(/ABCD/i)).toBeInTheDocument();
  });

  it('render correctly with custom size', async () => {
    const { getByText } = render(<Typography size="10em">ABCD</Typography>);
    expect(getByText(/ABCD/i)).toBeInTheDocument();
  });

  it('render correctly and truncates', async () => {
    const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'.repeat(20);
    const truncateMethod = jest.fn();
    render(
      <Typography truncate isTruncated={truncateMethod}>
        {text}
      </Typography>,
    );
    await new Promise((r) => setTimeout(r, 100));
    expect(truncateMethod).toBeCalled();
  });
});
