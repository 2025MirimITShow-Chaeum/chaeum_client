// constants/GlobalScreenWrapper.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function GlobalScreenWrapper({ children, noPadding = false }) {
  return (
    <View style={[styles.screen, noPadding && styles.noPadding]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 31,
  },
});
