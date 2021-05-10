import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import store from './redux/store';
import '@fontsource/roboto';
import './i18n';
import App from './App';

Sentry.init({
  dsn: 'https://1c98f7e1cc524d7684c2764e64fb9b04@o640348.ingest.sentry.io/5756958',
  integrations: [new Integrations.BrowserTracing()],
  environment: process.env.NODE_ENV,
  debug: process.env.NODE_ENV === 'development',
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.5, // TODO: adjust value for production
  autoSessionTracking: true,
  enabled: true, // TODO: set dynamically from cookie banner
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
