import React, { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from '../../styles/colors';

export default (MyComponent) => (props) => {
  const [scrollEnabled, setScrollEnabled] = useState(false);
  return (
    <View style={{ backgroundColor: colors.white }}>
      <KeyboardAwareScrollView
        enableAutomaticScroll
        enabledOnAndroid
        onFocus={() => setScrollEnabled(true)}
        onBlur={() => setScrollEnabled(false)}
        scrollEnabled={scrollEnabled}
        contentContainerStyle={{ height: '100%' }}
      >
        <MyComponent {...props} />
      </KeyboardAwareScrollView>
    </View>
  );
};
