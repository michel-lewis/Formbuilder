import React, { createContext, useContext, useState, useEffect } from 'react';
import { Translation, Translations } from './global-utils';
import { translationValues } from './translation'

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("fr");
  const [translations, setTranslations] = useState<Translations>({ en: [], fr: [] });

  useEffect(() => {
    const getTranslations = () => {
      const translations = translationValues;
      setTranslations(translations);
    };

    getTranslations();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};