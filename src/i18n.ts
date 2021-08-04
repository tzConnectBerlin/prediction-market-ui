import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import ChainedBackend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import pkg from '../package.json';

export const DEFAULT_LANGUAGE = 'en';
export const FALLBACK_LANGUAGE = 'en';

const storageDuration = process.env.NODE_ENV === 'development' ? 1 : 1 * 24 * 60 * 60 * 1000;

i18n
  .use(detector)
  .use(ChainedBackend)
  .use(initReactI18next)
  .init({
    backend: {
      backends: [LocalStorageBackend, HttpBackend],
      backendOptions: [
        {
          prefix: `i18next_res_`,
          expirationTime: storageDuration,
          // can be either window.localStorage or window.sessionStorage. Default: window.localStorage
          store: window.localStorage,
          defaultVersion: pkg.version,
        },
      ],
    },
    lng: DEFAULT_LANGUAGE,
    fallbackLng: FALLBACK_LANGUAGE,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
