import React, { PropTypes } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import AppStyles from '../AppStyles';

export class FeedbackThankYouView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Kiitos!</Text>
          <Image
            style={styles.mark}
            source={require('../../../images/kiitos.png')}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textstyle}>Kiitos palautteestasi!</Text>
          <Text style={styles.textstyle}>
            Tervetuloa ensi vuonna uudestaan!
          </Text>
        </View>
        <View style={styles.regardContainer}>
          <Text style={styles.bottomText}>t- Super-Ada tiimi</Text>
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomText: {
    color: AppStyles.white,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 50,
  },
});

export default FeedbackThankYouView;
