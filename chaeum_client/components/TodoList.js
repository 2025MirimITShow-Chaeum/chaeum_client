import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image
} from "react-native";
import { styles } from "./styles/TodoList.styles";
import StarIcon from "../assets/Star.svg";
import CheckIcon from "../assets/check.svg";

export default function TodoList({ title, is_completed, initialLiked, memberColor }) {
  const [starred, setStarred] = useState(is_completed);
  const [liked, setLiked] = useState(initialLiked);

  return (
    <View style={styles.TodoBox}>
      <View style={styles.row}>
        <Pressable onPress={() => setStarred(prev => !prev)}>
          <View style={styles.iconContainer}>
            <StarIcon
              width={24}
              height={24}
              color={starred ? memberColor : "#D9D9D9"}
            />
            {starred && <CheckIcon style={styles.checkIcon} />}
          </View>
        </Pressable>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Pressable onPress={() => setLiked(prev => !prev)}>
        <Image
          source={
            liked
              ? require("../assets/하트.png")
              : require("../assets/빈하트.png")
          }
          style={styles.heart}
        />
      </Pressable>
    </View>
  );
}
