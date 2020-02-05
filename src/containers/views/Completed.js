import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

import AppStyles from '../../AppStyles';

import TranslatedText from '../../components/TranslatedText';
import I18n from 'ex-react-native-i18n'
import { texts } from '../../utils/translation';

import rest from '../../utils/rest';

const mapStateToProps = state => ({
  companies: state.companies,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  refresh: () => dispatch(rest.actions.companies()),
  feedback: () =>
    ownProps.navigation.navigate({ routeName: 'Feedback' }),
  goodbye: () =>
    ownProps.navigation.replace({ routeName: 'ThankYou' })
});

export class TeamPointsView extends React.Component {
  render() {
    let sum = 0;
    let maxPoints = 0;

    this.props.companies.data.forEach(company => {
      if (company.points) {
        sum += company.points;
      }
      maxPoints += 5;
    });

    return (
      <View style={styles.container}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          <TranslatedText
            style={styles.header}
            text={texts.teamPointsYourScore}
          />

          <Image
            style={styles.mark}
            source={require('../../../assets/pisteet.png')}
          />
          <TranslatedText
            style={styles.baseText}
            text={texts.teamPointsAllCheckpointsComplete}
          />
          <TranslatedText
            style={styles.points}
            text={texts.teamPointsTotalScore}
            sum={sum}
            maxPoints={maxPoints}
          />
          <TranslatedText
            style={styles.baseText}
            text={texts.teamPointsGiveFeedback}
          />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.feedback}>
              <View style={styles.button}>
                <TranslatedText style={styles.whiteFont} text={texts.yes} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.goodbye}>
              <View style={styles.button}>
                <TranslatedText style={styles.whiteFont} text={texts.no} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppStyles.darkRed,
    flexDirection: 'column',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  mark: {
    height: 200,
    width: 150,
    paddingVertical: 20
  },
  header: {
    paddingTop: StatusBar.currentHeight + Platform.OS === 'ios' ? 40 : 20,
    color: AppStyles.white,
    fontFamily: 'pt-sans',
    fontSize: AppStyles.titleFontSize,
  },
  pointBox: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  points: {
    color: AppStyles.white,
    fontSize: AppStyles.headerFontSize,
  },
  baseText: {
    marginTop: 10,
    fontSize: AppStyles.fontSize,
    color: AppStyles.white,
    textAlign: 'center',
  },
  button: {
    backgroundColor: AppStyles.lightRed,
    padding: 15,
    marginTop: 40,
    marginRight: 10,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 70,
    elevation: 2,
  },
  whiteFont: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(TeamPointsView);
