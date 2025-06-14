import React from "react";
import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 31,
  },
  rank: {
    backgroundColor: COLORS.mainColor,
    height: 380,
    overflow: 'hidden',
  },
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },
  week: {
    position: 'absolute',
    left: '38%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  weekText: {
    fontSize: 14,
    fontFamily: fonts.medium
  },

  groupContainer: {
    position: 'absolute',
    alignItems: 'center'
  },
  first: {
    bottom: -290,
    left: -15,
    zIndex: 3,
  },
  second: {
    bottom: -240,
    right: '20%',
  },
  third: {
    bottom: -240,
    left: '20%',
  },

  groupName: {
    backgroundColor: '#fff',

    borderRadius: 27,
    fontWeight: '600',
  },
  oneText: {
    left: -1,
    fontSize: 14,
    marginBottom: 18,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  Text: {
    fontSize: 11,
    marginBottom: 14,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  twoText: {
    right: '6%',
  },
  threeText: {
    left: '6%',
  },
  trophyImg: {
    height: 350,
    resizeMode: 'contain',
  },
  one: {
    height: 460,
    resizeMode: 'contain',
  },

  toggle: {
    flexDirection: 'row',
    gap: 15,
  }
});