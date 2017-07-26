import React, { PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import AppStyles from '../AppStyles';
import AdaButton from '../../components/Button';
import { connect } from 'react-redux';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  editTeam: () => dispatch(NavigationActions.navigate({ routeName: 'Team' })),
});

export class Welcome extends React.Component {
  static navigationOptions = {
    title: 'Tervetuloa!',
    tabBarLabel: '',
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require('../../../images/homeiso_transparent.png')}
        style={[AppStyles.icon, { tintColor: tintColor }]}
      />,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
          }}
        >
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
        <AdaButton
          styles={styles}
          content={'MUOKKAA TIIMIÄ'}
          onPress={this.props.editTeam}
        />
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
