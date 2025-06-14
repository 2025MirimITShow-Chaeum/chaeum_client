import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Pressable } from 'react-native';
import { styles } from './styles/Rank.styles';
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../components/BottomNav"; 

export default function RankScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={[styles.container, styles.rank, {
    paddingTop: 70}]}>
        <View style={styles.appbar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/arrow.png')} style={styles.arrow} />
          </TouchableOpacity>
          <View style={styles.week}>
            <Text style={styles.weekText}>이번 주</Text>
          </View>
        </View>

        {/* 1등 */}
        <View style={[styles.groupContainer, styles.first]}>
          <Text style={[styles.groupName, styles.oneText]}>😱 수학키움반</Text>
          <Image source={require('../assets/1등.png')} style={[styles.trophyImg, styles.one]} />
        </View>

        {/* 2등 */}
        <View style={[styles.groupContainer, styles.second]}>
          <Text style={[styles.groupName, styles.twoText, styles.Text]}>과학 A팀</Text>
          <Image source={require('../assets/2등.png')} style={styles.trophyImg} />
        </View>

        {/* 3등 */}
        <View style={[styles.groupContainer, styles.third]}>
          <Text style={[styles.groupName, styles.threeText, styles.Text]}>응용과 개발</Text>
          <Image source={require('../assets/3등.png')} style={styles.trophyImg} />
        </View>
      </View>
      <View style={[styles.container, styles.toggle]}>
        <Pressable><Text>전체그룹</Text></Pressable>
        <Pressable><Text>전체그룹</Text></Pressable>
      </View>
      <ScrollView style={{ backgroundColor: '#fff' }}>

      </ScrollView>
      <BottomNav />
    </View>
  );
}
