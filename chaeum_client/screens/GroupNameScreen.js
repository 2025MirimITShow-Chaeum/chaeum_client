import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, handleNext } from "react-native";
import { fonts } from '../constants/fonts';
import InputField from "../components/InputField";
import NextButton from "../components/NextButton";
import Header from "../components/Header";

export default function GroupNameScreen() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>그룹 만들기 step 1</Text>
      <Text style={styles.label}>그룹 이름이 무엇인가요?</Text>
      <InputField
        value={name}
        onChangeText={setName}
        placeholder="눌러서 작성하기"
      />
      <NextButton
        title={isLoading ? "저장 중..." : "결정 완료"}
        disabled={!name || isLoading}
        onPress={handleNext}
        style={styles.btn}
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
  btn: { marginTop: 312 },
});