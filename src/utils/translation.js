import I18n from 'ex-react-native-i18n';
import en from '../../translations/en';
import fi from '../../translations/fi';

I18n.fallbacks = true;
I18n.locales.en = ['en', 'fi'];
I18n.locales.fi = ['fi', 'en'];

I18n.translations = {
  en,
  fi,
};

var texts = {
  ...en
};

Object.keys(texts).forEach(key => texts[key] = key);

export { texts };
