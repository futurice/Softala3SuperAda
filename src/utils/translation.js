import I18n from 'react-native-i18n';
import en from '../../translations/en';
import fi from '../../translations/fi';

I18n.fallbacks = true;
I18n.locales.en = ['en', 'fi'];
I18n.locales.fi = ['fi', 'en'];

I18n.translations = {
  en,
  fi,
};

function getTranslated(key) {
  return I18n.t(key, { defaults: [{ message: 'missing translation!' }] });
}

function setLocale(locale) {
  I18n.locale = locale;
}

var texts = {
  welcomeTitle: 'welcomeTitle',
  checkpointIntro: 'checkpointIntro',
  quizIntro: 'quizIntro',
  goodluck: 'goodluck',
  editTeamButton: 'editTeamButton',
  editTeamTitle: 'editTeamTitle',
};

function LocaleReducer(state = {}, action) {
  if (action.type === 'changeLanguage_FI') {
    return { ...state, locale: 'fi' };
  }
  return { ...state };
}

export { texts, getTranslated, setLocale, LocaleReducer };
