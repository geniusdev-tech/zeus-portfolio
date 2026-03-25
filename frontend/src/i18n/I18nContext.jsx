import { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react';
import {
  DEFAULT_LOCALE,
  detectBrowserLocale,
  getSiteContent,
  normalizeLocale,
  SUPPORTED_LOCALES,
} from './siteContent';

const STORAGE_KEY = 'zeus-protocol-locale';

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => detectBrowserLocale());

  const content = useMemo(() => getSiteContent(locale), [locale]);

  const setLocale = (nextLocale) => {
    const normalized = normalizeLocale(nextLocale);
    setLocaleState(normalized);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, normalized);
    }
  };

  useLayoutEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    defaultLocale: DEFAULT_LOCALE,
    supportedLocales: SUPPORTED_LOCALES,
    content,
    setLocale,
  }), [locale, content]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }

  return context;
}
