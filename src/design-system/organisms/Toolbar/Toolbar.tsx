import styled from '@emotion/styled';
import { Grid, useTheme } from '@material-ui/core';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { DropDownItems } from '../../../interfaces/market';
import { DropDown, DropDownProps } from '../../atoms/DropDown';
import { SearchBox, SearchBoxProps } from '../../molecules/SearchBox';

const StyledGrid = styled(Grid)`
  align-items: flex-end;
`;

export interface ToolbarProps {
  sortItems?: DropDownItems[];
  filterItems?: DropDownItems[];
  onSortSelect?: DropDownProps['onSelect'];
  onSearchChange: SearchBoxProps['onChange'];
  onFilterSelect: SearchBoxProps['onSelect'];
  defaultFilterValue?: DropDownProps['defaultValue'];
  defaultSortValue?: DropDownProps['defaultValue'];
  searchFieldLabel?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  sortItems,
  filterItems,
  onSearchChange,
  onFilterSelect,
  onSortSelect,
  defaultFilterValue,
  defaultSortValue,
  searchFieldLabel,
}) => {
  const theme = useTheme();
  const { t } = useTranslation(['common']);
  const inputSizeXS = sortItems ? 8 : 12;
  const inputSizeSM = sortItems ? 9 : 12;
  return (
    <StyledGrid container spacing={2} paddingX={2}>
      <Grid item xs={inputSizeXS} sm={inputSizeSM}>
        <SearchBox
          onSelect={onFilterSelect}
          onChange={onSearchChange}
          filterItems={filterItems}
          defaultFilterValue={defaultFilterValue}
          searchFieldLabel={searchFieldLabel}
        />
      </Grid>
      {sortItems && onSortSelect && (
        <Grid item xs={4} sm={2}>
          <DropDown
            label={t('Sort By')}
            items={sortItems}
            onSelect={onSortSelect}
            defaultValue={defaultSortValue}
            bgColor={theme.palette.primary.contrastText}
            hoverBgColor={theme.palette.secondary.dark}
          />
        </Grid>
      )}
    </StyledGrid>
  );
};
