import * as React from 'react';
import { Card, Grid } from '@mui/material';
import WertWidget from '@wert-io/widget-initializer';
import { WithTranslation, withTranslation } from 'react-i18next';
import { MainPage } from '../MainPage/MainPage';
import { WERT_PARTNER_ID } from '../../globals';

const widget = new WertWidget({
  container_id: 'wert-widget',
  partner_id: WERT_PARTNER_ID,
  origin:
    process.env.NODE_ENV === 'production' ? 'https://widget.wert.io' : 'https://sandbox.wert.io',
  commodities: 'XTZ',
  width: 500,
  height: 580,
  color_buttons: '#0166ff',
  buttons_border_radius: '2',
  color_buttons_text: '#fff',
  color_secondary_buttons: '#DCE8FC',
  secondary_buttons_border_radius: '2',
  color_secondary_buttons_text: '#DCE8FC',
  color_main_text: '#1d2227',
  color_secondary_text: '#6C6F73',
  color_icons: '#6C6F73',
  color_links: '#0166ff',
  color_success: '#2ab800',
  color_warning: '#fd7d2a',
  color_error: '#ff3939',
});

const BuyTezosComponent: React.FC<WithTranslation> = ({ t }) => {
  React.useEffect(() => {
    widget.mount();
  }, []);
  return (
    <MainPage title={t('buyTezos')}>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item id="wert-widget" component={Card} />
      </Grid>
    </MainPage>
  );
};

export const BuyTezosPage = withTranslation(['common'])(BuyTezosComponent);
