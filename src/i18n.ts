import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import ChainedBackend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export const DEFAULT_LANGUAGE = 'en';
export const FALLBACK_LANGUAGE = 'en';

i18n
  .use(detector)
  .use(ChainedBackend)
  .use(initReactI18next)
  .init({
    backend: {
      backends: [LocalStorageBackend, HttpBackend],
      backendOptions: [
        {
          // prefix for stored languages
          prefix: 'i18next_res_',
          // expiration: Current: 1 Day
          expirationTime: 1 * 24 * 60 * 60 * 1000,
          // can be either window.localStorage or window.sessionStorage. Default: window.localStorage
          store: window.localStorage,
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
