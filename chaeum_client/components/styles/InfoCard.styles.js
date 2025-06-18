import { StyleSheet } from "react-native";
import { COLORS } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  card: {
    borderWidth: 0.5,
    borderColor: COLORS.line,
    borderRadius: 12,
    marginTop: 25,
  },
  header: {
    backgroundColor: COLORS.mainColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontFamily: fonts.semibold,
  },
  content: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    gap: 10,
  },
})