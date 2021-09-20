import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableWithoutFeedback, Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { observer } from 'mobx-react-lite';

import Store from '../../../store';
import statusBar from '../../../../utilities/statusBar';

import {
  EMAIL, DEVICE_WIDTH, WEB,
} from '../../../../constants/constants';
import { AUTHENTICATION } from '../../../../constants/navigation/navigators';
import { MAIN } from '../../../../constants/navigation/authenticationScreens';
import {
  SETTINGS,
  KNOW_YOUR_CUSTOMER,
} from '../../../../constants/navigation/userScreens';

import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Indent from '../../../components/Indent/Indent';
import Notification from '../../../components/Notification/Notification';
import Modal from '../../../components/Modal/Modal';
import Score from '../../../components/Score/Score';

import AccountLeftBackground from '../../../../assets/svgs/AccountLeftBackground';
import AccountRightBackground from '../../../../assets/svgs/AccountRightBackground';
import ExternalLinkImage from '../../../../assets/svgs/ExternalLink';
import ArrowRightImage from '../../../../assets/svgs/ArrowRight';
import ContactSupportImage from '../../../../assets/svgs/ContactSupport';

import {
  view,
  shadow,
  smallHeader,
  accountPageBody,
  whiteButton,
} from '../../../../styles/mixins';
import colors from '../../../../styles/colors';
import styles from './Account.styles';

export default observer(({ navigation, route: { params: showPicker } }) => {
  useFocusEffect(() => statusBar('dark'));

  const [showKYC, setShowKYC] = useState(Store.user.KYCProgress < 3);
  const [showKYCTypePicker, setShowKYCTypePicker] = useState(false);
  const [error, setError] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => setShowKYC(Store.user.KYCProgress < 3), [Store.user.KYCProgress]);
  useEffect(() => setShowKYCTypePicker(!!showPicker?.showPicker), [showPicker]);

  const goToKYC = async (type) => {
    setShowKYCTypePicker(false);
    navigation.navigate(KNOW_YOUR_CUSTOMER, { type });
  };

  const signOut = async () => {
    try {
      setShowLoader(true);
      await Auth.signOut();

      setError('');
      await AsyncStorage.clear(); // deleting all user data from current device
      Store.user.eject();
      Store.wallets.eject();
      Store.transactions.eject();
      Store.application.eject();

      await navigation.navigate(AUTHENTICATION, { screen: MAIN });
    } catch (e) {
      setError(e);
    }
    setShowLoader(false);
  };

  return (
    <View style={{
      backgroundColor: colors.white,
      height: '100%',
    }}
    >
      <View style={smallHeader}>
        <AccountLeftBackground style={styles.accountLeftBackground} />
        <AccountRightBackground style={styles.accountRightBackground} />
        <Text allowFontScaling={false} style={styles.name}>
          {`${Store.user.givenName || ''} ${Store.user.familyName || ''}`}
        </Text>
        <Text allowFontScaling={false} style={styles.email}>
          {Store.user.email || ''}
        </Text>
      </View>
      <View style={{
        ...accountPageBody,
        justifyContent: 'space-between',
        flex: 1,
      }}
      >
        <View style={view}>
          <View style={view}>
            {showKYC ? (
              <TouchableWithoutFeedback
                onPress={() => {
                  if (Store.user.KYCProgress === 1) {
                    setShowKYCTypePicker(true);
                  } else navigation.navigate(KNOW_YOUR_CUSTOMER);
                }}
              >
                <View style={{ ...whiteButton, ...shadow }}>
                  <Text allowFontScaling={false} style={{ color: colors.black }}>KYC verification</Text>
                  <ArrowRightImage />
                </View>
              </TouchableWithoutFeedback>
            ) : null}
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(SETTINGS)}
            >
              <View style={{ ...whiteButton, ...shadow }}>
                <Text allowFontScaling={false} style={{ color: colors.black }}>Settings</Text>
                <ArrowRightImage />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => Linking.openURL(WEB)}>
              <View style={{ ...whiteButton, ...shadow }}>
                <Text allowFontScaling={false} style={{ color: colors.black }}>Terms & Conditions</Text>
                <ExternalLinkImage />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => Linking.openURL(WEB)}>
              <View style={{ ...whiteButton, ...shadow }}>
                <Text allowFontScaling={false} style={{ color: colors.black }}>Web Site</Text>
                <ExternalLinkImage />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={view}>
          <DefaultButton
            onPress={signOut}
            title="Log out"
            showLoader={showLoader}
          />
          <Indent height={10} />
          <TouchableWithoutFeedback
            onPress={() => Linking.openURL(`mailto:${EMAIL}`)}
          >
            <View>
              <ContactSupportImage
                deviceWidth={DEVICE_WIDTH <= 360 ? 290 : 340}
              />
              <Text allowFontScaling={false} style={styles.contactSupportText}>
                Contact
                {'\n'}
                Support
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <Indent height={DEVICE_WIDTH <= 360 ? 23 : 65} />
        </View>
      </View>
      {showKYCTypePicker && (
      <Modal header="Select Account type" close={() => setShowKYCTypePicker(false)}>
        <Score
          onPress={() => goToKYC('natural_person')}
          text="Personal Account"
        />
        <Score
          onPress={() => goToKYC('company')}
          text="Company Account"
        />
        <DefaultButton title="Close" onPress={() => setShowKYCTypePicker(false)} />
        <Indent height={20} />
      </Modal>
      )}
      <Notification notification={error} />
    </View>
  );
});

observer.propTypes = {
  Component: PropTypes.element,
};
