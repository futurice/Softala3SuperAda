import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet, Image } from 'react-native';

import Dimensions from 'Dimensions';
import { apiRoot } from '../utils/rest';

export default class CompanyView extends React.Component {
  render() {
    var company = this.props.company;
    const source = {
      uri: `${apiRoot}/public/company${company.companyId}.png`,
    };

    return (
      <View style={styles.company}>
        <Image
          style={[styles.thumb, company.points ? styles.companyVisited : null]}
          source={source}
          defaultSource={require('../../assets/defCompanyImg.png')}
        />
        {company.points
          ? <Image
              style={styles.checkmark}
              source={require('../../assets/checkmark.png')}
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
                      source={require('../../assets/star.png')}
                    />
                  : <Image
                      key={index}
                      style={styles.star}
                      source={require('../../assets/star_grey.png')}
                    />,
            )}
        </View>
      </View>
    );
  }
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  company: {
    alignItems: 'center',
    padding: 10,
    width: Math.floor(screenWidth / 3),
  },
  thumb: {
    width: Math.floor(screenWidth / 5),
    height: Math.floor(screenWidth / 5),
  },
  companyVisited: {
    opacity: 0.5,
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
  companyText: {
    fontSize: Math.floor(screenWidth / 24),
  },
});
