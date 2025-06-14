import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { styles } from './styles/WeeklyStars.styles';

const daysKor = ['일', '월', '화', '수', '목', '금', '토'];
const colors = ['#F57373', '#111', '#111', '#111', '#111', '#111', '#6B9EFF']; // 일~토 텍스트 색

export default function WeeklyStars() {
  const today = new Date();
  const todayDay = today.getDay(); // 요일 (0:일, 6:토)

  // 이번 주 일요일부터 시작하는 날짜 배열 생성
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - todayDay);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <View style={styles.row}>
      {weekDates.map((date, idx) => (
        <View key={idx} style={styles.column}>
          <Text style={[styles.dayText, { color: colors[date.getDay()] }]}>
            {daysKor[date.getDay()]}
          </Text>
          <Image
            source={require('../assets/star_empty.png')}
            style={styles.star}
          />
          <Text style={styles.dateText}>{date.getDate()}</Text>
        </View>
      ))}
    </View>
  );
}
