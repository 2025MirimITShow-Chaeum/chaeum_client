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
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  week: {
    position: 'absolute',
    left: '27%',
  },
  weekImg: {
    width: 160,
    resizeMode: 'contain',
  },

  groupContainer: {
    position: 'absolute',
    alignItems: 'center'
  },
  first: {
    bottom: -240,
    left: -40,
    zIndex: 3,
  },
  second: {
    bottom: -220,
    right: 18,
  },
  third: {
    bottom: -220,
    left: 18,
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
    right: '33',
  },
  threeText: {
    left: '33',
  },
  trophyImg: {
    height: 350,
    resizeMode: 'contain',
  },
  one: {
    height: 405,
    resizeMode: 'contain',
  },

  toggle: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 30,
  },
  activeTab: {
    fontFamily: fonts.semibold,
    color: COLORS.charcoal,
  },
  inactiveTab: {
    fontFamily: fonts.semibold,
    color: COLORS.deactivate,
  },
  groupItem: {
    fontSize: 16,
    marginVertical: 4,
  },
  underline: {
    marginTop: 4,
    height: 3,
    width: 52,
    backgroundColor: COLORS.mainColor,
  },

  rankList: {
    marginTop: 30,
  },
  groupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  ranking: {
    width: 40,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: fonts.semibold,
    color: COLORS.mainColor,
  },
  groupItem: {
    width: 275,
    textAlign: 'left',
    fontSize: 16,
    color: COLORS.charcoal,
    paddingLeft: 30,
  },
  attendance: {
    width: 13,
    resizeMode: 'contain',
  },
  attendanceText: {
    width: 25,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.semibold,
    color: COLORS.charcoal,
  },
});