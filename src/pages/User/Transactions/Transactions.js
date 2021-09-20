import React, {
  useCallback, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import LinearGradient from 'react-native-linear-gradient';

import statusBar from '../../../../utilities/statusBar';
import { getDate, getShortDate } from '../../../../utilities/formatters/timeFormatter';
import transactionColor from '../../../../utilities/transactionColor';
import sendTransactionSCV from '../../../../services/sendTransactionSCV';

import Store from '../../../store';

import { TRANSACTION_DETAILS } from '../../../../constants/navigation/userScreens';

import Header from '../../../components/Header/Header';
import Indent from '../../../components/Indent/Indent';
import CalendarModal from '../../../components/CalendarModal/CalendarModal';
import TransactionImage from '../../../components/TransactionImage/TransactionImage';
import TransactionTypeModal from '../../../components/TransactionTypeModal/TransactionTypeModal';
import CoinsTypeFilter from '../../../components/CoinsTypeFilter/CoinsTypeFilter';

import ActiveFilterImage from '../../../../assets/svgs/ActiveFilter';
import CloseImage from '../../../../assets/svgs/Close';
import ChevronBottomWhiteImage from '../../../../assets/svgs/ChevronBottomWhite';
import ChevronBottomBlue from '../../../../assets/svgs/ChevronBottomBlue';

import {
  accPageWrapper as wrapper, flexRow, view,
} from '../../../../styles/mixins';
import colors from '../../../../styles/colors';
import styles from './Transactions.styles';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Notification from '../../../components/Notification/Notification';

export default observer(({
  navigation,
  route,
}) => {
  useFocusEffect(() => {
    statusBar('light');
    if (route.name === 'TRANSACTIONS') {
      StatusBar.setBarStyle('dark-content');
    }
  });

  const [refreshing, setRefreshing] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState('');

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const [filtersIsOpen, setFiltersIsOpen] = useState(false);
  const [filterModal, setFilterModal] = useState('');

  const [dateFilter, setDateFilter] = useState([]);
  const [calendarState, setCalendarState] = useState({ startDatePeriod: '' });
  const initialCoinsFilter = {
    BTCFilter: false,
    ETHFilter: false,
    allCoins: true,
    coinsCounter: 0,
  };

  const initTransactionTypeFilter = {
    withdrawFilter: false,
    repayFilter: false,
    transferFilter: false,
    depositFilter: false,
    all: true,
    counter: 0,
  };
  const [transactionTypeFilter, setTransactionType] = useState(
    initTransactionTypeFilter,
  );
  const [coinsFilter, setCoinsFilter] = useState(initialCoinsFilter);
  const {
    BTCFilter,
    ETHFilter,
    allCoins,
    coinsCounter,
  } = coinsFilter;
  const {
    withdrawFilter,
    repayFilter,
    transferFilter,
    depositFilter,
    counter,
  } = transactionTypeFilter;

  const sendSCV = async () => {
    try {
      setShowLoader(true);
      await sendTransactionSCV();
    } catch (e) {
      setError(e);
    }
    setShowLoader(false);
  };

  const clearAll = () => {
    setDateFilter([]);
    setCalendarState({ startDatePeriod: '' });
    setTransactionType(initTransactionTypeFilter);
    setCoinsFilter(initialCoinsFilter);
  };

  useEffect(() => { // set transactions list
    const {
      withdraws,
      repays,
      transfers,
      deposits,
    } = Store.transactions.getTransactions();
    setTransactions([...withdraws, ...repays, ...transfers, ...deposits]
      .sort((transaction, prev) => new Date(prev.created) - new Date(transaction.created)));
  }, [
    Store.transactions.transactions.withdraws,
    Store.transactions.transactions.repays,
    Store.transactions.transactions.transfers,
    Store.transactions.transactions.deposits,
  ]);

  useEffect(() => { // filter transactions list
    const {
      withdraws,
      repays,
      transfers,
      deposits,
    } = Store.transactions.getTransactions();

    if (
      (withdrawFilter && repayFilter && transferFilter && depositFilter && BTCFilter && ETHFilter)
      || (!withdrawFilter && !repayFilter && !transferFilter && !depositFilter && !BTCFilter && !ETHFilter)
    ) {
      if (dateFilter.length) {
        return setFilteredTransactions(
          transactions.filter((transaction) => dateFilter.some((date) => date === getShortDate(transaction.created))),
        );
      }
      return setFilteredTransactions(transactions);
    }

    let filtered = [];
    if (withdrawFilter) {
      filtered = [...filtered, ...withdraws];
    }
    if (repayFilter) {
      filtered = [...filtered, ...repays];
    }
    if (transferFilter) {
      filtered = [...filtered, ...transfers];
    }
    if (depositFilter) {
      filtered = [...filtered, ...deposits];
    }

    if (BTCFilter) {
      filtered = transactions.filter((item) => item.coin === 'BTC');
    }

    if (ETHFilter) {
      filtered = transactions.filter((item) => item.coin === 'ETH');
    }

    if (dateFilter.length) {
      filtered = filtered.filter((transaction) => dateFilter.some((date) => date === getShortDate(transaction.created)));
    }
    return setFilteredTransactions(
      filtered.sort(
        (transaction, prev) => new Date(prev.created) - new Date(transaction.created),
      ),
    );
  }, [
    withdrawFilter,
    repayFilter,
    transferFilter,
    depositFilter,
    transactions,
    dateFilter,
    BTCFilter,
    ETHFilter,
    allCoins,
  ]);

  const refreshTransactionList = useCallback(async () => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);

  return (
    <>
      <SafeAreaView style={{
        ...wrapper,
        paddingHorizontal: 0,
      }}
      >
        <View style={styles.header}>
          <Header
            goBack={false}
            topText="All Transactions"
            bottomText={transactions.length ? '' : 'No transactions'}
            isLight={false}
          />
          <TouchableOpacity
            onPress={() => setFiltersIsOpen((prev) => !prev)}
            style={styles.filterImage}
          >
            {!!transactions.length
            && (filtersIsOpen ? <CloseImage /> : <ActiveFilterImage />)}
          </TouchableOpacity>
          {filtersIsOpen && (
            <>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filtersWrapper}>
                  {!!(counter && dateFilter.length) && (
                    <TouchableOpacity
                      style={{
                        ...styles.filter,
                        width: 90,
                        marginRight: -10,
                        backgroundColor: colors.white,
                      }}
                      onPress={clearAll}
                    >
                      <Text allowFontScaling={false} style={styles.filterText}>Clear All</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={{
                      ...styles.filter,
                      width: counter ? 175 : 152,
                      backgroundColor: counter
                        ? colors.purple
                        : colors.greyLight,
                    }}
                    onPress={() => setFilterModal('transactionType')}
                  >
                    {!!counter && (
                      <View style={styles.filterCounter}>
                        <Text allowFontScaling={false} style={{ color: colors.white }}>{counter}</Text>
                      </View>
                    )}
                    <Text
                      allowFontScaling={false}
                      style={{
                        ...styles.filterText,
                        color: counter ? colors.white : colors.purple,
                      }}
                    >
                      Transaction type
                    </Text>
                    {counter ? (
                      <ChevronBottomWhiteImage style={styles.chevronDown} />
                    ) : (
                      <ChevronBottomBlue style={styles.chevronDown} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      ...styles.filter,
                      backgroundColor: dateFilter.length
                        ? colors.purple
                        : colors.greyLight,
                    }}
                    onPress={() => setFilterModal('chooseDate')}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{
                        ...styles.filterText,
                        color: dateFilter.length ? colors.white : colors.purple,
                      }}
                    >
                      Choose date
                    </Text>
                    {dateFilter.length ? (
                      <ChevronBottomWhiteImage style={styles.chevronDown} />
                    ) : (
                      <ChevronBottomBlue style={styles.chevronDown} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      ...styles.filterCoins,
                      width: coinsCounter ? 135 : 112,
                      backgroundColor: coinsCounter
                        ? colors.purple
                        : colors.greyLight,
                    }}
                    onPress={() => setFilterModal('coinsFilter')}
                  >
                    {!!coinsCounter && (
                    <View style={styles.filterCounter}>
                      <Text allowFontScaling={false} style={{ color: colors.white }}>{coinsCounter}</Text>
                    </View>
                    )}
                    <Text
                      allowFontScaling={false}
                      style={{
                        ...styles.filterText,
                        color: coinsCounter ? colors.white : colors.purple,
                      }}
                    >
                      Coins type
                    </Text>
                    {coinsCounter ? (
                      <ChevronBottomWhiteImage style={styles.chevronDown} />
                    ) : (
                      <ChevronBottomBlue style={styles.chevronDown} />
                    )}
                  </TouchableOpacity>
                </View>
              </ScrollView>
              <LinearGradient
                start={{
                  x: 0,
                  y: 1,
                }}
                end={{
                  x: 1,
                  y: 1,
                }}
                locations={[0, 1]}
                colors={['rgba(247, 247, 247, 0)', '#F7F7F7']}
                style={styles.shadow}
              />
              <DefaultButton onPress={sendSCV} showLoader={showLoader} title="Send CSV to your e-mail" />
            </>
          )}
          {!transactions.length && <Indent height={10} />}
        </View>
        <View style={view}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              ...styles.transactionsWrapper,
              marginBottom: filtersIsOpen ? 47 : 0,
            }}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshTransactionList}
                tintColor={colors.purple}
              />
            )}
          >
            {filteredTransactions.map((transaction) => (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate(TRANSACTION_DETAILS, { transaction })}
                key={transaction.id}
              >
                <View style={styles.transaction}>
                  <View style={flexRow}>
                    <View style={styles.transactionValues}>
                      <TransactionImage type={transaction.type} />
                      <View style={{ marginLeft: 18 }}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            ...styles.boldText,
                            color: transactionColor(transaction.type),
                          }}
                        >
                          {`${transaction.coin || '$'} ${transaction.amount}`}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.transactionDate}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          ...styles.boldText,
                          color: transactionColor(transaction.type),
                        }}
                      >
                        {transaction.name}
                      </Text>
                      <Text allowFontScaling={false} style={{ color: colors.black }}>{getDate(transaction.created)}</Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
            <Indent height={Platform.OS === 'ios' ? 110 : 78} />
          </ScrollView>
        </View>
      </SafeAreaView>
      {filterModal === 'transactionType' && (
        <TransactionTypeModal
          closeModal={() => setFilterModal('')}
          initialReducer={transactionTypeFilter}
          setInitialReducer={setTransactionType}
        />
      )}
      {filterModal === 'chooseDate' && (
        <CalendarModal
          closeModal={() => setFilterModal('')}
          setDateFilter={setDateFilter}
          initialReducer={calendarState}
          setInitialReducer={setCalendarState}
        />
      )}
      {filterModal === 'coinsFilter' && (
      <CoinsTypeFilter
        closeModal={() => setFilterModal('')}
        initialReducer={coinsFilter}
        setInitialReducer={setCoinsFilter}
      />
      )}
      <Notification notification={error} close={() => setError('')} />
    </>
  );
});

observer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape(PropTypes.object),
};
