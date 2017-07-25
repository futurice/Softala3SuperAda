import React, { Component } from 'react';

import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  WebView,
} from 'react-native';

import AppStyles from '../AppStyles';

import { apiRoot } from '../../utils/rest';

export class MapView extends React.Component {
  static navigationOptions = {
    title: 'Kartta',
  };

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
        <img src="${apiRoot}/public/map.png" />
      </body>
    </html>
    `;

    return (
      <View style={styles.MapContainer}>
        <View style={styles.statusBar} />
        <WebView style={styles.MapImage} source={{ html: HTML }} />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  statusBar: {
    alignSelf: 'stretch',
    backgroundColor: AppStyles.lightRed,
    height: AppStyles.statusbarHeight,
    justifyContent: 'center',
  },
  header: {
    alignSelf: 'stretch',
    backgroundColor: AppStyles.lightRed,
    elevation: AppStyles.headerElevation,
    height: AppStyles.headerHeight,
    justifyContent: 'center',
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
  },
});

export default MapView;
