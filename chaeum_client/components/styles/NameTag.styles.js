import React from 'react';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  name: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: '#000',
  },
  plusIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 6,
  },
});