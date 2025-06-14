import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles/NameTag.styles';

export default function NameTag({ name, showPlus = true }) {
  return (
    <View style={[
        styles.container,
        { backgroundColor: showPlus ? '#F1F1F1' : '#666' },
      ]}>
      <Text style={styles.name}>{name}</Text>
      {showPlus && (
        <Image
          source={require('../assets/plus.png')}
          style={styles.plusIcon}
        />
      )}
    </View>
  );
}
