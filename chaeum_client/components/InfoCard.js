import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { styles } from './styles/InfoCard.styles';

const InfoCard = ({ title, icon, onIconPress, children, contentStyle }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onIconPress}>
          {icon}
        </TouchableOpacity>
      </View>
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    </View>
  );
};

export default InfoCard;
