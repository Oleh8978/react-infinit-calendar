import React, { useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { observer } from 'mobx-react-lite';

import Modal from '../Modal/Modal';
import Score from '../Score/Score';

import ETH from '../../../assets/svgs/Eth';
import BTC from '../../../assets/svgs/Btc';

import { view } from '../../../styles/mixins';

export default observer(
  ({
    closeModal,
    initialReducer = {
      BTCFilter: false,
      ETHFilter: false,
      allCoins: true,
      coinsCounter: 0,
    },
    setInitialReducer,
  }) => {
    const coinsReducer = useCallback((state, action) => {
      // reducer for coins  type filter
      const allCoins = {
        BTCFilter: false,
        ETHFilter: false,
        allCoins: true,
        coinsCounter: 0,
      };
      let newState;

      switch (action.type) {
        case 'BTC':
          newState = !state.BTCFilter && state.ETHFilter
            ? allCoins
            : {
              ...state,
              BTCFilter: !state.BTCFilter,
              allCoins: false,
              coinsCounter:
                    !state.BTCFilter
                  + state.ETHFilter,
            };
          setInitialReducer(newState);
          return newState;

        case 'ETH':
          newState = !state.ETHFilter && state.BTCFilter
            ? allCoins
            : {
              ...state,
              ETHFilter: !state.ETHFilter,
              allCoins: false,
              coinsCounter:
                    !state.ETHFilter
                    + state.BTCFilter,
            };
          setInitialReducer(newState);
          return newState;
        case 'ALL':
          setInitialReducer(allCoins);
          return allCoins;

        default:
          return state;
      }
    }, []);

    const [
      { BTCFilter, ETHFilter, allCoins },
      dispatchTransaction,
    ] = useReducer(coinsReducer, initialReducer, (state) => state);

    return (
      <Modal close={closeModal} header="Select type of coin">
        <View style={view}>
          <Score
            text="All type of coins"
            onPress={() => dispatchTransaction({ type: 'ALL' })}
            isSelected={allCoins}
          />
          <Score
            text="BTC"
            image={<BTC />}
            onPress={() => dispatchTransaction({ type: 'BTC' })}
            isSelected={BTCFilter && !allCoins}
          />
          <Score
            text="ETH"
            image={<ETH />}
            onPress={() => dispatchTransaction({ type: 'ETH' })}
            isSelected={ETHFilter && !allCoins}
          />
        </View>
      </Modal>
    );
  },
);

observer.propTypes = {
  Component: PropTypes.element,
};
