import React, { Component } from 'react';
import {
  Platform, Animated, Keyboard, KeyboardAvoidingView,
} from 'react-native';

export default (MyComponent, wrapperStyle, deployedHeight, hideHeight = 0, additionalDeployedHeight = 1) => class KeyboardNormalizerFolding extends Component {
  constructor(props) {
    super(props);

    this.height = new Animated.Value(deployedHeight);
    this.addHeight = new Animated.Value(additionalDeployedHeight);
    this.state = {
      keyboardBehavior: 'padding',
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.setState({
      keyboardBehavior: Platform.OS === 'android' ? 'height' : 'padding',
    });
  }

  componentDidMount() {
    const eventMoment = Platform.OS === 'android' ? 'Did' : 'Will';

    this.keyboardShowSub = Keyboard.addListener(
      `keyboard${eventMoment}Show`,
      this.keyboardShow,
    );
    this.keyboardHideSub = Keyboard.addListener(
      `keyboard${eventMoment}Hide`,
      this.keyboardHide,
    );
  }

  componentWillUnmount() {
    this.keyboardShowSub.remove();
    this.keyboardHideSub.remove();
  }

    keyboardShow = () => {
      Animated.timing(this.height, {
        duration: 225,
        toValue: hideHeight,
        useNativeDriver: false,
      }).start();

      Animated.timing(this.addHeight, {
        duration: 225,
        toValue: hideHeight,
        useNativeDriver: false,
      }).start();
    };

    keyboardHide = () => {
      Animated.timing(this.height, {
        duration: 225,
        toValue: deployedHeight,
        useNativeDriver: false,
      }).start();

      Animated.timing(this.addHeight, {
        duration: 225,
        toValue: additionalDeployedHeight,
        useNativeDriver: false,
      }).start();
    };

    render() {
      const { keyboardBehavior } = this.state;
      return (
        <KeyboardAvoidingView style={wrapperStyle} behavior={keyboardBehavior}>
          <MyComponent height={this.height} addHeight={this.addHeight} {...this.props} />
        </KeyboardAvoidingView>
      );
    }
};
