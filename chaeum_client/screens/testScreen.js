import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import Profile from '../components/Profile';
import TodoList from '../components/TodoList';

export default function TestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>안녕하세요!!</Text>
      <Profile style={{ width: 328 }} />
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.mainColor,
  },
});
