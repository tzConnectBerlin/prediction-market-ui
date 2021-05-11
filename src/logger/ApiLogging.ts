import { setLogger } from 'react-query';
import { logError, logInfo, logWarn } from './logger';

export const enableAPILogging = (force?: boolean): void => {
  if (process.env.NODE_ENV !== 'test' || force) {
    setLogger({
      log: logInfo,
      warn: logWarn,
      error: logError,
    });
  }
};
