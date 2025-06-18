import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { fonts } from '../constants/fonts';
import ColorPicker from "../components/ColorPicker";
import NextButton from "../components/NextButton";
import Header from "../components/Header";
import { postGroup } from "../utils/api";
import { useRoute } from "@react-navigation/native";

const GROUP_COLORS = [
  "#F45D48", "#FDB147", "#D1A15C", "#36B84C",
  "#C26BFF", "#3A46BF", "#DE5D5D", "#FDE14C",
  "#B9CF3A", "#64D8B1", "#FCA8F2", "#5CA5F9"
];

export default function GroupColorScreen() {
  const route = useRoute();
  const { name: groupName } = route.params;

  const [selectedColor, setSelectedColor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    try {
      await postGroup({ name: groupName, color: selectedColor });
    } catch (err) {
      console.log("그룹 생성 실패! : ", err);
    }

  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>그룹 만들기 step 2</Text>
      <Text style={styles.label}>어울리는 색을 골라주세요!</Text>

      <ColorPicker
        colors={GROUP_COLORS}
        selectedColor={selectedColor}
        onSelect={setSelectedColor}
      />
      <TouchableOpacity
        style={[styles.button, !selectedColor && styles.buttonDisabled]}
        disabled={!selectedColor}
        onPress={handleNext}
      >
      </TouchableOpacity>

      <NextButton
        title={isLoading ? "저장 중..." : "선택 완료"}
        disabled={!groupName || isLoading}
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
    marginBottom: 32,
  },
  btn: { marginTop: 312 },
});