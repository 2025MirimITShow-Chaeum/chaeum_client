// src/components/StudyTaskItem.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";

export default function StudyTaskItem({
  subject = "응용과 개발",
  time = "00:00:00",
  onPlusPress  // + 버튼 눌렀을 때 실행될 콜백
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.subjectButton}
        onPress={onPlusPress}
      >
        <Text style={styles.subjectText}>{subject}</Text>
        <View style={styles.plusCircle}>
          <Text style={styles.plusText}>＋</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.timerSection}>
        <Text style={styles.timerText}>{time}</Text>
        <Image
          source={require("../assets/clock.png")}
          style={styles.icon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 34,
  },
  subjectButton: {
    flexDirection: "row",
    backgroundColor: "#5399F5",
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6.5,
    alignItems: "center",
  },
  subjectText: {
    color: "#fff",
    fontSize: 13,
    marginRight: 6,
  },
  plusCircle: {
    width: 17,
    height: 17,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  plusText: {
    color: "#000",
    fontSize: 13,
    fontWeight: "400",
  },
  timerSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    color: "#5399F5",
    fontSize: 14,
    fontWeight: "400",
    marginRight: 4,
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
});
