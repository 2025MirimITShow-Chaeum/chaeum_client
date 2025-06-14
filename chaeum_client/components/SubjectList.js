import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { styles } from './styles/SubjectList.styles';
import { COLORS } from '../constants/colors';

const SubjectList = ({ groups, selectedGroupId, onSelectGroup }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {groups.map(group => {
          const isSelected = group.group_id === selectedGroupId;
          return (
            <TouchableOpacity
              key={group.group_id}
              onPress={() => onSelectGroup(group.group_id)}
              style={[
                styles.groupButton,
                {
                  backgroundColor: isSelected ? group.color : COLORS.line,
                },
              ]}
            >
              <Text style={[styles.groupText, isSelected && { color: '#fff' }]}>
                {group.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default SubjectList;
