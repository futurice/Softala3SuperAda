import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import AppStyles from '../../AppStyles';

import TranslatedText from '../../components/TranslatedText';
import { texts } from '../../utils/translation';
import I18n from 'ex-react-native-i18n'

export class FeedbackThankYouView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TranslatedText style={styles.titleText} text={texts.thankYou} />
          <Image
            style={styles.mark}
            source={require('../../../assets/kiitos.png')}
          />
        </View>
        <View style={styles.inputContainer}>
          <TranslatedText
            style={styles.textBody}
            text={texts.thankYouForFeedback}
          />
          <TranslatedText
            style={styles.textBody}
            text={texts.thankYouComeAgain}
          />
        </View>
        <View style={styles.regardContainer}>
          <TranslatedText
            style={styles.bottomText}
            text={texts.thankYouBestRegards}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: AppStyles.darkRed,
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  titleText: {
    fontSize: AppStyles.titleFontSize,
    color: AppStyles.white,
  },
  mark: {
    width: 200,
    height: 250,
  },
  textstyle: {
    color: AppStyles.white,
    marginBottom: 15,
    fontSize: AppStyles.fontSize,
    textAlign: 'center',
  },
  bottomText: {
    color: AppStyles.white,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default FeedbackThankYouView;
