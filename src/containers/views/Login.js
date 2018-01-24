import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  AsyncStorage,
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import rest from '../../utils/rest';
import AppStyles from '../../AppStyles';
import AdaButton from '../../components/Button';

import TranslatedText from '../../components/TranslatedText';
import { texts } from '../../utils/translation';
import I18n from 'ex-react-native-i18n'
import SuperAda from '../../../assets/superada.png';

const mapStateToProps = state => ({
  auth: state.auth,
  token: state.auth.data.token,
});

const mapDispatchToProps = dispatch => ({
  login: name => {
    dispatch(
      rest.actions.auth(
        {},
        {
          body: JSON.stringify({
            name: name.trim(),
          }),
        },
      ),
    );
  },
  navigateTo: (routeName: string) =>
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName })],
      }),
    ),
});

export class LoginView extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    teamname: '',
  };

  errToString(err) {
    if (!err) {
      return '';
    }

    if (err.status === 401) {
      return 'incorrectLogin';
    }
    /*
    if (err.message) {
      return err.message;
    }
    */

    return 'networkError';
  }

  renderDevLoginButton() {
    return (
      <AdaButton
        styles={styles}
        content={texts.devLogin}
        disabled={this.props.auth.loading}
        onPress={() => this.props.login('TeamAwesome')}
      />
    );
  }

  renderLoginButton() {
    return (
      <AdaButton
        styles={styles}
        content={texts.login}
        disabled={this.props.auth.loading}
        onPress={() => this.props.login(this.state.teamname)}
        activityIndicator={this.props.auth.loading}
      />
    );
  }

  // When the team has logged in, reset the navigation stack so that "back" does not
  // take them back to the login screen
  componentDidUpdate() {
    if (this.props.token) {
      this.props.navigateTo('Tabs');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{ flex: 1, alignSelf: 'stretch' }}
          contentContainerStyle={{
            alignItems: 'center',
          }}
        >
          <Image
            style={styles.logo}
            source={SuperAda}
          />
          <View style={styles.inputContainer}>
            <TranslatedText
              style={styles.whiteFont}
              text={texts.teamName}
            />
            <TextInput
              style={[styles.input, styles.whiteFont]}
              onChangeText={teamname => this.setState({ teamname })}
              value={this.state.teamname}
              autoCorrect={false}
              underlineColorAndroid="#000"
              selectionColor="#000"
            />
          </View>
          { this.props.auth.error &&
            <View style={styles.errorContainer}>
              <TranslatedText
                style={styles.whiteFont}
                text={this.errToString(this.props.auth.error)}
              />
            </View>
          }
        </ScrollView>

        {this.renderLoginButton()}
        {__DEV__ && this.renderDevLoginButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    marginHorizontal: 35,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: AppStyles.darkRed,
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0,
    backgroundColor: 'transparent',
  },
  logo: {
    marginVertical: 40,
    width: '80%',
    height: 200,
    resizeMode: 'contain',
  },
  errContainer: {
    flexGrow: 1,
  },
  buttonContainer: {
    backgroundColor: AppStyles.darkRed,
    elevation: 2,
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
    height: 70,
    padding: 20,
  },
  buttonLoading: {
    backgroundColor: AppStyles.darkRed,
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 70,
    padding: 20,
  },
  inputContainer: {
    marginHorizontal: 35,
    alignSelf: 'stretch',
    ...Platform.select({
      ios: {
        borderBottomWidth: 1,
      },
    }),
  },
  input: {
    height: 45,
    fontSize: AppStyles.fontSize,
  },
  whiteFont: {
    fontSize: AppStyles.fontSize,
    color: AppStyles.white,
  },
  debug: {
    color: AppStyles.white,
    marginBottom: 15,
    marginLeft: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
