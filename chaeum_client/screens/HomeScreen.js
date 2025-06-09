import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomNav from "../components/BottomNav"; 
import StudyTaskItem from "../components/StudyTaskItem";
import Profile from "../components/profile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 31 }}>
      <View style={styles.timerSection}>
        <Text style={styles.date}>06월 20일 (금)</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Timer")}>
          <Text style={styles.timer}>00:00:00</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Profile/>
        <StudyTaskItem />

        <Image
          source={require("../assets/homeLogo.png")}
          style={styles.image}
        />
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  timerSection: {
    width: 390,
    height: 177,
    backgroundColor: "#F57353",
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
  },
  timer: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  body: {
    padding: 20,
  },
  image: {
    width: 328,
    height: 195,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
