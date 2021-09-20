import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView, Text, View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { openLink } from 'react-native-plaid-link-sdk';

import { withdrawCreditAmountValidator } from '../../../../utilities/yupValidators';
import statusBar from '../../../../utilities/statusBar';

import createPlaidToken from '../../../../services/createPlaidToken';
import getPlaidAccounts from '../../../../services/getPlaidAccounts';
import Store from '../../../store';
import withdrawCredit from '../../../../services/withdrawCredit';
import amountFormatter from '../../../../utilities/formatters/amountFormatter';

import { MINIMUM_WITHDRAW_CREDIT } from '../../../../constants/constants';

import KeyboardNormalizer from '../../../HOCs/KeyboardNormalizerScrolling';
import FormInput from '../../../components/FormInput/FormInput';
import Header from '../../../components/Header/Header';
import EMLogoHeader from '../../../components/EMLogoHeader/EMLogoHeader';
import SmallValueBlock from '../../../components/SmallValueBlock/SmallValueBlock';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Indent from '../../../components/Indent/Indent';
import Notification from '../../../components/Notification/Notification';
import Picker from '../../../components/Picker/Picker';

import {
  accountPageBody,
  accPageWrapper as wrapper,
  flexRow,
  greyFormInput,
  inputCurrency,
  smallHeader,
  view,
} from '../../../../styles/mixins';
import colors from '../../../../styles/colors';

function WithdrawCredit({ navigation }) {
  useFocusEffect(() => statusBar('dark'));

  const [amount, setAmount] = useState('');
  const [plaidToken, setPlaidToken] = useState('');
  const [showBankAccountPicker, setShowBankAccountPicker] = useState(false);
  const [bankAccountsList, setBankAccountsList] = useState([]);
  const [accountID, setAccountID] = useState('');
  const [plaidPublicToken, setPlaidPublicToken] = useState('');

  const [formError, setFormError] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });

    (async () => {
      try {
        setPlaidToken((await createPlaidToken()).token);
      } catch (e) {
        setFormError(e);
      }
    })();

    return () => parent.setOptions({
      tabBarVisible: true,
    });
  }, []);

  const onWithDraw = async () => {
    try {
      setShowLoader(true);

      await openLink({
        tokenConfig: { token: plaidToken },
        onSuccess: async ({ publicToken }) => {
          try {
            const accounts = (await getPlaidAccounts(publicToken))?.map(
              (account) => ({
                name: account.name,
                value: account.account_id,
              }),
            );
            setBankAccountsList(accounts);
            setAccountID(accounts[0].value);
            setShowBankAccountPicker(true);
            setPlaidPublicToken(publicToken);
          } catch (e) {
            setFormError(e.message);
          }
        },
      });
    } catch (e) {
      setFormError(e);
    }
    setShowLoader(false);
  };

  const endWithDraw = async () => {
    try {
      setShowLoader(true);
      setShowBankAccountPicker(false);
      await withdrawCredit(accountID, plaidPublicToken, amount);
      await Store.wallets.updateAllData();
      await Store.application.addNotification('Credit Funds Withdrawn');
      setFormError('');
    } catch (e) {
      setFormError(e);
    }
    setShowLoader(false);
  };

  return (
    <>
      <Formik
        validationSchema={yup.object().shape({
          amount: withdrawCreditAmountValidator,
        })}
        initialValues={{
          amount: '',
        }}
        onSubmit={onWithDraw}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
          dirty,
        }) => (
          <>
            <View style={{ height: '100%' }}>
              <View style={smallHeader}>
                <EMLogoHeader />
                <Header
                  navigation={navigation}
                  topText="Withdraw Credit"
                  bottomText="ACH Transfer"
                  leftPadding
                />
              </View>
              <View
                style={{
                  ...accountPageBody,
                  ...flexRow,
                  paddingHorizontal: '5%',
                  marginBottom: -27,
                }}
              >
                <SmallValueBlock
                  name="Line of Credit"
                  isActive
                  value={Store.wallets.lineOfCredit}
                />
                <SmallValueBlock
                  name="Available Line of Credit"
                  isActive
                  value={Store.wallets.totalAvailable}
                />
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ ...wrapper, justifyContent: 'space-between' }}>
                  <View style={view}>
                    <View style={{ width: '100%' }}>
                      <Indent height={10} />
                      <View style={{ width: '100%' }}>
                        <Indent height={10} />
                        <Text allowFontScaling={false} style={{ color: colors.black }}>
                          Amount
                        </Text>
                      </View>
                      <View>
                        <FormInput
                          keyboardType="numeric"
                          set={(_amount) => {
                            setAmount(amountFormatter(
                              _amount,
                              handleChange('amount'),
                              2,
                            ));
                          }}
                          onBlur={handleBlur('amount')}
                          value={values.amount}
                          error={touched.amount && errors.amount}
                          style={{ ...greyFormInput, paddingRight: 45 }}
                        />
                        <Text allowFontScaling={false} style={inputCurrency}>USD</Text>
                      </View>
                      <Indent height={25} />
                    </View>
                  </View>
                  <View>
                    <DefaultButton
                      title="Withdraw Credit"
                      onPress={handleSubmit}
                      disabled={
                        !(
                          isValid
                          && dirty
                          && +values.amount >= MINIMUM_WITHDRAW_CREDIT
                        )
                      }
                      showLoader={showLoader}
                    />
                    <Indent height={10} />
                    <DefaultButton
                      onPress={() => navigation.goBack()}
                      title="Cancel"
                      isLight
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          </>
        )}
      </Formik>
      {showBankAccountPicker && (
        <Picker
          close={() => setShowBankAccountPicker(false)}
          list={bankAccountsList}
          value={accountID}
          onValueChange={setAccountID}
          select={endWithDraw}
        />
      )}
      <Notification notification={formError} close={() => setFormError('')} />
    </>
  );
}
WithdrawCredit.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default KeyboardNormalizer(WithdrawCredit);
