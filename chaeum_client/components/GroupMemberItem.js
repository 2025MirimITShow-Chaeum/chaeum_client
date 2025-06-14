import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { fonts } from '../constants/fonts';

export default function GroupMemberItem({ name, color, image }) {
  return (
    <View style={styles.container}>
      <View style={[styles.avatarWrapper, { borderColor: color }]}>
        <Image
          source={{ uri: image }}
          style={styles.avatar}
        />
      </View>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 7,
  },
  avatarWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    overflow: 'hidden',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8F8F8',
  },
  name: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: fonts.regular,
    color: '#000',
  },
});
