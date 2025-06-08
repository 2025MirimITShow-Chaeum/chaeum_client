import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function NextButton({ title, onPress, disabled, style }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style, // 외부 스타일 먼저
        { backgroundColor: disabled ? "#ABB0BC" : "#F57353" }, // 그 다음 내부 스타일
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 328,
    height: 61,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
});
