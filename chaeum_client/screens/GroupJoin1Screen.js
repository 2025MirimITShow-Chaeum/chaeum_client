import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { fonts } from '../constants/fonts';
import InputField from "../components/InputField";
import NextButton from "../components/NextButton";
import Header from "../components/Header";

export default function GroupJoin1Screen() {
  const [name, setName] = useState("");
  
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>그룹 입장하기 step 1</Text>
      <Text style={styles.label}>친구에게 받은 그룹 코드를 입력해 주세요!</Text>
      <InputField
        value={name}
        onChangeText={setName}
        placeholder="눌러서 작성하기"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 31,
    backgroundColor: "#fff"
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
    marginBottom: 20,
  },
});