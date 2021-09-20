import { Platform, StatusBar } from 'react-native';
import colors from '../styles/colors';

export default (background) => {
  StatusBar.setBarStyle(
    background === 'light' ? 'dark-content' : 'light-content',
  );
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(
      background === 'light' ? colors.white : colors.purple,
    );
  }
};
