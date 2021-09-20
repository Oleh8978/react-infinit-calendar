import React, {
  useEffect, useState, useCallback, useReducer,
} from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import { CalendarList } from 'react-native-calendars';

import {
  getShortDate,
  getDaysArray,
  getMonthAndYear,
} from '../../../utilities/formatters/timeFormatter';
import Store from '../../store';

import { APPLICATION_DATE, DEVICE_HEIGHT } from '../../../constants/constants';

import Modal from '../Modal/Modal';
import DefaultButton from '../DefaultButton/DefaultButton';
import { flexRow } from '../../../styles/mixins';
import colors from '../../../styles/colors';
import styles from './CalendarModal.styles';
import Loader from '../Loader/Loader';
import Indent from '../Indent/Indent';

export default observer(
  ({
    closeModal,
    setDateFilter,
    initialReducer = { startDatePeriod: '' },
    setInitialReducer,
  }) => {
    const dateReducer = useCallback((state, action) => {
      // reducer for date filter
      const period = {};
      const setPeriod = (day1, day2) => {
        getDaysArray(new Date(day1), new Date(day2)).forEach((date) => {
          period[date] = {
            color: colors.purpleLightOpacity,
            textColor: colors.black,
          };
        });
        return period;
      };

      if (action.payload === 'clear') {
        // delete all marks
        const newState = { startDatePeriod: '' };

        setInitialReducer(newState);
        return newState;
      }

      if (state.startDatePeriod === action.dateString) {
        period.startDatePeriod = '';
      } else if (
        Object.prototype.hasOwnProperty.call(state, action.dateString)
      ) {
        // if pick previous picked date nothing changes
        return state;
      }

      if (!state.startDatePeriod) {
        const newState = {
          ...state,
          ...period,
          [action.dateString]: {
            color: colors.purple,
            startingDay: true,
            endingDay: true,
            textColor: colors.white,
          },
          startDatePeriod: action.dateString,
        };

        setInitialReducer(newState);
        return newState;
      }

      const sortedBorders = [state.startDatePeriod, action.dateString].sort();

      const startDate = new Date(sortedBorders[0]);
      const endDate = new Date(sortedBorders[1]);

      // here we pick day before and day after picked period
      const dayBefore = getShortDate(
        new Date(startDate).setDate(startDate.getDate() - 1),
      );
      const nextDay = getShortDate(
        new Date(endDate).setDate(endDate.getDate() + 1),
      );

      let markStart = dayBefore;
      let markEnd = nextDay;

      if (Object.prototype.hasOwnProperty.call(state, dayBefore)) {
        // merge to nearby periods
        const pivotDate = new Date(markStart);
        while (
          Object.prototype.hasOwnProperty.call(
            state,
            getShortDate(pivotDate.setDate(pivotDate.getDate() - 1)),
          )
        ) {
          markStart = getShortDate(pivotDate);
        }
      } else {
        markStart = getShortDate(startDate);
      }

      if (Object.prototype.hasOwnProperty.call(state, nextDay)) {
        // merge to nearby periods
        const pivotDate = new Date(markEnd);
        while (
          Object.prototype.hasOwnProperty.call(
            state,
            getShortDate(pivotDate.setDate(pivotDate.getDate() + 1)),
          )
        ) {
          markEnd = getShortDate(pivotDate);
        }
      } else {
        markEnd = getShortDate(endDate);
      }

      const newState = {
        ...state,
        ...setPeriod(markStart, markEnd),
        [markStart]: {
          color: colors.purple,
          startingDay: true,
          textColor: colors.white,
        },
        [markEnd]: {
          color: colors.purple,
          startingDay: markStart === markEnd,
          endingDay: true,
          textColor: colors.white,
        },
        startDatePeriod: '',
      };

      setInitialReducer(newState);
      return newState;
    }, []);

    const [markedDates, dispatchDate] = useReducer(
      dateReducer,
      initialReducer,
      (state) => state,
    );
    const [pastScrollRange, setPastScrollRange] = useState(12);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
      const today = new Date();

      setPastScrollRange(
        today.getMonth()
          - APPLICATION_DATE.getMonth()
          + 12 * (today.getFullYear() - APPLICATION_DATE.getFullYear()),
      );
      setShowLoader(false);
    }, []);

    const applyDates = () => {
      const dates = [];
      for (const key in markedDates) {
        if (
          Object.prototype.hasOwnProperty.call(markedDates, key)
          && key !== 'startDatePeriod'
        ) {
          dates.push(key);
        }
      }
      setDateFilter(dates);
      closeModal();
    };

    const clearDates = () => {
      dispatchDate({ payload: 'clear' });
      setDateFilter([]);
      closeModal();
    };

    return (
      <Modal close={closeModal} header="Choose Date Range">
        <View style={styles.weekWrapper}>
          <Text allowFontScaling={false} style={styles.weekDayName}>S</Text>
          <Text allowFontScaling={false} style={styles.weekDayName}>M</Text>
          <Text allowFontScaling={false} style={styles.weekDayName}>T</Text>
          <Text allowFontScaling={false} style={styles.weekDayName}>W</Text>
          <Text allowFontScaling={false} style={styles.weekDayName}>T</Text>
          <Text allowFontScaling={false} style={styles.weekDayName}>F</Text>
          <Text allowFontScaling={false} style={styles.weekDayName}>S</Text>
        </View>
        <View style={{ height: DEVICE_HEIGHT > 800 ? '82%' : '75%' }}>
          {showLoader ? (
            <View
              style={{
                height: '100%',
                position: 'absolute',
                backgroundColor: colors.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Loader color={colors.purple} isAbsolute size="large" />
            </View>
          ) : (
            <CalendarList
              firstDay={7}
              style={{ paddingTop: 44 }}
              renderHeader={(date) => (
                <View style={styles.calendarHeader}>
                  <View style={styles.hr} />
                  <Text allowFontScaling={false} style={{ fontSize: 16 }}>{getMonthAndYear(date)}</Text>
                </View>
              )}
              onDayPress={dispatchDate}
              markedDates={markedDates}
              markingType="period"
              minDate={getShortDate(Store.user.registered)}
              maxDate={new Date()}
              pastScrollRange={pastScrollRange} // until 01-01-2021
              futureScrollRange={0} // don`t allow scroll in future
              theme={{
                textDayFontFamily: 'OpenSans-Regular',
                textMonthFontFamily: 'OpenSans-SemiBold',
                textDayFontSize: 14,
                textMonthFontSize: 16,
              }}
              hideDayNames
            />
          )}
        </View>
        <View style={flexRow}>
          <DefaultButton
            title="Clear Selected"
            onPress={clearDates}
            isSmall
            isLight
          />
          <DefaultButton title="Apply" onPress={applyDates} isSmall />
        </View>
        <Indent height={15} />
      </Modal>
    );
  },
);

observer.propTypes = {
  Component: PropTypes.element,
};
