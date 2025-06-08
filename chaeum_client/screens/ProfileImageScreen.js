import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import NextButton from "../components/NextButton";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

export default function ProfileImageScreen() {
  const [image, setImage] = useState(null); 
  const navigation = useNavigation();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Header/>

      <Text style={styles.title}>계정 만들기 step 2</Text>
      <Text style={styles.label}>프로필 사진을 올려주세요!</Text>

      <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
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
        title="다음 단계"
        disabled={!image}
        onPress={() => navigation.navigate("Home")} 
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
  placeholder: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  placeholderText: { color: "#C8C8C8", fontSize: 14 },
  image: { width: "100%", height: "100%" },
});
