import React, { PropTypes } from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import AppStyles from '../AppStyles';
import rest from '../../utils/rest';
import AdaButton from '../../components/Button';

const mapStateToProps = state => ({
  teamDetails: state.teamDetails,
  description: state.teamDetails.data.description,
  image: state.teamDetails.data.file,
});

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch(rest.actions.teamDetails()),
  save: (description, imageUri) => {
    let formdata = new FormData();

    if (imageUri) {
      formdata.append('image', {
        uri: imageUri,
        name: 'image.png',
        type: 'multipart/form-data',
      });
    }
    if (description) {
      formdata.append('description', description);
    }

    dispatch(
      rest.actions.teamDetails.post(
        {},
        {
          body: formdata,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        (err, data) => {
          if (!err) {
            dispatch(NavigationActions.navigate({ routeName: 'Checkpoints' }));
          } else {
            console.log('Error ', err);
            console.log('Data: ', data);
          }
        },
      ),
    );
  },
});

export class TeamView extends React.Component {
  static navigationOptions = {
    title: 'Muokkaa tiimiä',
    tabBarLabel: '',
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require('../../../images/ryhmaiso_transparent.png')}
        style={[AppStyles.icon, { tintColor: tintColor }]}
      />,
  };

  state = {
    description: this.props.description,
    image: this.props.image,
    disableSave: false,

    width: 0,
    height: 0,
  };

  componentDidMount() {
    this.props.refresh();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.description !== this.state.description) {
      this.setState({ description: nextProps.description });
    }
    if (nextProps.image !== this.state.image) {
      this.setState({ image: nextProps.image });
    }
  }

  checkpoints = () => {
    this.props.dispatch(NavigationState.switchTab('CheckPointsTab'));
  };

  openImageGallery = () => {
    this.setState({ disableSave: true });

    const options = {
      title: 'Valitse tiimin kuva',
      mediaType: 'photo',
      maxWidth: 512,
      maxHeight: 512,
      allowsEditing: true,
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        this.setState({ disableSave: false });
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.setState({ disableSave: false });
      } else {
        console.log('Imagepicker.response: ', response);
        ImageResizer.createResizedImage(response.uri, 512, 512, 'PNG', 100)
          .then(resizedImageUri => {
            // resizeImageUri is the URI of the new image that can now be displayed, uploaded...
            this.setState({
              disableSave: false,
              modifiedImage: resizedImageUri,
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  render() {
    const name = this.props.teamDetails.data
      ? this.props.teamDetails.data.teamName
      : '';
    const image =
      this.state.modifiedImage !== null
        ? { uri: this.state.modifiedImage }
        : { uri: this.props.image };

    const disabled = this.props.teamDetails.loading || this.state.disableSave;

    return (
      <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <View style={styles.statusBar} />
        <View
          style={{ flex: 1 }}
          onLayout={e => {
            var { x, y, width, height } = e.nativeEvent.layout;
            // TODO: any more sane way of passing this View's height down?
            if (height !== this.state.height) {
              //this.setState({ width, height });
            }
          }}
        >
          <KeyboardAwareScrollView
            style={{ backgroundColor: '#fafafa' }}
            contentContainerStyle={{
              minHeight: this.state.height,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View style={styles.teamName}>
                <Text style={styles.teamTitle}>
                  {' '}{name}{' '}
                </Text>
              </View>
              {!this.props.teamDetails.sync
                ? <ActivityIndicator
                    color={'#ff5454'}
                    animating={true}
                    style={{ height: 150 }}
                    size="large"
                  />
                : <TouchableOpacity
                    onPress={this.openImageGallery}
                    style={[styles.cameraButton]}
                  >
                    {image.uri
                      ? <Image source={image} style={styles.teamImage} />
                      : <Image
                          style={styles.cameraImage}
                          source={require('../../../images/kamera.png')}
                        />}
                  </TouchableOpacity>}
              <Text style={styles.descriptionText}>Slogan:</Text>
              <View style={styles.description}>
                <TextInput
                  style={styles.teamInput}
                  onChangeText={description => this.setState({ description })}
                  value={this.state.description}
                  onSubmitEditing={() => {
                    !disabled &&
                      this.props.save(this.state.description, this.state.image);
                  }}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
        <AdaButton
          styles={styles}
          content={'TALLENNA'}
          onPress={() => {
            this.props.save(this.state.description, this.state.image);
          }}
          disabled={disabled}
          accessible={true}
          activityIndicator={this.state.loading}
        />
      </View>
    );
  }
}

const circle = {
  borderWidth: 0,
  borderRadius: 75,
  width: 150,
  height: 150,
};

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    backgroundColor: AppStyles.lightRed,
    elevation: 5,
    height: AppStyles.headerHeight,
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
    color: AppStyles.white,
    fontSize: AppStyles.headerFontSize,
    fontWeight: 'bold',
  },
  teamContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppStyles.whiteBackground,
  },
  teamName: {
    paddingTop: 20,
  },
  teamNameStyle: {
    alignItems: 'center',
  },
  teamTitle: {
    color: AppStyles.darkRed,
    fontSize: AppStyles.headerFontSize,
    minHeight: 30,
    fontWeight: 'bold',
  },
  description: {
    margin: 20,
    flexDirection: 'row',
  },
  descriptionText: {
    color: 'black',
    fontSize: AppStyles.fontSize,
    fontWeight: 'bold',
    margin: 10,
  },
  teamInput: {
    flex: 1,
    alignSelf: 'stretch',
    color: 'black',
    ...Platform.select({
      ios: {
        height: 70,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 20,
      },
    }),
  },
  cameraButton: {
    ...circle,
    backgroundColor: AppStyles.grey,
    margin: 20,
  },
  cameraImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    alignItems: 'center',
    margin: 25,
  },
  teamImage: {
    width: 150,
    height: 150,
    position: 'absolute',
    alignItems: 'center',
    borderRadius: 75,
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
    elevation: 5,
  },
  buttonLoading: {
    backgroundColor: AppStyles.lightRed,
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    elevation: 5,
  },
  whiteFont: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamView);
