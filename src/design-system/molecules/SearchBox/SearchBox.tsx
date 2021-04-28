import React from 'react';
import styled from '@emotion/styled';
import { RiSearchLine } from 'react-icons/ri';
import { FormControl, Grid, InputAdornment, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DropDown } from '../../atoms/DropDown';
import { DropDownItems } from '../../../interfaces/market';
import { lightTheme as theme } from '../../../theme';

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

export interface SearchBoxProps {
  searchPlaceHolder?: string;
  filterItems?: DropDownItems[];
  hasIcon?: boolean;
  onChange: () => void | Promise<void>;
  onSelect: () => void | Promise<void>;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  searchPlaceHolder = 'Search By Keyword',
  filterItems,
  hasIcon = true,
  onChange,
  onSelect,
}) => {
  const { t } = useTranslation(['common']);
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
    <StyledGrid container>
      {filterItems && filterItems.length > 0 && (
        <Grid item xs={3} sm={2} className="selectMode">
          <DropDown
            label={t('Filter')}
            items={filterItems}
            onSelect={onSelect}
            bgColor={theme.palette.secondary.main}
            hoverBgColor={theme.palette.secondary.dark}
          />
        </Grid>
      )}
      <Grid item xs={inputSizeXS} sm={inputSizeSM}>
        <TextField
          name="search"
          variant="standard"
          placeholder={t(searchPlaceHolder)}
          onChange={onChange}
          InputProps={hasIcon ? searchIcon : undefined}
        />
      </Grid>
    </StyledGrid>
  );
};
