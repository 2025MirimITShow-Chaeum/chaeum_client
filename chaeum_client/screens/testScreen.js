import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import Profile from '../components/Profile';
import TodoList from '../components/TodoList';
import Planner from '../components/Planner/Planner';

const mockData = [
  {
    groupId: 1,
    groupColor: '#F4A261',
    startTime: '2025-06-10T08:00:00',
    endTime: '2025-06-10T09:20:00',
  },
  {
    groupId: 2,
    groupColor: '#9B5DE5',
    startTime: '2025-06-10T11:00:00',
    endTime: '2025-06-10T12:10:00',
  },
];

export default function TestScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>안녕하세요!!</Text>
      <Profile style={{ width: 328 }} />
      <TodoList />
      <Planner studyData={mockData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.mainColor,
  },
});
