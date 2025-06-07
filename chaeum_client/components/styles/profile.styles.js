import React from "react";
import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  container: {
    //backgroundColor: COLORS.mint,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',    
  },

  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius : 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.mainColor,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  profile: {
    marginLeft: 16,
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.semibold,
    color: '#000',
    marginBottom: 2,
  },
  slogan: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: '#000',
  },

  reactions: {

  },
  reaction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionText: {
    fontSize: 12,
    fontFamily: fonts.semibold,
    color: COLORS.charcoal,
    marginLeft: 9,
  },
});