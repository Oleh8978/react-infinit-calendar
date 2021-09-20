import React from 'react';
import { View, Text } from 'react-native';

import colors from '../../../styles/colors';
import styles from './PasswordValidator.styles';

function PasswordValidator({ validators }) {
  return (
    <View style={styles.wrapper}>
      <Text style={{ ...styles.passwordRequirement, color: validators.length ? colors.green : colors.red }}>
        Must be 8+ characters.
      </Text>
      <Text style={{ ...styles.passwordRequirement, color: validators.number ? colors.green : colors.red }}>
        Must contain at least one number.
      </Text>
      <Text style={{ ...styles.passwordRequirement, color: validators.upperCaseLetter ? colors.green : colors.red }}>
        Must contain at least one uppercase letter.
      </Text>
      <Text style={{ ...styles.passwordRequirement, color: validators.lowercaseLetter ? colors.green : colors.red }}>
        Must contain at least one lowercase letter.
      </Text>
    </View>
  );
}

export default PasswordValidator;
