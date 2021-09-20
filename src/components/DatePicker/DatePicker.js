import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Platform, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import DefaultButton from '../DefaultButton/DefaultButton';
import Modal from '../Modal/Modal';
import Indent from '../Indent/Indent';
import colors from '../../../styles/colors';

export default Object.assign(({
  close,
  header = '',
  value,
  onValueChange,
  select,
  maximumDate = new Date(),
}) => {
  const DatePicker = useCallback(() => useMemo(() => (
    <DateTimePicker
      value={value}
      mode="date"
      display="spinner"
      onChange={onValueChange}
      maximumDate={maximumDate}
      style={{ color: colors.black }}
    />
  ),
  [value]), []);

  return Platform.OS === 'android'
    ? (
      <>
        <DatePicker />
      </>
    )
    : (
      <Modal close={close} header={header} swipeDirection="down">
        <View style={{ width: '100%', height: 200 }}>
          <DatePicker />
        </View>
        {select && <DefaultButton title="Select" onPress={select} />}
        <Indent height={20} />
      </Modal>
    );
},
{ propTypes: { close: PropTypes.func,
  header: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onValueChange: PropTypes.func,
  select: PropTypes.func,
  maximumDate: PropTypes.string } });
