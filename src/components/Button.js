import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

class AdaButton extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    content: React.PropTypes.string.isRequired,
    // TODO: styles: foo.isRequired, onPress: bar.isRequired
  };

  render = () => {
    const { styles, content, onPress, disabled, accessible } = this.props;
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
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
