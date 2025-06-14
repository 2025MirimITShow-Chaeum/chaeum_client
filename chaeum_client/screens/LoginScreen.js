// screens/LoginScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import firebase from "firebase/compat/app";
import { auth } from "../firebase";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import { loginWithGoogle } from "../src/api"; // ← 변경
import * as SecureStore from "expo-secure-store";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const { iosClientId, webClientId } = Constants.expoConfig?.extra ?? {};
  const [isLoading, setIsLoading] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId,
    webClientId,
  });

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.idToken) {
      handleGoogleResponse(response.authentication);
    }
  }, [response]);

  const handleGoogleResponse = async ({ idToken: rawIdToken, accessToken }) => {
    setIsLoading(true);
    try {
      if (!rawIdToken) throw new Error("ID 토큰을 받지 못했습니다.");

      // 1) Firebase 인증
      const credential = firebase.auth.GoogleAuthProvider.credential(
        rawIdToken,
        accessToken
      );
      const { user } = await auth.signInWithCredential(credential);

      // 2) Firebase ID 토큰
      const firebaseIdToken = await user.getIdToken(true);
      console.log("id token", await user.getIdToken());

      // 3) 백엔드 로그인 API 호출
      const res = await loginWithGoogle({ idToken: firebaseIdToken });
      const { accessToken: jwt, user: backendUser } = res.data;

      // 4) JWT 저장
      await SecureStore.setItemAsync("accessToken", jwt);
      console.log("JWT Token:", jwt);

      // 5) 네비게이션
      if (!backendUser.nickname) {
        navigation.replace("Name");
      } else if (!backendUser.profile_image) {
        navigation.replace("ProfileImage");
      } else {
        navigation.replace("Home");
      }
    } catch (error) {
      console.error("=== 로그인 실패 ===", error);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
      Alert.alert(
        "로그인 오류",
        error.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!request) {
      Alert.alert("설정 오류", "Google 로그인 설정을 확인해주세요.");
      return;
    }
    try {
      await auth.signOut();
      await promptAsync({ prompt: "select_account" });
    } catch (error) {
      console.error("프롬프트 에러:", error);
      Alert.alert("로그인 실패", "다시 시도해주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logoText.png")} style={styles.logo} />
      <Text style={styles.slogan}>슬로건 내용</Text>
      <Image
        source={require("../assets/loginLogo.png")}
        style={styles.loginLogo}
      />

      <TouchableOpacity
        style={styles.kakaoButton}
        onPress={() => navigation.navigate("Name")}
      >
        <Text style={styles.kakaoText}>카카오로 시작하기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.googleButton, isLoading && styles.disabledButton]}
        onPress={handleGoogleLogin}
        disabled={isLoading || !request}
      >
        <Text style={styles.googleText}>
          {isLoading ? "로그인 중..." : "구글로 시작하기"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#fff" },
  slogan: { fontSize: 16 },
  kakaoButton: {
    backgroundColor: "#FEE500",
    width: "80%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 40,
  },
  kakaoText: { fontWeight: "bold" },
  googleButton: {
    borderColor: "#ccc",
    borderWidth: 1,
    width: "80%",
    padding: 12,
    borderRadius: 8,
    marginTop: 17,
    alignItems: "center",
  },
  disabledButton: { opacity: 0.6 },
  googleText: {},
  logo: { width: 206, height: 84, marginTop: 100, marginBottom: 35 },
  loginLogo: { width: 313, height: 228, marginBottom: 39 },
});
