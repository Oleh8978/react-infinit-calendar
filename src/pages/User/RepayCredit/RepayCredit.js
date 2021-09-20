import React, { useEffect, useState } from 'react';
import {
  View, Text, SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { openLink } from 'react-native-plaid-link-sdk';

import createPlaidToken from '../../../../services/createPlaidToken';
import getPlaidAccounts from '../../../../services/getPlaidAccounts';
import repayCredit from '../../../../services/repayCredit';

import Store from '../../../store';

import statusBar from '../../../../utilities/statusBar';
import amountFormatter from '../../../../utilities/formatters/amountFormatter';

import KeyboardNormalizer from '../../../HOCs/KeyboardNormalizerScrolling';
import FormInput from '../../../components/FormInput/FormInput';
import Header from '../../../components/Header/Header';
import EMLogoHeader from '../../../components/EMLogoHeader/EMLogoHeader';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Indent from '../../../components/Indent/Indent';
import Notification from '../../../components/Notification/Notification';
import Number from '../../../components/Number/Number';
import Coin from '../../../components/Coin/Coin';
import Picker from '../../../components/Picker/Picker';

import {
  formWrapper as wrapper,
  inputCurrency,
  greyFormInput,
  view,
  smallHeader,
  blockHeader,
  block,
  flexRow,
} from '../../../../styles/mixins';
import styles from './RepayCredit.styles';
import colors from '../../../../styles/colors';

export default KeyboardNormalizer(
  observer(({ navigation }) => {
    useFocusEffect(() => statusBar('dark'));

    const [plaidToken, setPlaidToken] = useState('');
    const [amount, setAmount] = useState('');
    const [showBankAccountPicker, setShowBankAccountPicker] = useState(false);
    const [bankAccountsList, setBankAccountsList] = useState([]);
    const [accountID, setAccountID] = useState('');
    const [plaidPublicToken, setPlaidPublicToken] = useState('');

    const [showLoader, setShowLoader] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
      const parent = navigation.dangerouslyGetParent();
      parent.setOptions({
        tabBarVisible: false,
      });

      (async () => {
        try {
          setPlaidToken((await createPlaidToken()).token);
        } catch (e) {
          setError(e);
        }
      })();

      return () => parent.setOptions({
        tabBarVisible: true,
      });
    }, []);

    const onRepay = async (values, { resetForm }) => {
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
              setError(e.message);
            }
          },
        });
      } catch (e) {
        setError(e);
      }
      setShowLoader(false);
      resetForm();
    };

    const endRepay = async () => {
      try {
        setShowBankAccountPicker(false);
        await repayCredit(accountID, plaidPublicToken, amount);
        await Store.wallets.updateAllData();
        await Store.transactions.updatePayments();
        setAmount('');
      } catch (e) {
        setError(e);
      }
    };

    return (
      <>
        <Formik
          initialValues={{
            amount: '',
          }}
          validateOnBlur
          onSubmit={onRepay}
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
                  <Header navigation={navigation} topText="Repay Credit" />
                </View>
                <SafeAreaView style={{ flex: 1 }}>
                  <View
                    style={{
                      ...wrapper,
                      justifyContent: 'space-between',
                      paddingTop: 20,
                      height: '100%',
                    }}
                  >
                    <View style={view}>
                      <View
                        style={{
                          ...block,
                          position: 'relative',
                          top: -40,
                          marginBottom: -10,
                        }}
                      >
                        <View style={blockHeader}>
                          <View style={flexRow}>
                            <Text allowFontScaling={false}>
                              <Text
                                allowFontScaling={false}
                                style={
                                  {
                                    fontFamily: 'OpenSans-Bold',
                                    color: colors.black,
                                  }
                                }
                              >
                                To Credit Utilized
                              </Text>
                            </Text>
                            <Coin coin="USD" />
                          </View>
                        </View>
                        <View style={styles.subBlockHeader}>
                          <Number
                            style={styles.value}
                            digit={Store.wallets.totalUtilized || ''}
                            type="usd"
                          />
                          <Text allowFontScaling={false} style={styles.value}>{' USD'}</Text>
                        </View>
                      </View>
                      <View style={view}>
                        <View style={styles.textLeft}>
                          <View style={styles.textLeft}>
                            <Text allowFontScaling={false}>Amount</Text>
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
                              error={touched.amount && errors.amount && !amount}
                              style={{ ...greyFormInput, paddingRight: 45 }}
                            />
                            <Text allowFontScaling={false} style={inputCurrency}>USD</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View>
                      <DefaultButton
                        title="Repay Credit"
                        onPress={handleSubmit}
                        disabled={
                          !(isValid && dirty)
                          || amount > +Store.wallets.totalUtilized
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
                </SafeAreaView>
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
            select={endRepay}
          />
        )}
        <Notification notification={error} close={() => setError('')} />
      </>
    );
  }),
);
