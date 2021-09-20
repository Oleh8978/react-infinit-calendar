import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import usd from '../../../utilities/formatters/usdFormatter';
import crypto from '../../../utilities/formatters/cryptoFormatter';

const Number = ({
  digit,
  style = {},
  type = 'usd',
  limitedSpace = false,
}) => {
  const { fontSize } = style;

  const formatter = type === 'usd' ? usd : type === 'crypto' ? crypto : (value) => value;
  return (
    <Text
      allowFontScaling={false}
      style={
        digit?.toString().length > 6 && limitedSpace
          ? { ...style, fontSize: fontSize * 0.75 }
          : style
      }
    >
      {formatter(digit)}
    </Text>
  );
};

export default Number;

Number.ModalWrapper = {
  digit: PropTypes.number.isRequired,
  style: PropTypes.objectOf(PropTypes.object),
  type: PropTypes.string,
  limitedSpace: PropTypes.bool,
};
