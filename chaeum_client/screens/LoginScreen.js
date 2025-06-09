import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function LoginScreen({ navigation }) {
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
        style={styles.googleButton}
        onPress={() => navigation.navigate("Name")}
      >
        <Text style={styles.googleText}>구글로 시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: "#fff",
  },
  slogan: { fontSize: 16 },
  kakaoButton: {
    backgroundColor: "#FEE500",
    width: "80%",
    padding: 12,
    borderRadius: 8,
    // marginTop: 24,
    alignItems: "center",
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
