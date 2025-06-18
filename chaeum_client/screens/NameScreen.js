// screens/NameScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import InputField from "../components/InputField";
import NextButton from "../components/NextButton";
import Header from "../components/Header";
import { registerNickname } from "../utils/api";   // ★ named export
import * as SecureStore from "expo-secure-store";

export default function NameScreen({ navigation }) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("accessToken");
      if (!token) {
        Alert.alert("인증 오류", "로그인이 필요합니다.", [
          { text: "확인", onPress: () => navigation.replace("Login") }
        ]);
      }
    })();
  }, []);

  const handleNext = async () => {
    if (!name.trim()) {
      return Alert.alert("알림", "이름을 입력해주세요.");
    }
    setIsLoading(true);
    try {
      const res = await registerNickname(name);
      console.log("=== 닉네임 저장 응답 ===", res.data);
      navigation.replace("ProfileImage");
    } catch (err) {
      console.error("=== 닉네임 저장 실패 ===", err.response || err);
      if (err.response?.status === 401) {
        Alert.alert("인증 오류", "다시 로그인해주세요.", [
          { text: "확인", onPress: () => navigation.replace("Login") }
        ]);
      } else {
        Alert.alert("오류", "이름 저장에 실패했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>계정 만들기 step 1</Text>
      <Text style={styles.label}>이름을 알려주세요!</Text>
      <Image
        source={require("../assets/character.png")}
        style={styles.image}
      />
      <InputField
        value={name}
        onChangeText={setName}
        placeholder="눌러서 작성하기"
      />
      <NextButton
        title={isLoading ? "저장 중..." : "다음 단계"}
        disabled={!name || isLoading}
        onPress={handleNext}
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
  image: {
    position: "absolute",
    top: 140,
    left: 260,
    width: 96,
    height: 118,
    resizeMode: "contain",
  },
});
