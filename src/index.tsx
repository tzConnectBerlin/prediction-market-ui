import * as React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { Offline as OfflineIntegration } from '@sentry/integrations';
import './i18n';
import App from './App';
import { FA12_CONTRACT, MARKET_ADDRESS, RPC_PORT, RPC_URL, SENTRY_DSN } from './globals';
import { initTezos, initMarketContract, initFA12Contract } from './contracts/Market';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing(), new OfflineIntegration()],
  environment: process.env.NODE_ENV,
  debug: false,
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.5, // TODO: adjust value for production
  autoSessionTracking: true,
  enabled: !!SENTRY_DSN, // TODO: set dynamically from cookie banner
});

const initializeContracts = async () => {
  initTezos(RPC_URL, RPC_PORT);
  await initMarketContract(MARKET_ADDRESS);
  await initFA12Contract(FA12_CONTRACT);
};

initializeContracts();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
