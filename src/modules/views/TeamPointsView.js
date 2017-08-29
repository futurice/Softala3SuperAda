import React, { PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import AppStyles from '../AppStyles';

import TranslatedText from '../../components/TranslatedText';
import { getTranslated, texts } from '../../utils/translation';

import rest from '../../utils/rest';

const mapStateToProps = state => ({
  companies: state.companies,
});
const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch(rest.actions.companies()),
  feedback: () =>
    dispatch(
      NavigationState.pushRoute({
        key: 'FeedbackView',
        title: getTranslated(texts.feedbackTitle),
      }),
    ),
  goodbye: () =>
    dispatch(
      NavigationState.pushRoute({
        key: 'Goodbye',
        title: getTranslated(texts.goodByeTitle),
      }),
    ),
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
        >
          <TranslatedText
            style={styles.headerText}
            text={texts.teamPointsYourScore}
          />
          <View style={styles.header}>
            <Image
              style={styles.mark}
              source={require('../../../images/pisteet.png')}
            />
          </View>
          <View style={styles.pointBox}>
            <Text style={styles.points}>
              {sum}/{maxPoints}
            </Text>
          </View>
          <TranslatedText
            style={styles.baseText}
            text={texts.teamPointsAllCheckpointsComplete}
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
    backgroundColor: AppStyles.darkRed,
    flexDirection: 'column',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  mark: {
    alignItems: 'center',
    height: 200,
    width: 150,
  },
  headerText: {
    marginLeft: 10,
    marginTop: 30,
    marginRight: 10,
    fontSize: AppStyles.titleFontSize,
    marginBottom: 20,
    color: AppStyles.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pointBox: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  points: {
    color: AppStyles.white,
    fontSize: AppStyles.headerFontSize,
    fontWeight: 'bold',
  },
  baseText: {
    marginTop: 10,
    fontSize: AppStyles.fontSize,
    color: AppStyles.white,
    textAlign: 'center',
    fontWeight: 'bold',
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
    elevation: 5,
  },
  whiteFont: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
    fontWeight: 'bold',
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(TeamPointsView);
