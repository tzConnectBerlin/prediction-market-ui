/* eslint-disable react/display-name */
import { Paper } from '@material-ui/core';
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { ListItemLinkProps } from '../../atoms/ListItem';
import { LinkList } from '../../organisms/LinkList/LinkList';
import { MainPage } from '../MainPage';
import { MARKET_ADDRESS } from '../../../utils/globals';

type HomePageProps = WithTranslation;

export const HomePageComponent: React.FC<HomePageProps> = ({ t }) => {
  const menuItems: ListItemLinkProps[] = [
    {
      to: `/market/${MARKET_ADDRESS}`,
      primary: t('mainMarket'),
    },
    {
      to: '/similar',
      primary: t('similarMarkets'),
    },
  ];
  return (
    <MainPage>
      <Paper elevation={0}>
        <LinkList list={menuItems} />
      </Paper>
    </MainPage>
  );
};

export const HomePage = withTranslation(['common'])(HomePageComponent);
