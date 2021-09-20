import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

export default function Indent({ height }) {
  return <View style={{ height }} />;
}

Indent.propTypes = {
  height: PropTypes.number.isRequired,
};
