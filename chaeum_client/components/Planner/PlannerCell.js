// 셀 한칸
import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../../constants/colors';

const PlannerCell = ({ color }) => {
  return (
    <View
      style={{
        width: 21.48,
        height: 21.51,
        borderWidth: 0.5,
        borderColor: COLORS.line,
        backgroundColor: color || '#fff',
      }}
    />
  );
};

export default PlannerCell;

