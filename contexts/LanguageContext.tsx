// Version 1.15.4 - Bulletproof Translation Engine
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations } from '../services/translations';

export type Language = 'es' | 'en' | 'pt' | 'fr' | 'it' | 'de' | 'pl' | 'el' | 'ru' | 'ja' | 'ko' | 'zh' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language || (navigator as any).userLanguage;
      if (browserLang) {
        const langCode = browserLang.split('-')[0];
        const supported = ['es', 'en', 'pt', 'fr', 'it', 'de', 'pl', 'el', 'ru', 'ja', 'ko', 'zh', 'hi'];
        if (supported.includes(langCode)) return langCode as Language;
      }
    }
    return 'es';
  });

  const t = (path: string): string => {
    const keys = path.split('.');
    
    const getFromObj = (obj: any, pathKeys: string[]) => {
      let current = obj;
      for (const key of pathKeys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          return undefined;
        }
      }
      return typeof current === 'string' ? current : undefined;
    };

    // 1. Try current language
    const result = getFromObj(translations[language], keys);
    if (result !== undefined) return result;

    // 2. Fallback to Spanish (the source of truth)
    const fallback = getFromObj(translations['es'], keys);
    if (fallback !== undefined) return fallback;

    // 3. Return the key path as text if everything else fails
    return path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};