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

function getTranslated(context) {
  if (context === undefined) {
    return 'missing translation!';
  }
  var str = typeof context === 'string' ? context : context.key;
  var translated = I18n.t(str, {
    defaults: [{ message: 'missing translation!' }],
  });
  for (var key in context) {
    if (context.hasOwnProperty(key) || key !== 'key') {
      var element = context[key];
      translated = translated.replace('${' + key + '}', element);
    }
  }
  return translated;
}

function setLocale(locale) {
  I18n.locale = locale;
}

var texts = {
  login: 'login',
  devLogin: 'devLogin',
  welcomeTitle: 'welcomeTitle',
  checkpointIntro: 'checkpointIntro',
  quizIntro: 'quizIntro',
  goodluck: 'goodluck',
  editTeamButton: 'editTeamButton',
  editTeamTitle: 'editTeamTitle',

  imageGalleryOptionsTitle: 'imageGalleryOptionsTitle',
  imageGalleryOptionsTakePhoto: 'imageGalleryOptionsTakePhoto',
  imageGalleryOptionsLibraryButton: 'imageGalleryOptionsLibraryButton',
  imageGalleryOptionsCancelButton: 'imageGalleryOptionsCancelButton',
  imageGalleryOptionsPermissionDeniedTitle:
    'imageGalleryOptionsPermissionDeniedTitle',
  imageGalleryOptionsPermissionDeniedText:
    'imageGalleryOptionsPermissionDeniedText',
  imageGalleryOptionsPermissionDeniedReTry:
    'imageGalleryOptionsPermissionDeniedReTry',
  imageGalleryOptionsPermissionDeniedOk:
    'imageGalleryOptionsPermissionDeniedOk',
  saveButton: 'saveButton',
  checkpointsTitle: 'checkpointsTitle',
  mapButton: 'mapButton',
  mapTitle: 'mapTitle',

  yes: 'yes',
  no: 'no',

  teamPointsYourScore: 'teamPointsYourScore',
  teamPointsAllCheckpointsComplete: 'teamPointsAllCheckpointsComplete',
  teamPointsGiveFeedback: 'teamPointsGiveFeedback',

  feedbackTitle: 'feedbackTitle',
  goodByeTitle: 'goodByeTitle',

  quizWelcome: 'quizWelcome',
  quizExplanation: 'quizExplanation',
  quizTimelimit: 'quizTimelimit',
  quizYouCanTryMultipleTimes: 'quizYouCanTryMultipleTimes',
  quizStart: 'quizStart',
  quizWordsLeft: 'quizWordsLeft',
  quizRetry: 'quizRetry',
  quizPause: 'quizPause',
  quizContinue: 'quizContinue',
  quizTime: 'quizTime',
  quizTimerPause: 'quizTimerPause',

  quizEndCongraz: 'quizEndCongraz',
  quizEndCompleted: 'quizEndCompleted',
  quizEndTimeOver: 'quizEndTimeOver',
  quizEndMinutesBeforeTimeLimit: 'quizEndMinutesBeforeTimeLimit',
  quizEndWordsFound: 'quizEndWordsFound',
  quizEndAllWordsFound: 'quizEndAllWordsFound',
  quizEndAllWordsNotFound: 'quizEndAllWordsNotFound',
  quizEndTotalScore: 'quizEndTotalScore',
  quizEndYouCanTryAgain: 'quizEndYouCanTryAgain',

  feedbackOrganizersInterested: 'feedbackOrganizersInterested',
  feedbackSendButton: 'feedbackSendButton',

  thankYou: 'thankYou',
  thankYouForParticipation: 'thankYouForParticipation',
  thankYourForFeedback: 'thankYouForFeedback',
  thankYouForFeedbackTitle: 'thankYouForFeedbackTitle',
  thankYouComeAgain: 'thankYouComeAgain',
  thankYouBestRegards: 'thankYouBestRegards',
};

function LocaleReducer(state = {}, action) {
  if (action.type === 'changeLanguage_FI') {
    return { ...state, locale: 'fi' };
  }
  return { ...state };
}

export { texts, getTranslated, setLocale, LocaleReducer };
