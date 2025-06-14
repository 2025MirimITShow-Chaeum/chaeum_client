import React from "react";
import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 70,
    paddingLeft: 31,
    paddingBottom: 30,
  },
  groupButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 27,
  },
  groupText: {
    fontSize: 14,
    color: '#000',
  },
});
