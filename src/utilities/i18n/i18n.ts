import {initReactI18next} from 'react-i18next';
import {resources} from '@assets/locales';
import i18n, {LanguageDetectorAsyncModule} from 'i18next';
import {I18nManager} from 'react-native';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: (callback: any) => {
    callback('en_US');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

/**
 * Config i18n for app
 */
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en_US',
    resources,
    lng: I18nManager.isRTL ? 'ur' : 'en_US',

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    debug: false,

    // cache: {
    //   enabled: true
    // },
    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
      // ...
      // value == today from {{today, date}} == new Date()
      // format == date from {{today, date}} == "date"
      // lng == active language
      format: function (value, format, lng) {
        if (format === 'date') {
          return new Intl.DateTimeFormat(lng).format(value);
        }
        return value;
      },
    },
  })
  .then(() => '');

export default i18n;
