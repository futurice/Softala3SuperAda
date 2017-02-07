import React, {PropTypes} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AppStyles from '../AppStyles';

const TeamPointsView = React.createClass({
  render() {
    let sum = 0;
    let maxPoints = 0;

    this.props.companies.data.forEach((company) => {
      if (company.points) {
        sum += company.points;
      }

      maxPoints += 5;
    });

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={AppStyles.darkRed}
          animated={false}
          barStyle="light-content"
        />
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={styles.scrollView}>
          <Text style={styles.headerText}>Tiimisi pisteet!</Text>
          <View style={styles.header}>
            <Image style={styles.mark} source={require('../../../images/pisteet.png')}/>
          </View>
          <View style={styles.pointBox}>
            <Text style={styles.points}>{sum}/{maxPoints}</Text>
          </View>
          <Text style={styles.baseText}>Kaikki rastit suoritettu!</Text>
          <Text style={styles.baseText}>Haluatko antaa järjestäjille palautetta?</Text>
          <View style ={styles.buttons}>
            <TouchableOpacity onPress={this.props.feedback}>
              <View style={styles.button}>
                <Text style={styles.whiteFont}>KYLLÄ</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.goodbye}>
              <View style={styles.button}>
                <Text style={styles.whiteFont}>EI</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
});



const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyles.darkRed,
    flexDirection: 'column',
    flex: 1
  },
  scrollView: {
    flex: 1,
  },
  mark: {
    alignItems: 'center',
    height: 200,
    width: 150
  },
  headerText: {
    marginLeft: 10,
    marginTop: 30,
    marginRight: 10,
    fontSize: AppStyles.titleFontSize,
    marginBottom: 20,
    color: AppStyles.white,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  pointBox: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30
  },
  points: {
    color: AppStyles.white,
    fontSize: AppStyles.headerFontSize,
    fontWeight: 'bold'
  },
  baseText: {
    marginTop: 10,
    fontSize: AppStyles.fontSize,
    color: AppStyles.white,
    textAlign: 'center',
    fontWeight: 'bold'
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
    fontWeight: 'bold'
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
export default TeamPointsView;
