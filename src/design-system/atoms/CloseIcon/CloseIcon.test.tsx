import { ThemeProvider } from '@material-ui/core';
import renderer from 'react-test-renderer';
import { lightTheme } from '../../../styles/theme';
import { CloseIcon } from './CloseIcon';

describe('Snapshot testing CloseIcon Component', () => {
  it('renders correctly with default colors', () => {
    const CloseIconComponent = renderer
      .create(
        <ThemeProvider theme={lightTheme}>
          <CloseIcon />
        </ThemeProvider>,
      )
      .toJSON();
    expect(CloseIconComponent).toMatchSnapshot();
  });

  it('renders correctly with custom colors', () => {
    const CloseIconComponent = renderer
      .create(
        <ThemeProvider theme={lightTheme}>
          <CloseIcon color="red" />
        </ThemeProvider>,
      )
      .toJSON();
    expect(CloseIconComponent).toMatchSnapshot();
  });
});
