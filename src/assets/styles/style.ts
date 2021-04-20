import { css } from '@emotion/react';
import { Theme } from '@material-ui/core';
// import { lightTheme as theme } from "./theme";

export const GlobalStyle = (theme: Theme) => css`
.main-container{
  padding: ${theme.spacing(2)};
  min-height: 100vh;
  .container {
    max-width: 400px;5
  }
  .MuiFormControl-root {
    margin-top: ${theme.spacing(1)};
    margin-bottom: ${theme.spacing(1)};
  }
  button[disabled]{
    background-color: ${theme.palette.primary.main};
    color: rgba(255,255,255,0.38);
  }
  .MuiInput-root{
    background-color: ${theme.palette.grey[400]};
    &:hover:not(.Mui-disabled){
      background-color: ${theme.palette.grey[500]};
    }
    &:before, &.Mui-disabled::before, &:hover:not(.Mui-disabled)::before, &:after{
      border-bottom: none;
    }
    input{
      padding-left: ${theme.spacing(1 / 2)};
      padding-right: ${theme.spacing(1 / 2)};
    }
    .MuiSelect-select{
      padding-left: ${theme.spacing(1 / 2)};
    }
    .MuiSelect-icon{
      color: ${theme.palette.text.primary};
    }
  }
}
`;
