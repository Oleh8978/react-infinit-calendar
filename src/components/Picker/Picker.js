import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Platform, View, TouchableWithoutFeedback,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import DefaultButton from '../DefaultButton/DefaultButton';
import Modal from '../Modal/Modal';
import Indent from '../Indent/Indent';

export default Object.assign(({
  close,
  header = '',
  value,
  onValueChange,
  list,
  select,
}) => {
  const [modalSwipeDirection, setModalSwipeDirection] = useState('down');
  return Platform.OS === 'android'
    ? (
      <>
        <Picker
          selectedValue={value}
          onValueChange={(_value) => {
            setModalSwipeDirection('down');
            onValueChange(_value);
          }}
          mode="dropdown"
        >
          {list.map((_value) => (
            <Picker.Item label={_value.name} value={_value.value} key={_value} />
          ))}
        </Picker>
      </>
    )
    : (
      <Modal close={close} header={header} swipeDirection={modalSwipeDirection}>
        <View style={{ width: '100%', height: 200 }}>
          <TouchableWithoutFeedback onPressOut={() => setModalSwipeDirection([])}>
            {/* logic bonds with TouchableWithoutFeedback and modalSwipeDirection is important for normal Picker work */}
            <View>
              {/* View component here is for TouchableWithoutFeedback work */}
              <Picker
                selectedValue={value}
                onValueChange={(_value) => {
                  setModalSwipeDirection('down');
                  onValueChange(_value);
                }}
              >
                {list.map((_value) => (
                  <Picker.Item label={_value.name} value={_value.value} key={_value} />
                ))}
              </Picker>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {select && <DefaultButton title="Select" onPress={select} />}
        <Indent height={20} />
      </Modal>
    );
},
{ propTypes: {
  close: PropTypes.func,
  header: PropTypes.string,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.object),
  select: PropTypes.func,
} });
