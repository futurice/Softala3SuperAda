import React, {Component} from 'react';

import{
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  WebView
} from 'react-native';

import * as NavigationState from '../../modules/navigation/NavigationState';
import AppStyles from '../AppStyles';

import {getConfiguration} from '../../utils/configuration';

const MapView = React.createClass({
  render() {
    const HTML = `
    <!DOCTYPE html>\n
    <html>
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <style type="text/css">
          body {
            margin: 0;
            padding: 0;
          }
          img {
            position: absolute;
            margin: auto;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            max-height: 100%;
            max-width: 100%;
          }
        </style>
      </head>
      <body>
        <img src="${getConfiguration('API_ROOT')}/public/map.png" />
      </body>
    </html>
    `;

    return (
      <View style={styles.MapContainer}>
        <View style={styles.statusBar} />
        <View style={styles.header}>
          <TouchableOpacity onPress={this.props.back} style={{zIndex: 1000, top: 0, left: 0, position: 'absolute'}}>
            <Image style={{resizeMode: 'contain', width: 64, height: 64, zIndex: 1000 }} source={require('../../../images/back_arrow.png')}/>
          </TouchableOpacity>
          <Text style={styles.headerText}>
            Kartta
          </Text>
        </View>
        <WebView style={styles.MapImage}
          source={{html: HTML}}
        />
      </View>
    );
  }
});

let styles = StyleSheet.create({
  statusBar: {
    alignSelf: 'stretch',
    backgroundColor: AppStyles.lightRed,
    height: AppStyles.statusbarHeight,
    justifyContent: 'center'
  },
  header: {
    alignSelf: 'stretch',
    backgroundColor: AppStyles.lightRed,
    elevation: AppStyles.headerElevation,
    height: AppStyles.headerHeight,
    justifyContent: 'center'
  },
  headerText: {
    textAlign: 'center',
    color: AppStyles.white,
    fontSize: AppStyles.headerFontSize,
    fontWeight: 'bold',
  },
  MapContainer: {
    flex: 1,
    backgroundColor: AppStyles.whiteBackground,
  },
  MapImage: {
    flex: 1,
  }
});

export default MapView;
