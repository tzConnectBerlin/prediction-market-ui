import { List } from '@material-ui/core';
import React from 'react';
import { ListItemLinkProps, ListItemLink } from '../../atoms/ListItem';

export interface LinkListProps {
  list: ListItemLinkProps[];
}

export const LinkList: React.FC<LinkListProps> = ({ list }) => {
  return (
    <List>
      {list.map((item, index) => {
        return <ListItemLink {...item} key={`${item.to}-${index}`} />;
      })}
    </List>
  );
};
