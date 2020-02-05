import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';

import TranslatedText from '../../components/TranslatedText';
import CompletedView from './Completed';
import AppStyles from '../../AppStyles';

import rest from '../../utils/rest';
import AdaButton from '../../components/Button';
import Company from '../../components/Company';

import { texts } from '../../utils/translation';
import I18n from 'ex-react-native-i18n'

const mapStateToProps = state => ({
  companies: state.companies,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  refresh: () => dispatch(rest.actions.companies()),
  map: () =>
    ownProps.navigation.navigate({
      routeName: 'Map',
    }),
});

export class CheckPointView extends React.Component {
  static navigationOptions = {
    headerShown: false,
    title: 'Checkpoints',
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require('../../../assets/karttaiso_transparent.png')}
        style={[AppStyles.icon, { tintColor: tintColor }]}
      />,
  };

  state = {
    refreshInterval: null,
    refreshing: false,
  };

  componentDidMount() {
    this.fetchData();
    this.setState({
      refreshInterval: setInterval(this.fetchData, 60 * 1000),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.refreshInterval);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.companies !== this.props.companies) {
      this.setState({ refreshing: false });
    }
  }

  fetchData = () => {
    this.props.refresh();
  };

  onPullRefresh() {
    this.setState({ refreshing: true });
    this.fetchData();
  }

  render() {
    let visitedCompanies = 0;
    let numCompanies = 0;

    this.props.companies.data.forEach(company => {
      if (company.points) {
        visitedCompanies++;
      }
      numCompanies++;
    });

    if (!this.props.companies.data.length && this.props.companies.loading) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator
            color={'#ed3a4b'}
            size={'large'}
            style={styles.centered}
          />
        </View>
      );
    } else if (numCompanies && visitedCompanies >= numCompanies) {
      return <CompletedView />;
    } else {
      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.companyListContainer}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.fetchData.bind(this)}
              />
            }
          >
            <TranslatedText
              style={styles.titleText}
              text={texts.checkpointsTitle}
            />
            <View style={styles.companyList}>
              {this.props.companies.data.map(company =>
                <Company key={company.companyId} company={company} />,
              )}
            </View>
          </ScrollView>
          <AdaButton
            styles={styles}
            content={texts.mapButton}
            onPress={() => this.props.map()}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  header: {
    elevation: 2,
    alignSelf: 'stretch',
    backgroundColor: '#fe9593',
    height: 64,
    justifyContent: 'center',
  },
  titleText: {
    paddingTop: StatusBar.currentHeight + Platform.OS === 'ios' ? 40 : 20,
    fontSize: AppStyles.titleFontSize,
    color: AppStyles.darkRed,
    textAlign: 'center',
  },
  headerText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 32,
  },
  companyListContainer: {
    alignSelf: 'stretch',
  },
  companyList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 24,
    padding: 5,
  },
  buttonText: {
    margin: 10,
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: AppStyles.whiteBackground,
    elevation: 2,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    margin: 20,
  },
  button: {
    backgroundColor: AppStyles.darkRed,
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  whiteFont: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
  },
  centered: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckPointView);
