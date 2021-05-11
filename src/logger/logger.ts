import { BrowserClient, Hub } from '@sentry/browser';
import { SENTRY_DSN } from '../utils/globals';

const client = new BrowserClient({
  dsn: SENTRY_DSN,
  enabled: !!SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

const hub = new Hub(client);

const printConsole = (e: Error | string): void => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

const logError = (e: Error): void => {
  printConsole(e);
  hub.captureException(e);
};

const logInfo = (message: string): void => {
  const prefixed = `INFO: ${message}`;
  printConsole(prefixed);
  hub.captureMessage(prefixed);
};

const logWarn = (message: string): void => {
  const prefixed = `WARN: ${message}`;
  printConsole(prefixed);
  hub.captureMessage(prefixed);
};

export { logInfo, logError, logWarn };
