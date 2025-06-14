import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { fonts } from '../constants/fonts';
import GroupMemberItem from './GroupMemberItem';

export default function GroupMemberList({ members }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      {members.map((member) => (
        <GroupMemberItem
          key={member.uid}
          name={member.nickname}
          color={member.color}
          image={member.profileImage}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingLeft: 20,
  },
});
