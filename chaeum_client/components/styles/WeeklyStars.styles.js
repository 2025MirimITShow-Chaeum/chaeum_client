import React from "react";
import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginVertical: 16,
  },
  column: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  star: {
    width: 43,
    height: 44,
    marginVertical: 4,
    resizeMode: 'contain',
  },
  dateText: {
    fontSize: 12,
    color: '#000',
  },
});