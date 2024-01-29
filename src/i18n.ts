import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEnglish from './locales/en.json';
import translationFrench from './locales/fr.json';
import translationMalagasy from './locales/mg.json';
const resources = {
    en: {
        translation: translationEnglish,
    },
    fr: {
        translation: translationFrench,
    },
    mg: {
        translation: translationMalagasy,
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('lang') || 'en'
    });

export default i18n;