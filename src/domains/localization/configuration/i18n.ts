import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import frenchTranslations from './fr.json';
import englishTranslations from './en.json';

/* eslint-disable no-mixed-spaces-and-tabs, no-tabs */
i18n
  .use(initReactI18next)
  .init(
    {
      resources:
			{
			  en: { translation: englishTranslations },
			  fr: { translation: frenchTranslations },
			},
      lng: 'en',
      interpolation: { escapeValue: false },
    });

export default i18n;
