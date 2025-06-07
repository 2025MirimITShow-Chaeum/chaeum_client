import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from './constants/colors';

export default function TestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>안녕하세요!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.mainColor,
  },
});
