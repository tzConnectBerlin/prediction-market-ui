import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { RiSearchLine } from 'react-icons/ri';
import { FormControl, Grid, InputAdornment, MenuItem, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CustomInputLabel } from '../../molecules/CustomInputLabel';
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

export interface FilterItems {
  label: string;
  value: string | number;
}
export interface SearchBoxProps {
  filterItems?: FilterItems[];
  onClick: () => void | Promise<void>;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ filterItems, onClick }) => {
  const { t } = useTranslation(['common']);
  const [filterSelected, setFilterSelected] = useState('');
  const [keyWord, setKeyWord] = useState('');

  const getMenuItem = () =>
    filterItems?.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));

  return (
    <StyledGrid container>
      {filterItems && filterItems.length > 0 && (
        <Grid item xs={3} sm={2}>
          <FormControl className="selectMode">
            <CustomInputLabel label={t('Filter')} />
            <TextField
              variant="standard"
              name="filter"
              sx={{ backgroundColor: theme.palette.secondary.main }}
              onChange={(val: any) => {
                setFilterSelected(val);
              }}
              select
            >
              {getMenuItem()}
            </TextField>
          </FormControl>
        </Grid>
      )}
      <Grid item xs={9} sm={10}>
        <FormControl>
          <TextField
            name="search"
            variant="standard"
            onChange={(val: any) => setKeyWord(val.taget.value)}
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
