import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { fonts } from '../constants/fonts';
import ColorPicker from "../components/ColorPicker";
import NextButton from "../components/NextButton";
import Header from "../components/Header";
import { COLORS } from "../constants/colors";
import { useNavigation } from '@react-navigation/native';

const mockGroup = {
  name: "응용과 개발",
  code: "A3B7D2",
  color: "#5CA5F9",
};

export default function GroupCompleteScreen() {
  const navigation = useNavigation();
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>그룹 만들기 step 3</Text>
      <Text style={styles.label}>그룹이 만들어 졌어요!</Text>

      <View style={styles.GroupBox}>
        <View style={[styles.Group, { backgroundColor: mockGroup.color }]}>
          <Text style={styles.groupName}>{mockGroup.name}</Text>
        </View>
        <View style={styles.code}>
          <Text style={styles.codeText}>그룹코드</Text>
          <Text style={styles.GroupCode}>{mockGroup.code}</Text>
        </View>
      </View>

      <Image source={require('../assets/GroupLogo.png')} style={styles.LogoImg} onPress={() => navigation.navigate('Home')} />
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>채움 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.reset} onPress={() => navigation.navigate('GroupName')}>
        <Text style={styles.resetText}>처음부터 다시 만들고 싶어요</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 31,
    backgroundColor: "#fff",
  },
  title: {
    marginVertical: 55,
    fontSize: 14,
    fontFamily: fonts.medium,
    color: "#7A7A7A"
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.medium,
    marginBottom: 32,
  },

  GroupBox: {
    backgroundColor: "#fff",
    width: 328,
    height: 157,
    borderWidth: 0.1,
    borderRadius: 4,
    borderColor: COLORS.deactivate,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  Group: {
    borderRadius: 27,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  groupName: {
    color: "#fff",
    fontSize: 14.4,
    fontFamily: fonts.regular,
  },
  code: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 16,
    alignItems: "center",
  },
  codeText: {
    fontSize: 10,
    fontFamily: fonts.regular,
  },
  GroupCode: {
    fontSize: 14,
    fontFamily: fonts.semibold,
  },

  LogoImg: {
    width: 276,
    height: 142,
    resizeMode: 'contain',
    marginTop: 64,
  },

  btn: {
    width: 328,
    height: 61,
    borderRadius: 30,
    backgroundColor: COLORS.mainColor,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: fonts.regular,
    color: "#fff",
  },
  reset: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  resetText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: COLORS.deactivate,
  },
});
