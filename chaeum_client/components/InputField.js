// components/InputField.js
import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function InputField({ value, onChangeText, placeholder }) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: 328,
    height: 61,
    borderWidth: 1,
    borderColor: "#F57353",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 22,
  },
});
