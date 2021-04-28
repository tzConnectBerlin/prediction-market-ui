import { css, SerializedStyles } from '@emotion/react';
import { Theme } from '@material-ui/core';

export const GlobalStyle = (theme: Theme): SerializedStyles => css`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
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
    width: 100%;
    button[disabled],
    .MuiButton-root.Mui-disabled {
      background-color: ${theme.palette.primary.main};
      color: ${theme.palette.buttonText.disabled};
    }
    .MuiFormHelperText-root {
      color: ${theme.palette.text.secondary};
      &:not(.extra-help-message) {
        color: ${theme.palette.warning.main};
      }
    }
    .MuiInput-root.MuiInputBase-formControl {
      &:before,
      &.Mui-disabled::before,
      &:hover:not(.Mui-disabled)::before,
      &:after {
        border-bottom: none;
      }
      background-color: ${theme.palette.grey[400]};
      border: solid 1px ${theme.palette.grey[600]};
      border-radius: ${theme.spacing(1 / 4)};
      padding-left: ${theme.spacing(1 / 2)};
      padding-right: ${theme.spacing(1 / 2)};
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
  .MuiFormLabel-root.MuiInputLabel-root,
  .MuiInputLabel-formControl.MuiInputLabel-root {
    font-weight: bold;
    color: ${theme.palette.primary.main};
    position: relative;
    transform: none;
    transition: none;
    font-size: 0.8rem;
    &.Mui-disabled {
      color: ${theme.palette.primary.main};
      opacity: 0.38;
    }
    & .label-asterisk {
      vertical-align: sub;
      line-height: 0;
    }
  }
  .MuiSlider {
    &-root {
      color: ${theme.palette.primary.main};
      &.Mui-disabled {
        color: ${theme.palette.primary.main};
        opacity: 0.38;
      }
    }
    &-thumb {
      background-color: ${theme.palette.primary.main};
      &.Mui-disabled {
        background-color: ${theme.palette.primary.main};
      }
    }
  }
`;
