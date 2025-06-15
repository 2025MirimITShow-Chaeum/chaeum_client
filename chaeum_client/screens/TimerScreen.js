// src/screens/TimerScreen.js
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import * as SecureStore from "expo-secure-store";
import api, { fetchAccumulatedTime } from "../src/api";  // fetchAccumulatedTime 추가

export default function TimerScreen() {
  const navigation = useNavigation();

  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(null);

  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState("");

  // 오늘 날짜 (YYYY-MM-DD)
  const today = new Date().toISOString().slice(0, 10);

  // TOTAL에 표시할 누적 시간
  const [totalAccum, setTotalAccum] = useState(0);

  // 1초마다 elapsed 업데이트
  useEffect(() => {
    let id;
    if (isRunning) {
      id = setInterval(() => setElapsed(prev => prev + 1), 1000);
    }
    return () => clearInterval(id);
  }, [isRunning]);

  // 초기 그룹 & 타이머 로드
  useEffect(() => {
    (async () => {
      try {
        const token = await SecureStore.getItemAsync("accessToken");
        const userId = await SecureStore.getItemAsync("userId");
        if (!token || !userId) throw new Error("로그인 정보 없음");

        // 그룹 조회
        const { data: groupsData } = await api.get(
          `/group?user_id=${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setGroups(groupsData);
        const firstId = groupsData[0]?.group_id || "";
        setActiveGroup(firstId);
      } catch (e) {
        console.error(e);
        Alert.alert("오류", "초기 그룹 로드 실패");
      }
    })();
  }, []);

  // activeGroup 변경 시: 타이머 & TOTAL 동시 로드
  useEffect(() => {
    if (!activeGroup) return;
    (async () => {
      const token = await SecureStore.getItemAsync("accessToken");

      // 1) 개별 그룹 타이머 정보
      try {
        const { data } = await api.get(
          `/timers?group_id=${activeGroup}&date=${today}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { accumulated_sec, is_running, started_at } = data;

        if (is_running && started_at) {
          const startMs = new Date(started_at).getTime();
          const diffSec = Math.floor((Date.now() - startMs) / 1000);
          setElapsed(accumulated_sec + diffSec);
          startRef.current = startMs;
          setIsRunning(true);
        } else {
          setElapsed(accumulated_sec || 0);
          startRef.current = null;
          setIsRunning(false);
        }
      } catch (err) {
        console.error("타이머 로드 실패:", err);
        Alert.alert("오류", "타이머 정보를 불러오지 못했습니다.");
      }

      // 2) 그룹 전체 누적 시간 (TOTAL)
      try {
        const res = await fetchAccumulatedTime(today);
        setTotalAccum(res.data.accumulated_seconds || 0);
      } catch (err) {
        console.error("TOTAL 조회 실패:", err);
        setTotalAccum(0);
      }
    })();
  }, [activeGroup]);

  // 낙관적 UI 시작
  async function handleStart() {
    setIsRunning(true);
    startRef.current = Date.now();
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      await api.post(
        `/timers/${activeGroup}/start`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("시작 실패:", err);
      setIsRunning(false);
      Alert.alert("오류", "타이머 시작에 실패했습니다.");
    }
  }

  // 낙관적 UI 중지
  async function handleStop() {
    setIsRunning(false);
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      const { data } = await api.post(
        `/timers/${activeGroup}/stop`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setElapsed(data.accumulated_sec || 0);
    } catch (err) {
      console.error("중지 실패:", err);
      setIsRunning(true);
      Alert.alert("오류", "타이머 중지에 실패했습니다.");
    }
  }

  const onToggle = () => (isRunning ? handleStop() : handleStart());

  // HH:MM:SS 포맷
  const formatTime = (sec) => {
    const s = sec || 0;
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${ss}`;
  };

  return (
    <View style={styles.container}>
      {/* Close 버튼 */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>

      {/* 그룹 칩 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipContainer}
      >
        {groups.map((g) => (
          <TouchableOpacity
            key={g.group_id}
            style={[
              styles.chip,
              activeGroup === g.group_id && styles.chipActive,
            ]}
            onPress={() => setActiveGroup(g.group_id)}
          >
            <Text
              style={[
                styles.chipText,
                activeGroup === g.group_id && styles.chipTextActive,
              ]}
            >
              {g.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 타이머 */}
      <View style={styles.timerWrapper}>
        <AnimatedCircularProgress
          size={328}
          width={10}
          fill={((elapsed % 3600) / 3600) * 100}
          tintColor="#FFFFFF"
          backgroundColor="#3275CD"
          rotation={0}
          lineCap="square"
        >
          {() => (
            <View style={styles.timerTextWrapper}>
              <Text style={styles.timerLabel}>TIMER</Text>
              <Text style={styles.timerValue}>{formatTime(elapsed)}</Text>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalTime}>{formatTime(totalAccum)}</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      {/* Play/Pause */}
      <TouchableOpacity style={styles.pauseButton} onPress={onToggle}>
        <Ionicons name={isRunning ? "pause" : "play"} size={28} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#5399F5", paddingTop: 47, justifyContent: "flex-start", alignItems: "center" },
  closeButton: { position: "absolute", top: 65, left: 31, zIndex: 10 },
  chipContainer: { height: 36, flexDirection: "row", paddingHorizontal: 40, marginTop: 92, marginBottom: 80, alignSelf: "center" },
  chip: { borderColor: "#fff", borderWidth: 1, paddingHorizontal: 12, paddingVertical: 9, borderRadius: 27, marginHorizontal: 8 },
  chipActive: { backgroundColor: "#fff" },
  chipText: { color: "#fff", fontSize: 14 },
  chipTextActive: { color: "#000", fontWeight: "400" },
  timerWrapper: { alignItems: "center", justifyContent: "center", marginTop: 20 },
  timerTextWrapper: { alignItems: "center" },
  timerLabel: { color: "#fff", fontSize: 16, marginBottom: 6 },
  timerValue: { color: "#fff", fontSize: 50, fontWeight: "500" },
  totalLabel: { color: "#3275CD", marginTop: 36, fontSize: 10 },
  totalTime: { color: "#3275CD", fontSize: 26 },
  pauseButton: { marginTop: 52, backgroundColor: "#fff", padding: 20, borderRadius: 40 },
});
