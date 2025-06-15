// screens/ProfileImageScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import NextButton from "../components/NextButton";
import Header from "../components/Header";
import { registerProfileImage } from "../src/api";  // ★ named export
import * as SecureStore from "expo-secure-store";

export default function ProfileImageScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
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

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return Alert.alert("권한 오류", "갤러리 접근 권한이 필요합니다.");
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64: false,
    });
    if (result.canceled) return;

    const manip = await ImageManipulator.manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 200, height: 200 } }],
      { compress: 0.3, base64: true }
    );
    setImageUri(manip.uri);
    setImageBase64(manip.base64);
  };

  const handleComplete = async () => {
    if (!imageBase64) {
      return Alert.alert("알림", "프로필 사진을 선택해주세요.");
    }
    setIsLoading(true);
    try {
      const res = await registerProfileImage(imageBase64);
      console.log("=== 프로필 저장 응답 ===", res.data);
      navigation.replace("Home");
    } catch (err) {
      console.error("=== 프로필 저장 실패 ===", err.response || err);
      if (err.response?.status === 401) {
        Alert.alert("인증 오류", "다시 로그인해주세요.", [
          { text: "확인", onPress: () => navigation.replace("Login") }
        ]);
      } else {
        Alert.alert("오류", "프로필 저장에 실패했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>계정 만들기 step 2</Text>
      <Text style={styles.label}>프로필 사진을 올려주세요!</Text>
      <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>사진 고르기</Text>
            <Image
              source={require("../assets/logoImage.png")}
              style={styles.backArrow}
            />
          </View>
        )}
      </TouchableOpacity>
      <NextButton
        title={isLoading ? "저장 중..." : "다음 단계"}
        disabled={!imageUri || isLoading}
        onPress={handleComplete}
        style={styles.btn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 31, backgroundColor: "#fff" },
  title: { marginVertical: 55, fontSize: 14, color: "#7A7A7A" },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 9 },
  imageWrapper: {
    width: 162,
    height: 162,
    borderRadius: 81,
    overflow: "hidden",
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 190,
    marginTop: 30,
  },
  placeholder: { flex: 1, justifyContent: "flex-end", alignItems: "center" },
  placeholderText: { color: "#C8C8C8", fontSize: 14 },
  image: { width: "100%", height: "100%" },
  backArrow: { marginTop: 8, width: 24, height: 24 },
  btn: { marginTop: 0 },
});
