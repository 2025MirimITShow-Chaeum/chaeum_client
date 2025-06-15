import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../components/BottomNav";
import LessonSection from "../components/LessonSection";
import Profile from "../components/Profile";
import { fetchAccumulatedTime } from "../src/api";

// 날짜 → "MM월 DD일 (요일)"
function formatHeaderDate(date = new Date()) {
  const weekdays = ["일","월","화","수","목","금","토"];
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const DD = String(date.getDate()).padStart(2, "0");
  const wd = weekdays[date.getDay()];
  return `${MM}월 ${DD}일 (${wd})`;
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [accumulatedSeconds, setAccumulatedSeconds] = useState(0);
  const [loading, setLoading] = useState(true);

  // HH:MM:SS 포맷
  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return [h, m, s].map(n => String(n).padStart(2, "0")).join(":");
  };

  // 오늘 날짜 YYYY-MM-DD
  const getTodayDate = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  };

  useEffect(() => {
    (async () => {
      try {
        const today = getTodayDate();
        const res = await fetchAccumulatedTime(today);
        const secs = res.data.accumulated_seconds ?? 0;
        setAccumulatedSeconds(secs);
      } catch (err) {
        console.error(err);
        setAccumulatedSeconds(0);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: insets.top }}>
      <View style={styles.timerSection}>
        {/* 동적 날짜 */}
        <Text style={styles.date}>{formatHeaderDate()}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Timer")}>
          <Text style={styles.timer}>
            {loading ? "00:00:00" : formatTime(accumulatedSeconds)}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Profile />
        <LessonSection />
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  timerSection: {
    width: "100%",
    height: 177,
    backgroundColor: "#F57353",
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
  },
  timer: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  body: {
    padding: 20,
  },
});
