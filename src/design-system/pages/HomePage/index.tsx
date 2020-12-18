/* eslint-disable react/display-name */
import { Paper, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import React, { RefObject } from 'react';
import { MainPage } from '../MainPage';

interface ListItemLinkProps {
  primary: string;
  to: string;
}

const ListItemLink: React.FC<ListItemLinkProps> = (props: ListItemLinkProps) => {
  const { primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(
        (
          itemProps,
          ref:
            | ((instance: HTMLAnchorElement | null) => void)
            | RefObject<HTMLAnchorElement>
            | null
            | undefined,
        ) => <RouterLink to={to} ref={ref} {...itemProps} />,
      ),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

export const HomePage: React.FC = () => {
  return (
    <MainPage>
      <Paper elevation={0}>
        <List>
          <ListItemLink to="/create-question" primary="Create a Question" />
          <Divider />
          <ListItemLink to="/submit-bid" primary="Submit a Bid" />
        </List>
      </Paper>
    </MainPage>
  );
};
