import React, { useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { observer } from 'mobx-react-lite';

import Modal from '../Modal/Modal';
import Score from '../Score/Score';

import DepositImage from '../../../assets/svgs/Deposit';
import WithdrawImage from '../../../assets/svgs/Withdraw';
import TransferImage from '../../../assets/svgs/Transfer';
import RepayImage from '../../../assets/svgs/Repay';
import { view } from '../../../styles/mixins';

export default observer(
  ({
    closeModal,
    initialReducer = {
      withdrawFilter: false,
      repayFilter: false,
      transferFilter: false,
      depositFilter: false,
      all: true,
      counter: 0,
    },
    setInitialReducer,
  }) => {
    const transactionReducer = useCallback((state, action) => {
      // reducer for transaction type filter
      const all = {
        withdrawFilter: false,
        repayFilter: false,
        transferFilter: false,
        depositFilter: false,
        all: true,
        counter: 0,
      };
      let newState;

      switch (action.type) {
        case 'withdraw':
          newState = !state.withdrawFilter && state.repayFilter && state.transferFilter && state.depositFilter
            ? all
            : {
              ...state,
              withdrawFilter: !state.withdrawFilter,
              all: false,
              counter:
                    !state.withdrawFilter
                    + state.repayFilter
                    + state.transferFilter
                    + state.depositFilter,
            };
          setInitialReducer(newState);
          return newState;

        case 'repay':
          newState = !state.repayFilter && state.withdrawFilter && state.transferFilter && state.depositFilter
            ? all
            : {
              ...state,
              repayFilter: !state.repayFilter,
              all: false,
              counter:
                    !state.repayFilter
                    + state.withdrawFilter
                    + state.transferFilter
                    + state.depositFilter,
            };
          setInitialReducer(newState);
          return newState;

        case 'transfer':
          newState = !state.transferFilter && state.withdrawFilter && state.repayFilter && state.depositFilter
            ? all
            : {
              ...state,
              transferFilter: !state.transferFilter,
              all: false,
              counter:
                    !state.transferFilter
                    + state.withdrawFilter
                    + state.repayFilter
                    + state.depositFilter,
            };
          setInitialReducer(newState);
          return newState;

        case 'deposit':
          newState = !state.depositFilter && state.withdrawFilter && state.repayFilter && state.transferFilter
            ? all
            : {
              ...state,
              depositFilter: !state.depositFilter,
              all: false,
              counter:
                    !state.depositFilter
                    + state.withdrawFilter
                    + state.repayFilter
                    + state.transferFilter,
            };
          setInitialReducer(newState);
          return newState;

        case 'all':
          setInitialReducer(all);
          return all;

        default:
          return state;
      }
    }, []);

    const [
      { withdrawFilter, repayFilter, transferFilter, depositFilter, all },
      dispatchTransaction,
    ] = useReducer(transactionReducer, initialReducer, (state) => state);

    return (
      <Modal close={closeModal} header="Select Transactions type">
        <View style={view}>
          <Score
            text="All Types"
            onPress={() => dispatchTransaction({ type: 'all' })}
            isSelected={all}
          />
          <Score
            text="Withdraw"
            image={<WithdrawImage />}
            onPress={() => dispatchTransaction({ type: 'withdraw' })}
            isSelected={withdrawFilter && !all}
          />
          <Score
            text="Repay Credit"
            image={<RepayImage />}
            onPress={() => dispatchTransaction({ type: 'repay' })}
            isSelected={repayFilter && !all}
          />
          <Score
            text="Transfer"
            image={<TransferImage />}
            onPress={() => dispatchTransaction({ type: 'transfer' })}
            isSelected={transferFilter && !all}
          />
          <Score
            text="Deposit"
            image={<DepositImage />}
            onPress={() => dispatchTransaction({ type: 'deposit' })}
            isSelected={depositFilter && !all}
          />
        </View>
      </Modal>
    );
  },
);

observer.propTypes = {
  Component: PropTypes.element,
};
