import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../assets/backArrow.png')} style={styles.backArrow} />
      </TouchableOpacity>
      <Image source={require('../assets/logoText.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backArrow: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  logo: {
    width: 71,
    height: 29,
    resizeMode: 'contain',
  },
});
