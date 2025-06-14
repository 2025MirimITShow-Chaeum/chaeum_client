import React from "react";
import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 31,
  },
  today: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  text: {
    fontSize: 17,
    fontFamily: fonts.semibold,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Box: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: COLORS.line,
    borderRadius: 13,
    paddingHorizontal: 23,
    paddingVertical: 16,
  },
  image: {
    width: 15,
    height: 20,
    resizeMode: 'contain',
  },
  rankText: {
    fontSize: 15,
    fontFamily: fonts.semibold,
  },
  code: {
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  memberBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
    paddingLeft: 31,
  },
  count: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    lineHeight: 22,
    textAlign: 'left',
  },
  line: {
    borderWidth: 0.5,
    borderColor: COLORS.line,
    marginVertical: 15,
  }
});