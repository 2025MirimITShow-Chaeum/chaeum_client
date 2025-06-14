import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native";

// 아이콘 주석 : 디자인과는 조금 다르지만 화질이 좋음, 일단 이미지로 했음
export default function BottomNav() {
  const navigation = useNavigation();
  const route = useRoute();
  const current = route.name;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Group")} // 이동할 페이지 넣기 일단은 임시
      >
        {/* <Ionicons
          name="people-outline"
          size={24}
          color={current === "GroupScreen" ? "#F57353" : "#ABB0BC"}
        />
        <Text style={[styles.text, current === "GroupScreen" && styles.active]}>
          Group
        </Text> */}
        <Image
          source={
            current === "Group"
              ? require("../assets/nav_group_active.png")
              : require("../assets/nav_group_inactive.png")
          }
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Home")}
      >
        {/* <MaterialCommunityIcons
          name="timer-outline"
          size={24}
          color={current === "HomeScreen" ? "#F57353" : "#ABB0BC"}
        />
        <Text style={[styles.text, current === "HomeScreen" && styles.active]}>
          Home
        </Text> */}
        <Image
          source={
            current === "Home"
              ? require("../assets/nav_home_active.png")
              : require("../assets/nav_home_inactive.png")
          }
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Profile")} // 이동할 페이지 넣기 일단은 임시
      >
        {/* <Ionicons
          name="person-outline"
          size={24}
          color={current === "ProfileScreen" ? "#F57353" : "#ABB0BC"}
        />
        <Text
          style={[styles.text, current === "ProfileScreen" && styles.active]}
        >
          Profile
        </Text> */}
        <Image
          source={
            current === "Profile"
              ? require("../assets/nav_profile_active.png")
              : require("../assets/nav_profile_inactive.png")
          }
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 95,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    zIndex: 10,
    paddingBottom: 20,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
  //   text: {
  //     fontSize: 12,
  //     color: "#ABB0BC",
  //     marginTop: 4,
  //   },
  //   active: {
  //     color: "#F57353",
  //     fontWeight: "bold",
  //   },
  icon: {
    width: 32,
    height: 47,
    resizeMode: "contain",
  },
});
