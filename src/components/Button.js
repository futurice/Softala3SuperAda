import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

class AdaButton extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    content: React.PropTypes.string.isRequired,
    // TODO: styles: foo.isRequired, onPress: bar.isRequired
  };

  render = () => {
    const { styles, content, onPress, disabled } = this.props;
    var buttonStyle = disabled ? styles.buttonLoading : styles.button;
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={buttonStyle}
          onPress={onPress}
          disabled={disabled}
        >
          <Text style={styles.whiteFont}>
            {content}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

export default AdaButton;
