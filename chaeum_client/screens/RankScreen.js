import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Pressable } from 'react-native';
import { styles } from './styles/Rank.styles';
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../components/BottomNav";

export default function RankScreen() {
  const userId = "dFSrijJPDRPY5pEtKk4nFwYwj552";
  const navigation = useNavigation();
  const [showAll, setShowAll] = useState(true);
  const [top3Groups, setTop3Groups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const all = await fetchAllGroupRankings();
        const mine = await fetchMyGroupRankings(userId);
        setAllGroups(all);
        setMyGroups(mine);
        setTop3Groups(all.slice(0, 3));
      } catch (e) {
        console.error("랭킹 데이터 오류:", e);
      }
    };
    loadData();
  }, []);

  const visibleGroups = showAll ? allGroups : myGroups;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={[styles.container, styles.rank, {
        paddingTop: 70
      }]}>
        <View style={styles.appbar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/arrow.png')} style={styles.arrow} />
          </TouchableOpacity>
          <View style={styles.week}>
            <Image source={require('../assets/week.png')} style={styles.weekImg} />
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
        {/* 3등 */}Add commentMore actions
        <View style={[styles.groupContainer, styles.third]}>
          <Text style={[styles.groupName, styles.threeText, styles.Text]}>응용과 개발</Text>
          <Image source={require('../assets/3등.png')} style={styles.trophyImg} />
        </View>
      </View>

      {/* 그룹 목록 */}
      <View style={[styles.container, styles.toggle]}>
        <Pressable onPress={() => setShowAll(true)}>
          <Text style={showAll ? styles.activeTab : styles.inactiveTab}>전체그룹</Text>
          {showAll && <View style={styles.underline} />}
        </Pressable>
        <Pressable onPress={() => setShowAll(false)}>
          <Text style={!showAll ? styles.activeTab : styles.inactiveTab}>내 그룹만</Text>
          {!showAll && <View style={styles.underline} />}
        </Pressable>
      </View>

      <ScrollView style={[styles.container, styles.rankList]}>
        {visibleGroups.map((group) => (
          <View key={group.group_id} style={styles.groupRow}>
            <Text style={styles.ranking}>{group.rank}</Text>
            <Text style={styles.groupItem}>{group.group_name}</Text>
            <Image source={require("../assets/불.png")} style={styles.attendance} />
            <Text style={styles.attendanceText}>{group.attendance_count}</Text>
          </View>
        ))}
      </ScrollView>

      <BottomNav />
    </View>
  );
}
