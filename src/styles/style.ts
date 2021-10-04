import { css, SerializedStyles } from '@emotion/react';
import { Theme } from '@mui/material';

export const GlobalStyle = (theme: Theme): SerializedStyles => css`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.palette.background.default};
  }
  .pointer {
    cursor: pointer;
  }
  .MuiPaper-root {
    box-shadow: 0 0 3px ${theme.palette.grey[600]};
  }
  button[disabled],
  .MuiButton-root.Mui-disabled {
    &:not(.MuiToggleButton-root, .MuiPickersDay-root, .MuiIconButton-edgeEnd, .MuiTab-root) {
      background-color: ${theme.palette.primary.main};
      color: ${theme.palette.buttonText.disabled};
    }
  }

  .MuiButtonBase-root.MuiIconButton-root {
    &:hover {
      background-color: transparent;
    }
  }

  .MuiFormControl-root {
    margin-top: ${theme.spacing(1)};
    margin-bottom: ${theme.spacing(1)};
    width: 100%;
    .MuiFormHelperText-root {
      color: ${theme.palette.text.secondary};
      &:not(.extra-help-message) {
        color: ${theme.palette.warning.main};
      }
    }
    .MuiInput-root.MuiInputBase-formControl {
      background-color: ${theme.palette.grey[300]};
      border: solid 1px ${theme.palette.grey[600]};
      border-radius: ${theme.spacing(1 / 4)};

      &:hover:not(.Mui-disabled) {
        background-color: ${theme.palette.grey[500]};
      }
      &.Mui-focused:not(.Mui-disabled) {
        border-color: ${theme.palette.primary.main};
      }
      &.Mui-error {
        border-color: ${theme.palette.warning.main};
      }

      &:before,
      &.Mui-disabled::before,
      &:hover:not(.Mui-disabled)::before,
      &:after {
        border-bottom: none;
      }
      background-color: ${theme.palette.grey[300]};
      border: solid 1px ${theme.palette.grey[600]};
      border-radius: ${theme.spacing(1 / 4)};
      padding-left: ${theme.spacing(1 / 2)};
      padding-right: ${theme.spacing(1 / 2)};
      input,
      textarea {
        padding-left: ${theme.spacing(1 / 2)};
        padding-right: ${theme.spacing(1 / 2)};
      }
      &:not(.Mui-disabled) {
        &:hover {
          background-color: ${theme.palette.grey[500]};
        }
        &:focus {
          border-color: ${theme.palette.primary.main};
        }
      }
      &.Mui-error {
        border-color: ${theme.palette.warning.main};
      }
      .MuiSelect-select {
        padding-left: ${theme.spacing(1 / 2)};
      }
      .MuiSelect-icon {
        color: ${theme.palette.text.primary};
      }
    }
  }
`;
