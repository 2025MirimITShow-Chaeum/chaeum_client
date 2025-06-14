// src/components/LessonSection.js
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";
import StudyTaskItem from "./StudyTaskItem";
import TodoList from "./TodoList";
import { fetchHome } from "../src/api";

export default function LessonSection() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHome()
      .then(res => {
        setGroups(res.data);    // 전체 배열을 저장
      })
      .catch(err => {
        console.error(err);
        Alert.alert("오류", "홈 정보 불러오기 실패");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} />;
  }
  if (groups.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {groups.map(group => {
        // 그룹별 누적 초를 HH:MM:SS로 포맷
        const sec = group.timer_accumulated_sec;
        const h = String(Math.floor(sec / 3600)).padStart(2, "0");
        const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
        const s = String(sec % 60).padStart(2, "0");
        const timeString = `${h}:${m}:${s}`;

        return (
          <View key={group.group_id} style={styles.groupSection}>
            <StudyTaskItem
              subject={group.group_name}
              time={timeString}
            />
            {group.todos.map(todo => (
              <TodoList
                key={todo.uid}
                title={todo.title}
                is_completed={todo.is_completed}
                initialLiked={false}
                memberColor={todo.user_color}
              />
            ))}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  groupSection: {
    marginBottom: 24,  
  },
});
