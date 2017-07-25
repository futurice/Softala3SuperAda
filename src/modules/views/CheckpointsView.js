import React, { PropTypes } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import TeamPointsView from './TeamPointsView';
import AppStyles from '../AppStyles';
import { apiRoot } from '../../utils/rest';
import Dimensions from 'Dimensions';

import { connect } from 'react-redux';

import rest from '../../utils/rest';

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
  };

  state = {
    refreshInterval: null,
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

  fetchData = () => {
    this.props.refresh();
  };

  renderCompany = company => {
    const uri = `${apiRoot}/public/company${company.companyId}.png`;

    return (
      <View key={company.companyId} style={styles.company}>
        <Image
          style={[styles.thumb, company.points ? styles.companyVisited : null]}
          source={{ uri }}
        />

        {company.points
          ? <Image
              style={styles.checkmark}
              source={require('../../../images/checkmark.png')}
            />
          : null}

        <Text numberOfLines={1} style={styles.companyText}>
          {company.companyName}
        </Text>
        <View style={styles.starsContainer}>
          {new Array(5)
            .fill(null)
            .map(
              (element, index) =>
                index < company.points
                  ? <Image
                      key={index}
                      style={styles.star}
                      source={require('../../../images/star.png')}
                    />
                  : <Image
                      key={index}
                      style={styles.star}
                      source={require('../../../images/star_grey.png')}
                    />,
            )}
        </View>
      </View>
    );
  };

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
          <ScrollView style={styles.companyListContainer}>
            <View style={styles.companyList}>
              {this.props.companies.data.map(company =>
                this.renderCompany(company),
              )}
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.map()}
            >
              <Text style={[styles.whiteFont, { fontWeight: 'bold' }]}>
                {'KARTTA'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const screenWidth = Dimensions.get('window').width;

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
  company: {
    alignItems: 'center',
    padding: 10,
    width: Math.floor(screenWidth / 3),
  },
  companyVisited: {
    opacity: 0.5,
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
  companyText: {
    fontSize: Math.floor(screenWidth / 24),
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    width: Math.floor(screenWidth / 20),
    height: Math.floor(screenWidth / 20),
  },
  checkmark: {
    width: 32,
    height: 32,
    position: 'absolute',
    right: 20,
    top: 20,
  },
  thumb: {
    width: Math.floor(screenWidth / 5),
    height: Math.floor(screenWidth / 5),
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
