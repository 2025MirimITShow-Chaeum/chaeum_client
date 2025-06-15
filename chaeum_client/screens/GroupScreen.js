import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles/Group.styles';
import TodoList from '../components/TodoList';
import SubjectList from '../components/SubjectList';
import WeeklyStars from '../components/WeeklyStars';
import DividingLine from '../components/dividingLine';
import GroupMemberList from '../components/GroupMemberList';
import NameTag from '../components/NameTag';
import BottomNav from "../components/BottomNav"; 
import { useNavigation } from '@react-navigation/native';
import { fetchGroupsByUser, fetchGroupDetail, fetchTodosByGroup } from '../utils/api';
import { USER_ID } from "@env";

// TODO: 출석 별 채우기, todo 수정, 삭제, 하트 유지 

export default function GroupScreen() {
  const userId = USER_ID;
  const navigation = useNavigation();
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const data = await fetchGroupsByUser(userId);
        setGroups(data);

        // 첫 번째 그룹을 선택된 그룹으로 설정
        if (data.length > 0) {
          setSelectedGroupId(data[0].group_id);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          console.warn("✅ 그룹 없음: 유저는 있지만 그룹 없음");
          setGroups([]); // 빈 상태로 렌더링
        } else {
          console.error("❌ 그룹 불러오기 실패:", error);
        }
      }
    };

    loadGroups();
  }, []);
  
  const [groupDetail, setGroupDetail] = useState(null);
  const myNickname = groupDetail?.members?.find(m => m.uid === userId)?.nickname ?? '나';

  // 그룹 선택 시 상세 정보 로딩
  useEffect(() => {
    const loadGroupDetail = async () => {
      if (!selectedGroupId) return;
      console.log("📡 요청할 group_id:", selectedGroupId);
      try {
        const data = await fetchGroupDetail(selectedGroupId);
        console.log("✅ 받아온 groupDetail:", data);
        setGroupDetail(data);
      } catch (error) {
        console.error('❌ 그룹 상세 정보 불러오기 실패:', error);
      }
    };

    loadGroupDetail();
  }, [selectedGroupId]);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      if (!selectedGroupId) return;

      try {
        const res = await fetchTodosByGroup(selectedGroupId);
        setTodos(res.data); // 모든 멤버의 투두를 저장
      } catch (error) {
        console.error("투두 불러오기 실패:", error);
      }
    };

    loadTodos();
  }, [selectedGroupId]);

  const myTodos = todos.filter(todo => todo.user_id === userId);
  const otherTodosMap = {};

  todos.forEach(todo => {
    if (todo.user_id !== userId) {
      if (!otherTodosMap[todo.user_id]) {
        otherTodosMap[todo.user_id] = {
          user_id: todo.user_id,
          nickname: todo.user?.nickname ?? '이름 없음',
          color: todo.user_color,
          todos: [],
        };
      }
      otherTodosMap[todo.user_id].todos.push(todo);
    }
  });

  const otherMembers = Object.values(otherTodosMap);

  const [now] = useState(new Date());
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const formattedDate = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 (${days[now.getDay()]})`;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <SubjectList
          groups={groups}
          selectedGroupId={selectedGroupId}
          onSelectGroup={setSelectedGroupId}
        />
        <View style={styles.container}>
          <View style={styles.today}>
            <Text style={styles.text}>{formattedDate}</Text>
            <Text style={styles.text}>01:07:40</Text>
          </View>
          <WeeklyStars />
          <DividingLine />
          <View style={styles.info}>
            <TouchableOpacity
              style={[styles.Box, { gap: 9 }]}
              onPress={() => navigation.navigate('Rank')}
            >
              <Image source={require('../assets/불.png')} style={styles.image} />
              <Text style={styles.rankText}>현재 그룹 순위는?</Text>
            </TouchableOpacity>
            <View style={[styles.Box, { gap: 14 }]}>
              <Text>그룹코드</Text>
              <Text style={styles.code}>
                {groupDetail?.secret_code ?? '그룹 없음'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.memberBox}>
          <Text style={styles.count}>
            {groupDetail?.attendance_count ?? 0}일 연속 채움중{"\n"}오늘도 파이팅!
          </Text>
          <GroupMemberList members={groupDetail?.members ?? []} />
        </View>
        <View style={styles.container}>
          <NameTag name={myNickname} />
          {myTodos.map(todo => (
            <TodoList
              key={todo.uid}
              title={todo.title}
              is_completed={todo.is_completed}
              memberColor={todo.user_color}
            />
          ))}

          <View style={styles.line} />

          {otherMembers.map(member => (
            <View key={member.user_id}>
              <NameTag name={member.nickname} showPlus={false} />
              {member.todos.map(todo => (
                <TodoList
                  key={todo.uid}
                  title={todo.title}
                  is_completed={todo.is_completed}
                  memberColor={member.color}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
}