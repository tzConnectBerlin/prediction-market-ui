import { css, SerializedStyles } from '@emotion/react';
import { Theme } from '@material-ui/core';

export const GlobalStyle = (theme: Theme): SerializedStyles => css`
  .MuiAlert-standardError {
    color: ${theme.palette.error.main};
    background-color: ${theme.palette.error.dark};
  }
  .MuiAlert-standardSuccess {
    color: ${theme.palette.success.main};
    background-color: ${theme.palette.success.dark};
  }
  .MuiAlert-standardWarning {
    color: ${theme.palette.warning.main};
    background-color: ${theme.palette.warning.dark};
  }
  .MuiFormControl-root {
    margin-top: ${theme.spacing(1)};
    margin-bottom: ${theme.spacing(1)};
  }
  button[disabled] {
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.buttonText.disabled};
  }
  .MuiInput-root {
    background-color: ${theme.palette.grey[400]};
    &:hover:not(.Mui-disabled) {
      background-color: ${theme.palette.grey[500]};
    }
    &:before,
    &.Mui-disabled::before,
    &:hover:not(.Mui-disabled)::before,
    &:after {
      border-bottom: none;
    }
    input {
      padding-left: ${theme.spacing(1 / 2)};
      padding-right: ${theme.spacing(1 / 2)};
    }
    .MuiSelect-select {
      padding-left: ${theme.spacing(1 / 2)};
    }
    .MuiSelect-icon {
      color: ${theme.palette.text.primary};
    }
  }
  .MuiInputLabel-root {
    font-weight: bold;
    color: ${theme.palette.primary.main};
    &.Mui-disabled {
      color: ${theme.palette.primary.main};
      opacity: 0.38;
    }
  }
  .main-container {
    padding: ${theme.spacing(2)};
    min-height: 100vh;
    .container {
      max-width: 400px;
    }
  }
`;
