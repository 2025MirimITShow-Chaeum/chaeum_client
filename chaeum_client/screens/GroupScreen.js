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

export default function GroupScreen() {
  const mockGroups = [
    { id: 1, name: '😱 수학키움반', color: COLORS.sora },
    { id: 2, name: '응용과 개발', color: COLORS.purple },
    { id: 3, name: '과학 A팀', color: COLORS.yellow },
    { id: 4, name: '🧠 파이팅국어', color: COLORS.sodomy },
  ];

  const mockMembers = [
    { id: 1, name: '정세연', color: '#5B8DEF' },
    { id: 2, name: '장하영', color: '#B06EDB' },
    { id: 3, name: '정세연', color: '#5B8DEF' },
    { id: 4, name: '장하영', color: '#B06EDB' },
    { id: 5, name: '정세연', color: '#5B8DEF' },
    { id: 6, name: '장하영', color: '#B06EDB' },
  ];

  const [now, setNow] = useState(new Date());

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const formattedDate = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 (${days[now.getDay()]})`;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <SubjectList groups={mockGroups} />
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
          <GroupMemberList members={mockMembers} />
        </View>
        <View style={styles.container}>
          <NameTag name={'정세연'} />
          <TodoList />
          <TodoList />
          <TodoList />
          <View style={styles.line}/>
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
