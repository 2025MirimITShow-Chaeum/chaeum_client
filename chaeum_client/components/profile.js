import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import { styles } from './styles/Profile.styles';
import { fetchUserInfo } from "../utils/api";

const Profile = ({ style, likes = 3 }) => {
  const [user, setUser] = useState({ name: "", slogan: "" });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserInfo();
        setUser({
          name: data.nickname ?? "사용자",
          slogan: data.slogan ?? "당신의 슬로건을 적어보세요",
          profile_image: data.profile_image ?? ""
        });
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      }
    };

    loadUser();
  }, []);
  {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.profileBox}>
          <View style={styles.circle}>
            <Image
              source={user.profile_image
                ? { uri: `data:image/png;base64,${user.profile_image}` }
                : require('../assets/icon.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.profile}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.slogan}>{user.slogan}</Text>
          </View>
        </View>

        <View style={styles.reactions}>
          <View style={[styles.reaction, { marginBottom: 4 }]}>
            <Image source={require('../assets/불.png')} style={styles.fire} />
            <Text style={styles.reactionText}>7</Text>
          </View>
          <View style={styles.reaction}>
            <Image source={require('../assets/하트.png')} style={styles.heart} />
            <Text style={styles.reactionText}>{likes}</Text>
          </View>
        </View>

      </View>
    );
  }
}

export default Profile;
