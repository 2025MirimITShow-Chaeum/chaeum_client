import React, { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { styles } from './styles/TodoList.styles';
import { COLORS } from '../constants/colors';
import StarIcon from '../assets/Star.svg';
import CheckIcon from '../assets/check.svg';

const TodoList = ({
  title = '1과 본문 1회독',
  is_completed,
  initialLiked,
  memberColor = COLORS.sora,
}) => {
  const [starred, setStarred] = useState(is_completed);
  const [liked, setLiked] = useState(initialLiked);

  const toggleStar = () => setStarred(prev => !prev);
  const toggleHeart = () => setLiked(prev => !prev);

  return (
    <View style={styles.TodoBox}>
      <View style={styles.row}>
        <Pressable onPress={toggleStar}>
          <View style={styles.iconContainer}>
            <StarIcon
              width={24}
              height={24}
              color={starred ? memberColor : '#D9D9D9'}
            />
            {starred && (
              <CheckIcon
                style={styles.checkIcon}
              />
            )}
          </View>
        </Pressable>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Pressable onPress={toggleHeart}>
        <Image
          source={
            liked
              ? require('../assets/하트.png')
              : require('../assets/빈하트.png')
          }
          style={styles.heart}
        />
      </Pressable>
    </View>
  );
}

export default TodoList;
