import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';

import DefaultButton from '../../../../components/DefaultButton/DefaultButton';
import Indent from '../../../../components/Indent/Indent';

import KYCEndImage from '../../../../../assets/svgs/KYCEnd';
import { view } from '../../../../../styles/mixins';
import styles from '../KnowYourCustomer.styles';

function KYCFinish({ jumpToNextPage }) {
  return (
    <>
      <View style={view}>
        <KYCEndImage />
        <Text allowFontScaling={false} style={styles.description}>
          We have received all necessary information.
          {'\n'}
          Information processing usually takes 1 business day.
        </Text>
      </View>
      <Indent height={10} />
      <DefaultButton
        title="Finish Verification"
        onPress={jumpToNextPage}
      />
    </>
  );
}

KYCFinish.propTypes = {
  jumpToNextPage: PropTypes.func,
};

export default KYCFinish;
