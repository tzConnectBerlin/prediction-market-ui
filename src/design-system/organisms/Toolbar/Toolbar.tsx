import styled from '@emotion/styled';
import { Grid, InputAdornment, TextField, TextFieldProps, Theme, useTheme } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RiSearchLine } from 'react-icons/ri';
import { DropDownItems } from '../../../interfaces/market';
import { DropDown, DropDownProps } from '../../atoms/DropDown';
import { CustomInputLabel } from '../../molecules/CustomInputLabel';

const StyledGrid = styled(Grid)`
  align-items: flex-end;
`;
const StyledTextField = styled(TextField)<{ theme: Theme }>`
  border-radius: 4px;
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

const StyledFilter = styled(Grid)<{ theme: Theme }>`
  ${({ theme }) => `${theme.breakpoints.down('sm')} {
    order: 2;
    & + .MuiGrid-item{
      order:1;
      & + .MuiGrid-item{
        order:3
      }
    }
  }`}
`;
export interface ToolbarProps {
  sortItems?: DropDownItems[];
  filterItems?: DropDownItems[];
  onSortSelect?: DropDownProps['onSelect'];
  onSearchChange: TextFieldProps['onChange'];
  onFilterSelect: DropDownProps['onSelect'];
  defaultFilterValue?: DropDownProps['defaultValue'];
  defaultSortValue?: DropDownProps['defaultValue'];
  searchFieldLabel?: string;
  searchPlaceHolder?: string;
  searchHasIcon?: boolean;
}

const defaultSearchHasIcon = true;
export const Toolbar: React.FC<ToolbarProps> = ({
  sortItems,
  filterItems,
  onSearchChange,
  onFilterSelect,
  onSortSelect,
  defaultFilterValue,
  defaultSortValue,
  searchHasIcon = defaultSearchHasIcon,
  searchFieldLabel,
  searchPlaceHolder = 'Search By Keyword',
}) => {
  const theme = useTheme();
  const { t } = useTranslation(['common']);
  const inputSizeSM = sortItems && filterItems ? 8 : sortItems || filterItems ? 10 : 12;
  const searchIcon = {
    endAdornment: (
      <InputAdornment position="start">
        <RiSearchLine />
      </InputAdornment>
    ),
  };
  return (
    <StyledGrid container spacing={2} paddingX={2}>
      {filterItems && filterItems.length > 0 && (
        <StyledFilter item xs={6} sm={2} className="selectMode" role="listbox" theme={theme}>
          <DropDown
            label={t('filter')}
            items={filterItems}
            onSelect={onFilterSelect}
            bgColor={theme.palette.primary.contrastText}
            hoverbgcolor={theme.palette.secondary.dark}
            defaultValue={defaultFilterValue}
          />
        </StyledFilter>
      )}
      <Grid item xs={12} sm={inputSizeSM} role="search">
        {searchFieldLabel && <CustomInputLabel label={searchFieldLabel} />}
        <StyledTextField
          name="search"
          variant="standard"
          className="searchBox"
          placeholder={t(searchPlaceHolder)}
          onChange={onSearchChange}
          InputProps={searchHasIcon ? searchIcon : undefined}
          theme={theme}
        />
      </Grid>
      {sortItems && onSortSelect && (
        <Grid item xs={6} sm={2} role="listbox">
          <DropDown
            label={t('Sort By')}
            items={sortItems}
            onSelect={onSortSelect}
            defaultValue={defaultSortValue}
            bgColor={theme.palette.primary.contrastText}
            hoverbgcolor={theme.palette.secondary.dark}
          />
        </Grid>
      )}
    </StyledGrid>
  );
};
