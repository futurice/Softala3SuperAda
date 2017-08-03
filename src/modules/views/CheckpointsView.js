import React, { PropTypes } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import TeamPointsView from './TeamPointsView';
import AppStyles from '../AppStyles';

import rest from '../../utils/rest';
import AdaButton from '../../components/Button';
import CompanyView from './CompanyView';

const mapStateToProps = state => ({
  companies: state.companies,
});
const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch(rest.actions.companies()),
  map: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'Map',
      }),
    ),
});

export class CheckPointView extends React.Component {
  static navigationOptions = {
    title: 'Rastit',
    tabBarLabel: '',
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require('../../../images/karttaiso_transparent.png')}
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
      return <TeamPointsView />;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.statusBar} />
          <ScrollView
            style={styles.companyListContainer}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.fetchData.bind(this)}
              />
            }
          >
            <View style={styles.companyList}>
              {this.props.companies.data.map(company =>
                <CompanyView key={company.companyId} company={company} />,
              )}
            </View>
          </ScrollView>
          <AdaButton
            styles={styles}
            content={'KARTTA'}
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
    elevation: 5,
    alignSelf: 'stretch',
    backgroundColor: '#fe9593',
    height: 64,
    justifyContent: 'center',
  },
  statusBar: {
    alignSelf: 'stretch',
    backgroundColor: AppStyles.lightRed,
    height: AppStyles.statusbarHeight,
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  companyListContainer: {
    paddingTop: 10,
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: AppStyles.whiteBackground,
    elevation: 5,
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
