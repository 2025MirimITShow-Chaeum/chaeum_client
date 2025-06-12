import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  TodoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconContainer: {
    position: 'relative',
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    left: 7,
  },
  title: {
    fontSize: 15,
    fontFamily: fonts.regular,
  },
  heart: {
    width: 14,
    height: 14,
  }
});