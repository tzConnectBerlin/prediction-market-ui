/* eslint-disable react/display-name */
import { Paper } from '@material-ui/core';
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { ListItemLinkProps } from '../../atoms/ListItem';
import { LinkList } from '../../organisms/LinkList/LinkList';
import { MainPage } from '../MainPage';
import {
  MARKET_ADDRESS,
  ENABLE_SAME_MARKETS,
  ENABLE_SIMILAR_MARKETS,
} from '../../../utils/globals';

type HomePageProps = WithTranslation;

export const HomePageComponent: React.FC<HomePageProps> = ({ t }) => {
  const history = useHistory();
  const menuItems: ListItemLinkProps[] = [
    {
      to: `/market/${MARKET_ADDRESS}`,
      primary: t('mainMarket'),
    },
  ];
  if (ENABLE_SAME_MARKETS || ENABLE_SIMILAR_MARKETS) {
    menuItems.push({
      to: '/similar',
      primary: t('similarMarkets'),
    });
  }

  if (menuItems.length === 1) {
    history.push('/market/main');
    return <></>;
  }

  return (
    <MainPage>
      <Paper elevation={0}>
        <LinkList list={menuItems} />
      </Paper>
    </MainPage>
  );
};

export const HomePage = withTranslation(['common'])(HomePageComponent);
