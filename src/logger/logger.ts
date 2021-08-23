import { BrowserClient, EventHint, Hub, Severity } from '@sentry/browser';
import { SENTRY_DSN } from '../globals';

const client = new BrowserClient({
  dsn: SENTRY_DSN,
  enabled: !!SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

const hub = new Hub(client);

/**
 * Log to console in development env
 * @param e Error | string
 */
const printConsole = (e: Error | string): void => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

/**
 * Log error
 * @param e Error
 * @param hint EventHint
 */
const logError = (e: Error, hint?: EventHint): void => {
  printConsole(e);
  hub.setExtra('error', e);
  hub.captureException(e, hint);
};

/**
 * Log Info
 * @param message string
 * @param hint EventHint
 */
const logInfo = (message: string, hint?: EventHint): void => {
  printConsole(`INFO: ${message}`);
  hub.captureMessage(message, Severity.Info, hint);
};

/**
 * Log Warning
 * @param message string
 * @param hint EventHint
 */
const logWarn = (message: string, hint?: EventHint): void => {
  printConsole(`WARN: ${message}`);
  hub.captureMessage(message, Severity.Warning, hint);
};

export { logInfo, logError, logWarn };
