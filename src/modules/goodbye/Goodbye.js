import React, { PropTypes } from 'react';
import { Text, View, StyleSheet, Image, StatusBar } from 'react-native';

import AppStyles from '../AppStyles';

const Goodbye = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={AppStyles.darkRed}
          animated={false}
          barStyle="light-content"
        />
        <View style={styles.header}>
          <Text style={styles.titleText}>Kiitos!</Text>
          <Image
            style={styles.mark}
            source={require('../../../images/kiitos.png')}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textBody}>Kiitos osallistumisestasi!</Text>
          <Text style={styles.textBody}>Tervetuloa ensi vuonna uudestaan!</Text>
        </View>
        <View style={styles.regardsContainer}>
          <Text style={styles.bottomText}>t- Super-Ada tiimi</Text>
        </View>
      </View>
    );
  },
});

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
  textContainer: {
    padding: 35,
    alignItems: 'center',
  },
  textBody: {
    color: AppStyles.white,
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: AppStyles.fontSize,
  },
  regardsContainer: {
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 20,
    color: AppStyles.white,
    fontWeight: 'bold',
  },
});
export default Goodbye;
