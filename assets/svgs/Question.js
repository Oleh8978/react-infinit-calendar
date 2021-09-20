import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Alert, TouchableOpacity } from 'react-native';

function Question(props) {
  const alertMessage = () => {
    switch (props.message) {
      case 'WithdrawCredit':
        return Alert.alert(
          '',
          'Line of Credit - is a preset limit, equal to 50% of the amount on Credit Line Wallet, recalculated according to the current exchange rate for collateral cryptocurrency. \n'
                    + '\nAvailable Line of Credit - is an amount, that can be withdrawn at any time, equal to the amount on Line of Credit minus amount of Credit Utilized.\n'
                    + 'Credit Utilized - is an amount of credit funds that were withdrawn. ',
          [
            {
              text: 'Close',
              style: 'default',
            },
          ],
          { cancelable: false },
        );
      case 'DepositFunds':
        return Alert.alert(
          '',
          'Saving Wallet - is a wallet that stores user\'s own deposited crypto-funds. The displayed amount is an estimated sum calculated according to the current exchange rate for cryptocurrency. \n'
                    + '\nCredit Line Wallet - is a custodial wallet that stores user\'s transferred collateral crypto-funds. The displayed amount is an estimated sum calculated according to the current exchange rate for collateral cryptocurrency.',
          [
            {
              text: 'Close',
              style: 'default',
            },
          ],
          { cancelable: false },
        );
      default:
        return Alert.alert('No data');
    }
  };
  return (
    <TouchableOpacity
      style={{ padding: 20 }}
      onPress={() => alertMessage()}
    >
      <Svg
        width={6}
        height={10}
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M6 3.038C6 5.03 3.47 5.95 3.163 6.028c-.077.077-.153.077-.23.077a.736.736 0 01-.69-.537c-.154-.383.076-.843.46-.997.46-.153 1.763-.766 1.763-1.61 0-.69-.383-1.227-.996-1.457-.767-.307-1.687.154-1.994.92-.153.384-.613.614-.997.46-.383 0-.537-.46-.46-.843A2.985 2.985 0 013.93.2 2.969 2.969 0 016 3.038zM3.546 7.868s-.076-.076-.153-.076-.077-.077-.153-.077c-.077 0-.077 0-.154-.077-.153 0-.306 0-.46.077-.076 0-.153.077-.23.153-.077.077-.153.154-.153.23 0 .077-.077.154-.077.307 0 .23.077.384.23.537.154.153.307.23.537.23.23 0 .383-.077.537-.23a.696.696 0 00.23-.537c0-.076 0-.23-.077-.307.077-.076 0-.153-.077-.23z"
          fill="#7843C5"
        />
      </Svg>
    </TouchableOpacity>
  );
}

export default Question;
