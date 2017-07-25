import React, { PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import AppStyles from '../AppStyles';

import { connect } from 'react-redux';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  profile: () =>
    dispatch(NavigationActions.navigate({ routeName: 'ProfileTab' })),
});

export class Welcome extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={AppStyles.darkRed}
          animated={false}
          barStyle="light-content"
        />

        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
          }}
        >
          <Text style={styles.titleText}>Tervetuloa!</Text>
          <Image
            style={styles.image}
            source={require('../../../images/tervetuloa.png')}
          />
          <Text style={styles.textStyle}>
            Kahdeksan rastia odottavat sinua! Jokaisella rastilla suoritetaan
            tehtävä. Rasteja pitävät yritykset ja oppilaitokset kirjaavat
            rastisuoritukset puolestanne
          </Text>
          <Text style={styles.textStyle}>
            Kannattaa pelata läpi myös Super-Ada Quiz. Tasapistetilanteessa
            hyvin suoritettu Quiz ratkaisee voiton.
          </Text>
          <Text style={styles.textStyle}>ONNEA MATKAAN!</Text>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.props.profile}>
            <Text style={styles.whiteFont}>MUOKKAA TIIMIÄ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppStyles.darkRed,
  },
  titleText: {
    paddingTop: 20,
    fontSize: AppStyles.titleFontSize,
    fontWeight: 'bold',
    color: AppStyles.white,
    textAlign: 'center',
  },
  image: {
    resizeMode: 'contain',
    height: 200,
  },
  buttonContainer: {
    backgroundColor: AppStyles.darkRed,
    elevation: 5,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    margin: 20,
  },
  button: {
    backgroundColor: AppStyles.lightRed,
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  whiteFont: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
    fontWeight: 'bold',
  },
  textStyle: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
