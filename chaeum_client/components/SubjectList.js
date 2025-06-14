import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { styles } from './styles/SubjectList.styles';
import { COLORS } from '../constants/colors';

const SubjectList = ({ groups }) => {
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  useEffect(() => {
    if (groups.length > 0 && !selectedGroupId) {
      setSelectedGroupId(groups[0].group_id || groups[0].id);
    }
  }, [groups]);
  
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {groups.map(group => {
          const groupId = group.group_id || group.id;
          const isSelected = groupId === selectedGroupId;
          return (
            <TouchableOpacity
              key={groupId}
              onPress={() => setSelectedGroupId(groupId)}
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