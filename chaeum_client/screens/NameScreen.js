import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField from "../components/InputField";
import NextButton from "../components/NextButton";
import Header from "../components/Header";

export default function NameScreen({ navigation }) {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <Header/>

      <Text style={styles.title}>계정 만들기 step 1</Text>
      <Text style={styles.label}>이름을 알려주세요!</Text>

      <InputField
        value={name}
        onChangeText={setName}
        placeholder="눌러서 작성하기"
      />

      <NextButton
        title="다음 단계"
        disabled={!name}
        onPress={() => navigation.navigate("ProfileImage")}
        style={styles.btn} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 31, backgroundColor: "#fff" },
  title: { marginVertical: 55, fontSize: 14, color: "#7A7A7A" },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 9 },
  btn: { marginTop: 312 },
});
