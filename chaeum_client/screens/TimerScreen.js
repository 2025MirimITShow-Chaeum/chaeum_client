import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useTimer } from "../contexts/TimerContext"; 

const categories = ["😱 수학키움반", "응용과 개발", "과학 A팀", "🧠 파이팅"];

export default function TimerScreen() {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = React.useState("응용과 개발");

  const { isRunning, setIsRunning, elapsed } = useTimer();

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipContainer}
        style={{ flexGrow: 0 }}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, activeCategory === cat && styles.chipActive]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text
              style={[
                styles.chipText,
                activeCategory === cat && styles.chipTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.timerWrapper}>
        <AnimatedCircularProgress
          size={328}
          width={10}
          fill={((elapsed % 3600) / 3600) * 100}
          tintColor="#FFFFFF"
          backgroundColor="#3275CD"
          rotation={0}
          lineCap="square"
          arcSweepAngle={360}
        >
          {() => (
            <View style={styles.timerTextWrapper}>
              <Text style={styles.timerLabel}>TIMER</Text>
              <Text style={styles.timerValue}>{formatTime(elapsed)}</Text>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalTime}>03:46:27</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      <TouchableOpacity
        style={styles.pauseButton}
        onPress={() => setIsRunning(!isRunning)}
      >
        <Ionicons name={isRunning ? "pause" : "play"} size={28} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5399F5",
    paddingTop: 47,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 65,
    left: 31,
    zIndex: 10,
  },
  chipContainer: {
    height: 36,
    flexDirection: "row",
    paddingHorizontal: 40,
    marginTop: 92,
    marginBottom: 80,
    alignSelf: "center",
  },
  chip: {
    borderColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 27,
    marginHorizontal: 8,
  },
  chipActive: {
    backgroundColor: "#fff",
  },
  chipText: {
    color: "#fff",
    fontSize: 14,
  },
  chipTextActive: {
    color: "#000",
    fontWeight: "400",
  },
  timerTextWrapper: {
    alignItems: "center",
  },
  timerLabel: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 6, //임시
  },
  timerValue: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "500",
  },
  totalLabel: {
    color: "#3275CD",
    marginTop: 36, //임시
    fontSize: 10,
  },
  totalTime: {
    color: "#3275CD",
    fontSize: 26,
  },
  pauseButton: {
    marginTop: 52,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 40,
  },
});
