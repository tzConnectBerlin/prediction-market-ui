import styled from '@emotion/styled';
import { Grid } from '@material-ui/core';
import React from 'react';
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
  onSortSelect: DropDownProps['onSelect'];
  onSearchChange: SearchBoxProps['onChange'];
  onFilterSelect: SearchBoxProps['onSelect'];
}

export const Toolbar: React.FC<ToolbarProps> = ({
  sortItems,
  filterItems,
  onSearchChange,
  onFilterSelect,
  onSortSelect,
}) => {
  const { t } = useTranslation(['common']);
  const inputSizeXS = sortItems ? 8 : 12;
  const inputSizeSM = sortItems ? 10 : 12;
  return (
    <StyledGrid container spacing={2} paddingX={2}>
      <Grid item xs={inputSizeXS} sm={inputSizeSM}>
        <SearchBox onSelect={onFilterSelect} onChange={onSearchChange} filterItems={filterItems} />
      </Grid>
      {sortItems && (
        <Grid item xs={4} sm={2}>
          <DropDown label={t('Sort By')} items={sortItems} onSelect={onSortSelect} />
        </Grid>
      )}
    </StyledGrid>
  );
};
