import React from 'react';
import PropTypes from 'prop-types';

import DollarImage from '../../../assets/svgs/Dollar';
import BTCImage from '../../../assets/svgs/Btc';
import ETHImage from '../../../assets/svgs/Eth';

export default function Coin({ coin, isBig = false }) {
  const size = isBig ? 80 : 28;
  return (
    <>
      {coin === 'BTC' ? (
        <BTCImage width={size} height={size} />
      ) : coin === 'ETH' ? (
        <ETHImage width={size} height={size} />
      ) : (
        <DollarImage width={size} height={size} />
      )}
    </>
  );
}

Coin.propTypes = {
  isBig: PropTypes.bool,
  coin: PropTypes.string.isRequired,
};
