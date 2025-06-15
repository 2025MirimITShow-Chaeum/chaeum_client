import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import CheckIcon from "../assets/check.svg";

export default function ColorPicker({ colors, selectedColor, onSelect }) {
  return (
    <View style={styles.container}>
      {colors.map((color, idx) => (
        <TouchableOpacity
          key={idx}
          style={[styles.colorCircle, { backgroundColor: color }]}
          onPress={() => onSelect(color)}
        >
          {selectedColor === color && (
            <CheckIcon width={16} height={16} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 14,
  },
  colorCircle: {
    width: 43,
    height: 43,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
