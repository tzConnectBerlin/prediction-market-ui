import { css, SerializedStyles } from '@emotion/react';
import { Theme } from '@material-ui/core';

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
    margin-top: ${theme.spacing(1)} !important;
    margin-bottom: ${theme.spacing(1)} !important;
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
  .MuiInputLabel-formControl.MuiInputLabel-root,
  .MuiInputLabel-root.MuiFormLabel-root {
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
  .MuiButtonBase-root.MuiIconButton-root.MuiCheckbox-root.Mui-checked {
    color: ${theme.palette.primary.main};
  }
  .mui-checkbox-error > span > svg {
    color: ${theme.palette.warning.main};
  }

  ul.MuiList-root {
    li.MuiListItem-root.MuiButtonBase-root {
      &:hover,
      &.Mui-focusVisible {
        background-color: ${theme.palette.secondary.dark};
      }
      &.Mui-selected {
        background-color: ${theme.palette.secondary.main};
        color: ${theme.palette.primary.main};
        font-weight: bold;
      }

      &.MuiListItem-divider {
        border-bottom: none;
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          width: calc(100% - 2rem);
          border-bottom: solid 1px ${theme.palette.grey[600]};
        }

        &:last-child {
          &:after {
            display: none;
          }
        }
      }
    }
  }

  .MuiDataGrid-root {
    border: none !important;
    .MuiDataGrid-main {
      .MuiDataGrid-row {
        &.Mui-selected {
          background-color: ${theme.palette.secondary.main};
        }
        &:hover {
          background-color: ${theme.palette.secondary.dark};
        }
      }
      .MuiDataGrid-columnsContainer {
        border-bottom: none;
        .MuiDataGrid-columnSeparator {
          display: none;
        }
        .MuiDataGrid-colCellTitle {
          color: ${theme.palette.primary.main};
          font-weight: bold;
        }
      }
      .MuiDataGrid-dataContainer {
        .MuiDataGrid-cell {
          &:focus-within {
            outline: none;
          }
        }
        .MuiDataGrid-renderingZone {
          & > div:last-child {
            .MuiDataGrid-cell {
              border-bottom: none;
            }
          }
        }
      }
    }
  }

  table.MuiTable-root {
    thead {
      tr {
        th {
          color: ${theme.palette.primary.main};
          text-transform: uppercase;
        }
      }
    }
    tbody {
      tr:last-child td {
        border-bottom: none;
      }
    }
  }

  .MuiToggleButtonGroup-root {
    margin-top: ${theme.spacing(1)};
    margin-bottom: ${theme.spacing(1)};
    button.MuiToggleButton-root {
      border-color: transparent;
      border-radius: 0;
      background-color: ${theme.palette.grey[300]};
      padding: ${theme.spacing(1 / 3)};
      &.Mui-disabled,
      &[disabled] {
        opacity: 0.8;
      }
    }
  }
`;
