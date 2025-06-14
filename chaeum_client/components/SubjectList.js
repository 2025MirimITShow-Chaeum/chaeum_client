import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { styles } from './styles/SubjectList.styles';
import { COLORS } from '../constants/colors';

const SubjectList = ({ groups }) => {
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0]?.id);
  
  return(
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {groups.map(group => {
          const isSelected = group.id === selectedGroupId;
          return (
            <TouchableOpacity
              key={group.id}
              onPress={() => setSelectedGroupId(group.id)}
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
}

export default SubjectList;