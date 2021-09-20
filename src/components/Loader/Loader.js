import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../../styles/colors';
import statusBar from '../../../utilities/statusBar';

function Loader({ isAbsolute = false, size = 'small', color = colors.white }) {
  if (isAbsolute) {
    statusBar('light');
  }

  return (
    <View
      style={
        isAbsolute
          ? {
            position: 'absolute',
            top: '50%',
            alignItems: 'center',
            width: '100%',
          }
          : {}
      }
    >
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

export default Loader;

Loader.propTypes = {
  isAbsolute: PropTypes.bool,
  size: PropTypes.string,
  color: PropTypes.string,
};
