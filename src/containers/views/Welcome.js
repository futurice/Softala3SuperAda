import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';

import AppStyles from '../../AppStyles';
import AdaButton from '../../components/Button';
import { connect } from 'react-redux';

import TranslatedText from '../../components/TranslatedText';
import { texts } from '../../utils/translation';
import I18n from 'ex-react-native-i18n'

const mapStateToProps = state => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({
  editTeam: () => ownProps.navigation.navigate({ routeName: 'Team' }),
});

export class Welcome extends React.Component {
  static navigationOptions = {
    headerShown: false,
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require('../../../assets/homeiso_transparent.png')}
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
          <TranslatedText
            style={styles.titleText}
            text={texts.welcomeTitle}
          />
          <Image
            style={styles.image}
            source={require('../../../assets/tervetuloa.png')}
          />
          <TranslatedText
            style={styles.textStyle}
            text={texts.checkpointIntro}
          />
          <TranslatedText style={styles.textStyle} text={texts.quizIntro} />
          <TranslatedText style={styles.textStyle} text={texts.goodluck} />
        </ScrollView>
        <AdaButton
          styles={styles}
          content={texts.editTeamButton}
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
    backgroundColor: AppStyles.darkRed,
  },
  titleText: {
    paddingTop: StatusBar.currentHeight + Platform.OS === 'ios' ? 40 : 20,
    fontSize: AppStyles.titleFontSize,
    color: AppStyles.white,
    textAlign: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 200,
    height: 120,
    marginVertical: 20,
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
    flex: 1,
    justifyContent: 'center',
  },
  whiteFont: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
  },
  textStyle: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
