import { Container, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Typography } from '../../design-system/atoms/Typography';
import { MainPage } from '../MainPage/MainPage';

export const AboutPage: React.FC = () => {
  return (
    <MainPage title="About Prediction Market">
      <Container maxWidth="md" sx={{ pt: '1rem' }}>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <Typography size="h1">Instructions for using the Formula One demo</Typography>
          </Grid>
          <Grid item>
            <Typography component="p">
              We have built this demo of the prediction market with a set of markets created for the
              current Formula 1 races. The markets will run on the Granada testnet until the
              championship is finished.
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="p">
              We invite everyone to play with these markets. You play by betting on the different
              drivers to win (or lose), by adding liquidity to markets to profit from others’ bets,
              and by exploiting swings in the markets.
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="p">
              The currency of the markets is the PMM, Prediction Market Money, which you can get
              from our faucet at{' '}
              <a href="https://faucet.tzconnect.berlin/" target="_blank" rel="noreferrer">
                https://faucet.tzconnect.berlin/
              </a>
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="p">
              The overarching goal is to maximise the amount of PMM you have, by any of the above
              methods. At the end of the series the player who has increased their PMM by the
              largest amount, only using the three methods above (bet, add liquidity, create market)
              will be declared the winner and will receive an actual prize in tez.
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="p">
              Additionally there is a bug bounty of 50 tez for any new critical issues reported to
              us. Using bugs to increase one’s PMM balance is cool, but against the rules.
            </Typography>
          </Grid>
          <Grid item>
            <Typography size="h1">Prerequisites</Typography>
            <ul>
              <li>
                <Typography>A Tezos wallet</Typography>
                <ul>
                  <li>
                    <Typography>Compatible with Beacon</Typography>
                  </li>
                  <li>
                    <Typography>Connected to the Granada testnet (granadanet)</Typography>
                  </li>
                  <li>
                    <Typography>
                      Even though it’s just a testnet, we’d welcome some testing with hardware
                      wallets
                    </Typography>
                  </li>
                </ul>
              </li>
              <li>
                <Typography>Funding</Typography>
                <ul>
                  <li>
                    <Typography>Some granadanet Tez tokens</Typography>
                  </li>
                  <li>
                    <Typography>
                      Some PMM, which our faucet will be only too happy to give you
                    </Typography>
                  </li>
                </ul>
              </li>
            </ul>
            <Grid item marginTop="1rem">
              <Typography size="h2">Getting Tokens</Typography>
            </Grid>
            <Grid item>
              <Typography component="p">
                Please go to{' '}
                <a href="https://faucet.tzconnect.berlin/" target="_blank" rel="noreferrer">
                  https://faucet.tzconnect.berlin/
                </a>{' '}
                and enter your address (starting tz….) to receive 100 tez and 10,000 stablecoins to
                play with.
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <Typography size="h1">The prediction market lifecycle</Typography>
            </Grid>
            <Grid item>
              <Typography>
                On our system, prediction markets go through a lifecycle which looks like this:
              </Typography>
              <Typography>
                Question Creation → Pre-Trading Phase → Trading Phase → Market Resolution
              </Typography>
            </Grid>
            <Grid item>
              <Typography size="h2">Question creation</Typography>
              <Typography>
                The questions have all been created for this market already. If you would like to
                create a market, please go to{' '}
                <a href="https://prediction-market.vercel.app/" target="_blank" rel="noreferrer">
                  https://prediction-market.vercel.app/
                </a>{' '}
                where there is another prediction market which permits question creation.
              </Typography>
            </Grid>
            <Grid item>
              <Typography size="h2">Pre-Trading Phase</Typography>
              <Typography component="p">
                In the F1 prediction market this phase lasts until Friday 10th September.
              </Typography>
              <Typography component="p" marginTop="1rem">
                The purpose of this stage is to raise liquidity. Users may participate in the
                pre-market by providing a bet, specifying a predicted probability of the outcome,
                and placing tokens. When the pre-market is cleared, these positions will be
                converted into a combination of a holding of the preferred outcome token, and a
                stake in the liquidity pool (i.e. liquidity tokens), based on the clearing
                mathematics.
              </Typography>
              <Typography component="p" marginTop="1rem">
                Markets are not cleared automatically at the clearing date - any participant may
                call the clearing function at will on a single market, and paying the transaction
                fee, clear it. Until explicitly cleared, markets continue to operate in the
                pre-trading phase.
              </Typography>
              <Typography component="p" marginTop="1rem">
                Predictions with a higher or lower certainty will be converted into respectively
                more outcome tokens or more liquidity tokens after clearing. As liquidity providers,
                pre-market participants are eligible to receive a share of the swap fee, as well as
                a liquidity provider reward from the 5% redemption fee.
              </Typography>
            </Grid>
            <Grid item>
              <Typography size="h2">Trading Phase</Typography>
              <Typography component="p" marginTop="1rem">
                In this stage users can buy Yes and No tokens, sell their tokens, burn yes/no pairs
                of outcome tokens for currency (the nominal value of 1 minus fee), and contribute
                liquidity to the market (for which they will receive a share of profits).
              </Typography>
              <Typography component="p" marginTop="1rem">
                The spot prices depend on the ratio of Yes to No tokens in the market’s liquidity
                pool, using a Uniswap-like liquidity pool formula.
              </Typography>
            </Grid>
            <Grid item>
              <Typography size="h2">Market resolution</Typography>
              <Typography component="p" marginTop="1rem">
                Markets are resolved by an adjudicator contract, using data from an oracle which
                injects Formula 1 scores from the public API at ergast.com. Once a market is
                resolved according to the resolution criteria in the market description, all trading
                is suspended, and outcome tokens expire at 0% or 100% of their nominal value (minus
                redemption fee) respectively.
              </Typography>
              <Typography component="p" marginTop="1rem">
                After resolution, users with a stake in the market - including liquidity tokens,
                reward tokens or (winning) outcome tokens, may claim their winnings and rewards in
                the currency token.
              </Typography>
            </Grid>
            <Grid item>
              <Typography size="h2">Why participate?</Typography>
              <Typography component="p" marginTop="1rem">
                Projects need to be tested to make sure they’re solid. Testing each other’s projects
                strengthens the ecosystem. Of course, you can also just do it to win the prize.
              </Typography>
            </Grid>
            <Grid item>
              <Typography size="h2">Known Limitations</Typography>
              <Typography component="p" marginTop="1rem">
                For now, except for the separate “PMM” game currency token, tokens associated with
                the markets are not transferable, and while the internal logic follows FA2 best
                practices, FA2 metadata and query entrypoints are not provided in this version of
                the market.
              </Typography>
              <Typography component="p" marginTop="1rem">
                The prediction market contract used in the demo is locked down to disallow creating
                new markets. To test market creation logic, you are invited to deploy a new instance
                of the contract and the UI - feel free to reach out with any questions.
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <Typography size="h1">Providing Feedback</Typography>
            </Grid>
            <Grid item>
              <Typography component="p" marginTop="1rem">
                Have comments, questions, or ideas for improvement?{' '}
                <a href="https://bit.ly/3yvNWLk" target="_blank" rel="noreferrer">
                  Leave your feedback here
                </a>
                . Your feedback is anonymous and will be used to help support future development.
              </Typography>
              <Typography component="p" marginTop="1rem">
                We will also be conducting moderated user tests. Tests will be conducted over video
                call, last 30-45 minutes, and will be compensated. If you’re interested, you can
                fill out your information in the form above and we’ll be in touch.
              </Typography>
            </Grid>
            <Grid item>
              <Typography size="h2">Competition Rules</Typography>
              <ol>
                <li>
                  <Typography>
                    The goal of the competition is to maximize your gain through interaction with
                    the prediction market at{' '}
                    <a href="https://f1-prediction-market.vercel.app/">
                      https://f1-prediction-market.vercel.app/
                    </a>
                  </Typography>
                </li>
                <li>
                  <Typography>
                    There is a bug bounty for critical bugs found and reported. Any gains via bugs,
                    reported or unreported will not count toward winning--so report bugs
                  </Typography>
                </li>
                <li>
                  <Typography>
                    Employees or associates of TZ Connect GmbH are not eligible to play. Sorry.
                  </Typography>
                </li>
                <li>
                  <Typography>
                    If multiple people end up winning they will share the prize pot.
                  </Typography>
                </li>
                <li>
                  <Typography>Judges’ decisions are final!</Typography>
                </li>
              </ol>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MainPage>
  );
};
