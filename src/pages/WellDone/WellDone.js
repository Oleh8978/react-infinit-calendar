import React from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView, View, Text,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import statusBar from '../../../utilities/statusBar';

import DefaultButton from '../../components/DefaultButton/DefaultButton';
import Indent from '../../components/Indent/Indent';

import WellDoneImage from '../../../assets/svgs/WellDone';
import { view } from '../../../styles/mixins';
import styles from './WellDone.styles';

export default function WellDone({ route }) {
  useFocusEffect(() => statusBar('light'));

  return (
    <SafeAreaView style={styles.wrapper}>
      <View />
      <View style={view}>
        <WellDoneImage />
        <Text allowFontScaling={false} style={styles.wellDoneText}>
          Well Done!
        </Text>
      </View>
      <DefaultButton
        customStyles={{ marginVertical: 0, top: -20 }}
        title={route.params.buttonText}
        onPress={route.params.onPress}
      />
      <Indent />
    </SafeAreaView>
  );
}

WellDone.propTypes = {
  route: PropTypes.shape(PropTypes.object),
};
