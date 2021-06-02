import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Card, CardContent, CardHeader, Grid, useTheme } from '@material-ui/core';
import { useTranslation, withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { useParams } from 'react-router-dom';
import { FormikHelpers, Field, Formik, Form } from 'formik';
import { useWallet } from '@tz-contrib/react-wallet-provider';
import BigNumber from 'bignumber.js';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { useMarkets, useTokenByAddress } from '../../api/queries';
import { findByMarketId, getNoTokenId, getYesTokenId } from '../../api/utils';
import { getMarketStateLabel } from '../../utils/misc';
import { logError } from '../../logger/logger';
import { Currency, MarketTradeType, TokenType } from '../../interfaces/market';
import { roundToTwo, tokenDivideDown, tokenMultiplyUp } from '../../utils/math';
import { MainPage } from '../MainPage/MainPage';
import { TradeContainer, TradeProps } from '../../design-system/organisms/TradeForm';
import { MarketDetailCard } from '../../design-system/molecules/MarketDetailCard';
import {
  MarketHeader,
  MarketHeaderProps,
} from '../../design-system/molecules/MarketHeader/MarketHeader';
import { Loading } from '../../design-system/atoms/Loading';
import { TradeValue } from '../../design-system/organisms/TradeForm/TradeForm';
import {
  FormikToggleButton,
  ToggleButtonItems,
} from '../../design-system/molecules/FormikToggleButton/FormikToggleButton';
import {
  buyTokens,
  claimWinnings,
  resolveMarket,
  sellTokens,
  withdrawAuction,
} from '../../contracts/Market';
import { MARKET_ADDRESS } from '../../utils/globals';
import { closePosition } from '../../contracts/MarketCalculations';
import { Typography } from '../../design-system/atoms/Typography';
import { CustomButton } from '../../design-system/atoms/Button';

interface MarketPageProps {
  marketId: string;
}

interface TransitionsModalProps {
  open?: boolean;
  handleClose?: () => void | Promise<void>;
  marketId?: string;
}

const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const TransitionsModal: React.FC<TransitionsModalProps> = ({
  open = false,
  handleClose,
  marketId,
}) => {
  const { t } = useTranslation(['common']);
  const { addToast } = useToasts();
  const outcomeItems: ToggleButtonItems[] = [
    {
      label: TokenType.yes,
      value: TokenType.yes,
    },
    {
      label: TokenType.no,
      value: TokenType.no,
    },
  ];
  const validationSchema = Yup.object().shape({
    outcome: Yup.string().required('Required'),
  });

  const handleResolveMarket = async (values: any) => {
    if (marketId) {
      try {
        await resolveMarket(marketId, values.outcome);
      } catch (error) {
        logError(error);
        const errorText = error?.data[1]?.with?.string || t('txFailed');
        addToast(errorText, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  };

  const formikProps = {
    initialValues: {
      outcome: TokenType.yes,
    },
    validationSchema,
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Formik {...formikProps} onSubmit={handleResolveMarket}>
              {({ isValid }) => (
                <Form>
                  <Grid container spacing={3} direction="column">
                    <Grid item>
                      <Field
                        component={FormikToggleButton}
                        toggleButtonItems={outcomeItems}
                        name="outcome"
                      />
                    </Grid>
                    <Grid item>
                      <CustomButton
                        fullWidth
                        label="Resolve Market"
                        type="submit"
                        disabled={!isValid}
                      />
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export const MarketPageComponent: React.FC = () => {
  const { t } = useTranslation(['common']);
  const { addToast } = useToasts();
  const { marketId } = useParams<MarketPageProps>();
  const yesTokenId = getYesTokenId(marketId);
  const noTokenId = getNoTokenId(marketId);
  const { connected, activeAccount } = useWallet();
  const { data, isLoading } = useMarkets();
  const { data: userTokenValues } = useTokenByAddress(
    [yesTokenId, noTokenId],
    activeAccount?.address,
  );
  const [additional, setAdditional] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { data: poolTokenValues } = useTokenByAddress([yesTokenId, noTokenId], MARKET_ADDRESS);
  const market = typeof data !== 'undefined' ? findByMarketId(data, marketId) : undefined;
  const yes = market && Number.isNaN(market.yesPrice) ? '--' : market?.yesPrice;
  const no =
    market && Number.isNaN(market.yesPrice) ? '--' : roundToTwo(1 - (market?.yesPrice ?? 0));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (activeAccount?.address || connected) {
      setAdditional(true);
    } else {
      setAdditional(false);
    }
  }, [activeAccount?.address, connected, market]);
  const handleTradeSubmission = async (values: TradeValue, helpers: FormikHelpers<TradeValue>) => {
    if (activeAccount?.address) {
      try {
        if (values.tradeType === MarketTradeType.buy) {
          await buyTokens(
            values.outcome,
            marketId,
            tokenMultiplyUp(values.quantity),
            activeAccount.address,
          );
        }
        if (values.tradeType === MarketTradeType.sell && userTokenValues && poolTokenValues) {
          const quantity = tokenMultiplyUp(values.quantity);
          const userYesBal = new BigNumber(userTokenValues[1].quantity);
          const userNoBal = new BigNumber(userTokenValues[0].quantity);
          const yesPool = new BigNumber(poolTokenValues[1].quantity);
          const noPool = new BigNumber(poolTokenValues[0].quantity);
          const aBal = values.outcome === TokenType.yes ? userYesBal : userNoBal;
          const [aPool, bPool] =
            values.outcome === TokenType.yes ? [yesPool, noPool] : [noPool, yesPool];
          const canSellWithoutSwap =
            userYesBal.isGreaterThanOrEqualTo(quantity) &&
            userNoBal.isGreaterThanOrEqualTo(quantity);
          if (canSellWithoutSwap) {
            await sellTokens(values.outcome, marketId, quantity);
          } else {
            const computed = { ...closePosition(aPool, bPool, aBal), bHeld: new BigNumber(-1) };
            await sellTokens(
              values.outcome,
              marketId,
              quantity,
              Number(computed.aToSwap.toString().split('.')[0]),
            );
          }
        }
        addToast(t('txSubmitted'), {
          appearance: 'success',
          autoDismiss: true,
        });
        helpers.resetForm();
      } catch (error) {
        logError(error);
        const errorText = error?.data[1]?.with?.string || t('txFailed');
        addToast(errorText, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  };
  const outcomeItems: ToggleButtonItems[] = [
    {
      label: `${TokenType.yes}(${[yes, Currency.USD].join(' ')})`,
      value: TokenType.yes,
    },
    {
      label: `${TokenType.no}(${[no, Currency.USD].join(' ')})`,
      value: TokenType.no,
    },
  ];

  const marketHeaderData: MarketHeaderProps = {
    title: market?.question ?? '',
    cardState: t(market?.state ?? ''),
    closeDate: market ? getMarketStateLabel(market, t) : '',
    iconURL: market?.iconURL,
    stats: [
      ...outcomeItems,
      {
        label: t('volume'),
        value: [market?.volume, Currency.USD].join(' ') ?? 0,
      },
    ],
  };

  if (marketHeaderData.stats && userTokenValues && userTokenValues.length === 2) {
    marketHeaderData.stats.push({
      label: t('Yes/No Balance'),
      value: `${roundToTwo(tokenDivideDown(Number(userTokenValues[1].quantity)))} / ${roundToTwo(
        tokenDivideDown(Number(userTokenValues[0].quantity)),
      )}`,
    });
  }

  if (market?.winningPrediction && marketHeaderData.stats) {
    marketHeaderData.stats.push({
      label: t('Winnings token'),
      value: market.winningPrediction.toUpperCase(),
    });
  }

  const marketDescription = {
    title: 'About Market',
    items: [
      {
        title: 'Description',
        item: {
          text: market?.description ?? '',
          expandActionText: 'Read more',
          shrinkActionText: 'Read less',
        },
      },
      {
        title: 'Ticker',
        item: `$${market?.ticker ?? 'NOTICKER'}`,
      },
      {
        title: 'Adjudicator',
        item: market?.adjudicator ?? '',
      },
    ],
  };

  const tradeData: TradeProps = {
    connected: connected && !market?.winningPrediction,
    handleSubmit: handleTradeSubmission,
    initialValues: {
      outcome: TokenType.yes,
      quantity: 0,
    },
    outcomeItems,
  };

  const handleWithdrawAuction = async () => {
    if (activeAccount?.address && marketId) {
      try {
        await withdrawAuction(marketId);
      } catch (error) {
        logError(error);
        const errorText = error?.data[1]?.with?.string || t('txFailed');
        addToast(errorText, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  };

  const handleClaimWinnings = async () => {
    if (activeAccount?.address && marketId) {
      try {
        await claimWinnings(marketId);
      } catch (error) {
        logError(error);
        const errorText = error?.data[1]?.with?.string || t('txFailed');
        addToast(errorText, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  };

  return (
    <MainPage>
      <TransitionsModal open={open} handleClose={handleClose} marketId={marketId} />
      {isLoading && <Loading />}
      {market && (
        <Grid container spacing={3}>
          <Grid item mt={3} xs={12}>
            <MarketHeader {...marketHeaderData} />
          </Grid>
          <Grid item xs={8}>
            <MarketDetailCard {...marketDescription} />
          </Grid>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <TradeContainer {...tradeData} />
            </Grid>
            {additional && (
              <Grid item xs={12} mt="1rem">
                <Card>
                  <CardHeader
                    title={
                      <Typography color="primary.main" component="h3">
                        Additional action(s)
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Grid container spacing={3} direction="column">
                      <Grid item>
                        <CustomButton
                          fullWidth
                          label="Withdraw Auction Win"
                          onClick={handleWithdrawAuction}
                        />
                      </Grid>
                      {market.adjudicator === activeAccount?.address && !market.winningPrediction && (
                        <Grid item>
                          <CustomButton fullWidth label="Resolve Market" onClick={handleOpen} />
                        </Grid>
                      )}
                      {market.winningPrediction && (
                        <Grid item>
                          <CustomButton
                            fullWidth
                            label="Claim winnings"
                            onClick={handleClaimWinnings}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </MainPage>
  );
};

const MarketPage = withTranslation(['common', 'create-market'])(MarketPageComponent);
export default MarketPage;
