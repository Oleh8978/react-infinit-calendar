import React from 'react';
import {
  View, Text, KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import styles from './Modal.styles';

const ContentWrapper = ({ keyboardNormalizer, children }) => (keyboardNormalizer
  ? (
    <KeyboardAvoidingView behavior="position">
      {children}
    </KeyboardAvoidingView>
  )
  : <>{children}</>);

export default function ModalWrapper({
  children,
  close,
  header,
  swipeDirection = 'down',
  keyboardNormalizer = false,
}) {
  return (
    <Modal
      testID="modal"
      swipeDirection={swipeDirection}
      isVisible
      onSwipeComplete={close}
      onBackdropPress={close}
      style={styles.filterModal}
      propagateSwipe
    >
      <ContentWrapper keyboardNormalizer={keyboardNormalizer}>
        <View style={styles.filterModalBody}>
          <View style={styles.sliderWrapper}>
            <View style={styles.slider} />
          </View>
          {header ? <Text allowFontScaling={false} style={styles.modalHeader}>{header}</Text> : null}
          {children}
        </View>
      </ContentWrapper>
    </Modal>
  );
}

ModalWrapper.ModalWrapper = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  swipeDirection: PropTypes.string,
  keyboardNormalizer: PropTypes.bool,
};
