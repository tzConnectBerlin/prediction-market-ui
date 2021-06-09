import React from 'react';
import styled from '@emotion/styled';
import { Grid } from '@material-ui/core';

import { WithTranslation, withTranslation } from 'react-i18next';
import { useWallet } from '@tz-contrib/react-wallet-provider';
import { MainPage } from '../MainPage/MainPage';
import { Typography } from '../../design-system/atoms/Typography';
import { MyAccountCard } from '../../design-system/molecules/MyAccountCard';

type AccountPageProps = WithTranslation;

const StyleTitleDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
  padding: 1rem;
`;

const AccountPageComponent: React.FC<AccountPageProps> = ({ t }) => {
  const { disconnect, activeAccount } = useWallet();
  return (
    <MainPage title={t('my-account:myAccount')}>
      <Grid container justifyContent="center" direction="column" alignContent="center">
        <StyleTitleDiv>
          <Typography component="h1" size="2rem">
            {t('my-account:myAccount')}
          </Typography>
        </StyleTitleDiv>
        <MyAccountCard
          title={t('my-account:wallet')}
          walletLabel={t('my-account:wallet')}
          walletName="Temple"
          keyLabel={t('my-account:key')}
          address={activeAccount?.address ?? ''}
          balanceLabel={t('my-account:balance')}
          balance={0}
          handleDisconnect={disconnect}
        />
      </Grid>
    </MainPage>
  );
};

export const AccountPage = withTranslation(['common', 'my-account'])(AccountPageComponent);
