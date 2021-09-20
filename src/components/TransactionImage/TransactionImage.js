import React from 'react';
import PropTypes from 'prop-types';

import DepositImageWhite from '../../../assets/svgs/DepositWhite';
import DepositImage from '../../../assets/svgs/Deposit';
import WithdrawImageWhite from '../../../assets/svgs/WithdrawWhite';
import WithdrawImage from '../../../assets/svgs/Withdraw';
import TransferImageWhite from '../../../assets/svgs/TransferWhite';
import TransferImage from '../../../assets/svgs/Transfer';
import RepayImageWhite from '../../../assets/svgs/RepayWhite';
import RepayImage from '../../../assets/svgs/Repay';

export default Object.assign(({ type, isWhite = false }) => {
  const Deposit = isWhite ? DepositImageWhite : DepositImage;
  const Withdraw = isWhite ? WithdrawImageWhite : WithdrawImage;
  const Transfer = isWhite ? TransferImageWhite : TransferImage;
  const Repay = isWhite ? RepayImageWhite : RepayImage;

  switch (type) {
    case 'deposits':
      return <Deposit />;
    case 'withdraws':
      return <Withdraw />;
    case 'transfers':
      return <Transfer />;
    case 'repays':
      return <Repay />;
    default:
      return <></>;
  }
},
{ propTypes: {
  type: PropTypes.string,
  isWhite: PropTypes.bool,
} });
