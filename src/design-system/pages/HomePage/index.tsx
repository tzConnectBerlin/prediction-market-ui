/* eslint-disable react/display-name */
import { Paper, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import React, { RefObject } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { MainPage } from '../MainPage';

interface ListItemLinkProps {
  primary: string;
  to: string;
}

type HomePageProps = WithTranslation;

type LinkListItemRef =
  | ((instance: HTMLAnchorElement | null) => void)
  | RefObject<HTMLAnchorElement>
  | null
  | undefined;

const ListItemLink: React.FC<ListItemLinkProps> = (props: ListItemLinkProps) => {
  const { primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref: LinkListItemRef) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
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

export const HomePageComponent: React.FC<HomePageProps> = ({ t }) => {
  return (
    <MainPage>
      <Paper elevation={0}>
        <List>
          <ListItemLink to="/create-question" primary={t('createQuestionPage')} />
          <Divider />
          <ListItemLink to="/submit-bid" primary={t('createBidPage')} />
          <Divider />
          <ListItemLink to="/close-auction" primary={t('closeAuctionPage')} />
          <Divider />
          <ListItemLink to="/withdraw-auction" primary={t('withdrawAuctionWinningsPage')} />
          <Divider />
          <ListItemLink to="/buy-token" primary={t('buyTokenPage')} />
        </List>
      </Paper>
    </MainPage>
  );
};

export const HomePage = withTranslation(['common'])(HomePageComponent);
