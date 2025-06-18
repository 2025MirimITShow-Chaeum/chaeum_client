import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import StudyTaskItem from "./StudyTaskItem";
import TodoList from "./TodoList";
import { fetchHome, createTodo } from "../utils/api";
import { useNavigation } from "@react-navigation/native";

export default function LessonSection() {
  const navigation = useNavigation();

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // 홈 데이터 로드
  const load = () => {
    setLoading(true);
    fetchHome()
      .then((res) => setGroups(res.data))
      .catch((err) => {
        console.error(err);
        Alert.alert("오류", "홈 정보 불러오기 실패");
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  // "+" 버튼 클릭 핸들러
  const handleAddTodo = async (group) => {
    try {
      const newTitle = "새 할 일";
      // const userId = group.todos[0]?.user_id;
      // if (!userId) throw new Error("user_id를 찾을 수 없습니다.");

      await createTodo({
        group_id: group.group_id,
        title: newTitle,
      });

      // 생성되면 다시 불러오기
      load();
    } catch (err) {
      console.error(err);
      Alert.alert("오류", "TODO 생성 실패");
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;

  if (groups.length === 0) {
    return (
      <TouchableOpacity style={styles.emptyContainer}
        onPress={() => { navigation.navigate('GroupName') }}>
        {/* <Text style={styles.emptyText}>
          지금 터치해서 스터디 그룹을 만들어봐요!
        </Text> */}
        <Image
          source={require("../assets/homeLogo.png")}
          style={styles.emptyImage}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {groups.map((group) => {
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
              onPlusPress={() => handleAddTodo(group)}
            />
            {group.todos.map((todo) => (
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
  emptyContainer: {
    alignItems: "center",
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  emptyImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
