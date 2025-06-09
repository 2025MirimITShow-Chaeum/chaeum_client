import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import PlannerCell from './PlannerCell';
import { generateTimeSlots } from './utils';

const Planner = ({ studyData }) => {
  const columns = Array.from({ length: 24 }, (_, i) => i); // 6시~5시
  const rowsPerHour = 6; // 10분 단위 × 6 = 1시간

  const getCellColor = (hour, minuteIndex) => {
    const slot = new Date();
    slot.setHours((6 + hour) % 24);
    slot.setMinutes(minuteIndex * 10);
    slot.setSeconds(0);
    slot.setMilliseconds(0);

    const matched = studyData.find((item) => {
      const start = new Date(item.startTime).getTime();
      const end = new Date(item.endTime).getTime();
      const current = slot.getTime();
      return current >= start && current < end;
    });

    return matched?.groupColor || '#fff';
  };

  return (
    <ScrollView horizontal>
      <View>
        {/* 시간 헤더 (X축) */}
        <View style={styles.columnHeaderRow}>
          {columns.map((col) => (
            <View key={col} style={styles.columnHeaderCell}>
              <Text style={styles.timeText}>
                {(6 + col) % 24 === 0 ? 24 : (6 + col) % 24}
              </Text>
            </View>
          ))}
        </View>

        {/* 셀 영역 */}
        {Array.from({ length: rowsPerHour }).map((_, rowIdx) => (
          <View key={rowIdx} style={styles.row}>
            {columns.map((colIdx) => (
              <PlannerCell
                key={`${colIdx}-${rowIdx}`}
                color={getCellColor(colIdx, rowIdx)}
              />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  columnHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnHeaderCell: {
    width: 21.48,
    height: 21.51,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  timeText: {
    fontSize: 10,
    color: '#646464',
  },
});

export default Planner;
