import { StyleSheet } from "react-native";
import { COLORS } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  LogoBox: {
    position: 'absolute',
    top: 87,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  Logo: {
    width: 328,
    height: 175,
    resizeMode: 'contain',
  },

  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 125,
    marginLeft: 8,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
    marginBottom: 2,
  },
  slogan: {
    fontSize: 12,
    fontFamily: fonts.regular,
  },

  reactionBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 23,
    zIndex: 2,
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 0.5,
    borderColor: COLORS.line,
    borderRadius: 12,
    paddingHorizontal: 25,
    paddingVertical: 14,

    gap: 9,
    backgroundColor: '#fff',
  },
  reactionImg: {
    height: 16,
    resizeMode: 'contain',
  },
  reactionText: {
    fontSize: 14,
    fontFamily: fonts.semibold,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#f1f1f1',
    borderRadius: 21.6,
    fontSize: 12,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: 328,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: COLORS.line,
    borderRadius: 12,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  modalText: {
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },

  addDday: {
    flexDirection: 'row',
    gap: 3,
  },
  ddayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  ddayInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },

  ddayInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },

  groupModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 31,
    paddingTop: 40,
    paddingBottom: 95, 
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  groupModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 19,
  },
  modalText: {
    fontSize: 14,
    fontFamily: fonts.semibold,
  },
  modalSubText: {
    fontSize: 12,
  },
  count: {
    fontSize: 14,
    fontFamily: fonts.semibold,
  },
  groupCreateBtn: {
    backgroundColor: COLORS.mainColor,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 18,
    marginBottom: 18,
  },
  groupCreateBtnText: {
    color: '#fff',
    fontFamily: fonts.semibold,
    fontSize: 14,
  },
  groupJoinBtn: {
    backgroundColor: COLORS.line,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 18,
  },
  groupJoinBtnText: {
    color: '#464646',
    fontSize: 14,
    fontFamily: fonts.semibold,
  },

})