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
  .MuiFormControl-root {
    &.selectMode {
      .MuiInput-root.MuiInputBase-formControl {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        margin-right: -1px;
      }
    }
  }
`;

export interface SearchBoxProps {
  searchPlaceHolder?: string;
  filterItems?: DropDownItems[];
  onChange: () => void | Promise<void>;
  onSelect: () => void | Promise<void>;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  searchPlaceHolder = 'Search By Keyword',
  filterItems,
  onChange,
  onSelect,
}) => {
  const { t } = useTranslation(['common']);

  return (
    <StyledGrid container>
      {filterItems && filterItems.length > 0 && (
        <Grid item xs={3} sm={2}>
          <DropDown
            label={t('Filter')}
            items={filterItems}
            onSelect={onSelect}
            bgColor={theme.palette.secondary.main}
          />
        </Grid>
      )}
      <Grid item xs={9} sm={10}>
        <FormControl>
          <TextField
            name="search"
            variant="standard"
            placeholder={t(searchPlaceHolder)}
            onChange={(val: any) => {
              onChange;
              console.log(val.taget.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <RiSearchLine />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Grid>
    </StyledGrid>
  );
};
