import * as React from 'react';
import styled from '@emotion/styled';
import { RiSearchLine } from 'react-icons/ri';
import {
  Grid,
  InputAdornment,
  TextField,
  useTheme,
  TextFieldProps,
  Theme,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DropDown, DropDownProps } from '../../atoms/DropDown';
import { DropDownItems } from '../../../interfaces/market';
import { CustomInputLabel } from '../CustomInputLabel';

const StyledGrid = styled(Grid)`
  align-items: flex-end;
  .selectMode {
    .MuiFormControl-root .MuiInput-root.MuiInputBase-formControl {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      margin-right: -1px;
    }
  }
`;

const StyledTextField = styled(TextField)<{ theme: Theme }>`
  border-radius: 4px;
  margin-top: 0 !important;
  box-shadow: 0 0 7px 0 rgba(209, 209, 209, 0.5);
  &.MuiFormControl-root .MuiInput-root.MuiInputBase-formControl {
    &:not(.Mui-disabled) {
      background-color: ${({ theme }) => theme.palette.background.paper};
      &:hover {
        background-color: ${({ theme }) => theme.palette.background.paper};
      }
    }
  }
`;

export interface SearchBoxProps {
  searchPlaceHolder?: string;
  filterItems?: DropDownItems[];
  hasIcon?: boolean;
  onChange: TextFieldProps['onChange'];
  onSelect: DropDownProps['onSelect'];
  defaultFilterValue?: DropDownProps['defaultValue'];
  searchFieldLabel?: string;
}

const defaultHasIcon = true;

export const SearchBox: React.FC<SearchBoxProps> = ({
  searchPlaceHolder = 'Search By Keyword',
  filterItems,
  hasIcon = defaultHasIcon,
  onChange,
  onSelect,
  defaultFilterValue,
  searchFieldLabel,
}) => {
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const inputSizeXS = filterItems ? 9 : 12;
  const inputSizeSM = filterItems ? 10 : 12;
  const searchIcon = {
    endAdornment: (
      <InputAdornment position="start">
        <RiSearchLine />
      </InputAdornment>
    ),
  };
  return (
    <StyledGrid container spacing={2}>
      {filterItems && filterItems.length > 0 && (
        <Grid item xs={3} sm={2} className="selectMode" role="listbox">
          <DropDown
            label={t('filter')}
            items={filterItems}
            onSelect={onSelect}
            bgColor={theme.palette.primary.contrastText}
            hoverbgcolor={theme.palette.secondary.dark}
            defaultValue={defaultFilterValue}
          />
        </Grid>
      )}
      <Grid item xs={inputSizeXS} sm={inputSizeSM} role="search">
        {searchFieldLabel && <CustomInputLabel label={searchFieldLabel} />}
        <StyledTextField
          name="search"
          variant="standard"
          className="searchBox"
          placeholder={t(searchPlaceHolder)}
          onChange={onChange}
          InputProps={hasIcon ? searchIcon : undefined}
          theme={theme}
        />
      </Grid>
    </StyledGrid>
  );
};
