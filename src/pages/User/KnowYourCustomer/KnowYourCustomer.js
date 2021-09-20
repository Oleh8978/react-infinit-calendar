import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import Store from '../../../store';
import statusBar from '../../../../utilities/statusBar';

import {
  KNOW_YOUR_CUSTOMER,
  ACCOUNT,
} from '../../../../constants/navigation/userScreens';

import KeyboardNormalizer from '../../../HOCs/KeyboardNormalizerScrolling';
import Header from '../../../components/Header/Header';
import EMLogoHeader from '../../../components/EMLogoHeader/EMLogoHeader';
import Notification from '../../../components/Notification/Notification';
import KYCText from './KYCPages/KYCText';
import KYCScan from './KYCPages/KYCScan';
import KYCFinish from './KYCPages/KYCFinish';

import {
  smallHeader,
  formWrapper as body,
} from '../../../../styles/mixins';
import styles from './KnowYourCustomer.styles';

// TODO create logic: if PrimeTrust request more documents

function KnowYourCustomer({ navigation, route }) {
  useFocusEffect(() => statusBar('dark'));
  const [page, setPage] = useState(Store.user.KYCProgress);

  const [formErrors, setFormErrors] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setPage(page < route.params?.page ? route.params?.page : page);

    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    return () => parent.setOptions({
      tabBarVisible: true,
    });
  }, []);

  const deleteLastError = () => setFormErrors(formErrors.slice(0, formErrors.length - 1));

  const jumpToNextPage = async () => {
    await Store.user.setKYCProgress();
    setFormErrors([]);

    if (page < 3) {
      navigation.push(KNOW_YOUR_CUSTOMER, { page: page + 1 });
    } else navigation.navigate(ACCOUNT);
  };

  const addErrors = (errors) => setFormErrors([...formErrors, ...errors]);

  const pageContent = (_page = 1) => {
    switch (_page) {
      // Text information: Name, Date of Birth etc.
      case 1:
        return (
          <KYCText
            type={route?.params?.type}
            jumpToNextPage={jumpToNextPage}
            setFormErrors={addErrors}
            showLoader={showLoader}
            setShowLoader={setShowLoader}
          />
        );

        // Document Scan uploading
      case 2:
        return (
          <KYCScan
            jumpToNextPage={jumpToNextPage}
            setFormErrors={addErrors}
            showLoader={showLoader}
            setShowLoader={setShowLoader}
          />
        );

        // Finish
      case 3:
        return <KYCFinish jumpToNextPage={jumpToNextPage} />;

      default:
        return <Text allowFontScaling={false}>Something went wrong</Text>;
    }
  };

  return (
    <>
      <View style={smallHeader}>
        <EMLogoHeader />
        <Header
          topText={`${page}/KYC Verification`}
          navigation={navigation}
          goBackFunction={() => {
            if (!showLoader) {
              navigation.navigate(ACCOUNT);
            }
          }}
        />
        <View style={styles.progressBar}>
          {[0, 1, 2].map((value, i) => (i < page ? (
            <View
              style={{
                ...styles.progressValue,
                opacity: i + 1 === page ? 1 : 0.5,
              }}
              key={value}
            />
          ) : (
            <View key={value} />
          )))}
        </View>
      </View>
      <View style={body}>
        {pageContent(page)}
      </View>
      {formErrors.map((error) => <Notification notification={error} close={deleteLastError} key={error.id} />)}
    </>
  );
}

KnowYourCustomer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.object,
};

export default KeyboardNormalizer(observer(KnowYourCustomer));
