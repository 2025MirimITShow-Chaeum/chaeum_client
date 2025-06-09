import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import firebase from 'firebase/compat/app';
import { auth } from "../firebase";
import Constants from 'expo-constants';
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const {
  iosClientId,
  webClientId,
} = Constants.expoConfig?.extra ?? {};

export default function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: iosClientId,
    webClientId: webClientId,
  });

  useEffect(() => {
    if (response?.type === "success") {
      handleGoogleResponse();
    }
  }, [response]);

  const handleGoogleResponse = async () => {
    setIsLoading(true);
    try {
      const idToken = response.authentication.idToken;
      const accessToken = response.authentication.accessToken;

      console.log("ID Token:", idToken);
      console.log("Access Token:", accessToken);

      if (!idToken) {
        throw new Error("ID 토큰을 받지 못했습니다.");
      }

      const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
      const userCredential = await auth.signInWithCredential(credential);
      const user = userCredential.user;

      console.log("Firebase 로그인 성공:", user.uid);
      console.log("사용자 정보:", {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        providerData: user.providerData
      });

      // 백엔드와 연결한 후, 유저 nickname이 있다면 홈으로 아니라면 회원가입 진행
      navigation.navigate("Name");

    } catch (error) {
      console.error("Google 로그인 실패:", error);
      console.error("에러 상세:", error.code, error.message);
      Alert.alert("로그인 실패", `오류: ${error.message}`);
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
      console.log("Google 로그인 프롬프트 시작...");
      console.log("Request 설정:", request);
      await promptAsync();
    } catch (error) {
      console.error("Google 로그인 프롬프트 에러:", error);
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
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  slogan: {
    fontSize: 16
  },
  kakaoButton: {
    backgroundColor: "#FEE500",
    width: "80%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  kakaoText: {
    fontWeight: "bold"
  },
  googleButton: {
    borderColor: "#ccc",
    borderWidth: 1,
    width: "80%",
    padding: 12,
    borderRadius: 8,
    marginTop: 17,
    alignItems: "center",
  },
  googleText: {},
  logo: {
    width: 206,
    height: 84,
    marginBottom: 35,
    marginTop: 202,
  },
  loginLogo: {
    width: 313,
    height: 228,
    marginTop: 61,
    marginBottom: 39,
  },
});