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
      {/* Top 3 */}
      {top3Groups.map((group, index) => (
        <View
          key={group.group_id}
          style={[styles.groupContainer, styles[`rank${index + 1}`]]}
        >
          <Text style={styles.groupName}>
            {index === 0 ? "😱 " : ""}
            {group.group_name}
          </Text>
          <Image
            source={
              index === 0
                ? require("../assets/1등.png")
                : index === 1
                ? require("../assets/2등.png")
                : require("../assets/3등.png")
            }
            style={styles.trophyImg}
          />
        </View>
      ))}

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
