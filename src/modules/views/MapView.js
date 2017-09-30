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
import { getTranslated, texts } from '../../utils/translation';
import { connect } from 'react-redux';
import rest from '../../utils/rest';

const mapStateToProps = state => ({
  companies: state.companies.data,
});
const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch(rest.actions.companies()),
});

export class MapView extends React.Component {
  constructor() {
    super();
    this.state = {
      source: { uri: `${apiRoot}/public/map_template.png` },
    };
  }
  static navigationOptions = {
    title: getTranslated(texts.mapTitle),
  };

  handleOnLayout = evt => {
    const { layout } = evt.nativeEvent;
    const containerWidth = layout.width;

    Image.getSize(this.state.source.uri, (width, height) => {
      this.setState({
        mapImageWidth: containerWidth,
        mapImageHeight: containerWidth * height / width,
        mapImageX: layout.x,
        mapImageY: layout.y,
      });
    });
  };

  render() {
    const { companies } = this.props;
    const { mapImageX, mapImageY, mapImageWidth, mapImageHeight } = this.state;

    var mapImageStyle = {
      width: mapImageWidth,
      height: mapImageHeight,
    };

    return (
      <View style={styles.MapContainer}>
        <Image
          style={mapImageStyle}
          source={this.state.source}
          ref="mapImage"
          onLayout={this.handleOnLayout}
        />
        {companies.map((company, index) => {
          const { positionX, positionY } = company;
          var left = 0,
            top = 0;

          if (positionX > 0.0 || positionY > 0.0) {
            left = positionX * mapImageWidth + mapImageX;
            top = positionY * mapImageHeight + mapImageY;
          } else {
            //hide the company icon if it's not placed
            left = -100;
            top = -100;
          }

          var style = {
            width: 26,
            height: 26,
            position: 'absolute',
            left: left,
            top: top,
          };

          return (
            <Image
              key={index}
              style={style}
              source={{
                uri: `${apiRoot}/public/company${company.companyId}.png`,
              }}
              defaultSource={require('../../../images/defCompanyImg.png')}
            />
          );
        })}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  MapContainer: {
    flex: 1,
    backgroundColor: AppStyles.whiteBackground,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
