import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Language = 'ko' | 'en';

const STORAGE_KEY = 'provoice_language';
const LANGUAGE_EVENT = 'provoice-language-change';

function readStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'ko';
  if (new URLSearchParams(window.location.search).get('lang') === 'en') return 'en';
  return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'ko';
}

type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void };
const LanguageContext = createContext<LanguageContextValue | null>(null);

/** 고객용 페이지 전체에서 공유하는 언어 상태. GNB의 언어 전환 버튼이 이 값을 바꿉니다. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    const sync = () => setLanguageState(readStoredLanguage());
    window.addEventListener(LANGUAGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(LANGUAGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const setLanguage = (next: Language) => {
    localStorage.setItem(STORAGE_KEY, next);
    setLanguageState(next);
    window.dispatchEvent(new Event(LANGUAGE_EVENT));
  };

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

/** t('한국어 문구', 'English copy') — 현재 언어에 맞는 쪽을 돌려줍니다. */
export function useT() {
  const { language } = useLanguage();
  return (ko: string, en: string) => (language === 'en' ? en : ko);
}
