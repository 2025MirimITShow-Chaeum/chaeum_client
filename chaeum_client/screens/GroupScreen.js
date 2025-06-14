import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../constants/colors';
import { styles } from './styles/Group.styles';
import TodoList from '../components/TodoList';
import SubjectList from '../components/SubjectList';
import WeeklyStars from '../components/WeeklyStars';
import DividingLine from '../components/dividingLine';
import GroupMemberList from '../components/GroupMemberList';
import NameTag from '../components/NameTag';
import BottomNav from "../components/BottomNav"; 
import api from '../api/api';

const userId = '내UID'; // 나중에 로그인 후 토큰에서 받아오기

export default function GroupScreen() {
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchGroupsAndMembers = async () => {
      try {
        const groupRes = await api.get(`/groups/my-groups`, {
          params: { user_id: userId }
        });
        const groupList = groupRes.data;
        setGroups(groupList);

        if (groupList.length > 0) {
          const firstGroupId = groupList[0].group_id;
          const memberRes = await api.get(`/groups/${firstGroupId}`);
          setMembers(memberRes.data.members);
        }
      } catch (err) {
        console.error('그룹 또는 멤버 불러오기 실패:', err);
      }
    };

    fetchGroupsAndMembers();
  }, []);

  const [now, setNow] = useState(new Date());
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const formattedDate = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 (${days[now.getDay()]})`;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <SubjectList groups={groups} />
        <View style={styles.container}>
          <View style={styles.today}>
            <Text style={styles.text}>{formattedDate}</Text>
            <Text style={styles.text}>01:07:40</Text>
          </View>
          <WeeklyStars />
          <DividingLine />
          <View style={styles.info}>
            <TouchableOpacity style={[styles.Box, { gap: 9 }]}>
              <Image source={require('../assets/불.png')} style={styles.image} />
              <Text style={styles.rankText}>현재 그룹 순위는?</Text>
            </TouchableOpacity>
            <View style={[styles.Box, { gap: 14 }]}>
              <Text>그룹코드</Text>
              <Text style={styles.code}>A3B7D2</Text>
            </View>
          </View>
        </View>
        <View style={styles.memberBox}>
          <Text style={styles.count}>8일 연속 채움중{"\n"}오늘도 파이팅!</Text>
          <GroupMemberList members={members} />
        </View>
        <View style={styles.container}>
          <NameTag name={'정세연'} />
          <TodoList />
          <TodoList />
          <TodoList />
          <View style={styles.line} />
          <NameTag name={'정세연'} showPlus={false} />
          <TodoList />
          <TodoList />
          <TodoList />
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
}
