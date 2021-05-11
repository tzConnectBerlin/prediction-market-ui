import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { Offline as OfflineIntegration } from '@sentry/integrations';
import store from './redux/store';
import '@fontsource/roboto';
import './i18n';
import App from './App';
import { SENTRY_DSN } from './utils/globals';
import { enableAPILogging } from './logger/ApiLogging';

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing(), new OfflineIntegration()],
  environment: process.env.NODE_ENV,
  debug: process.env.NODE_ENV === 'development',
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.5, // TODO: adjust value for production
  autoSessionTracking: true,
  enabled: !!SENTRY_DSN, // TODO: set dynamically from cookie banner
});

enableAPILogging();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
