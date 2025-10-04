import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface StatsChartProps {
  data: ChartData[];
  type: 'bar' | 'line';
  style?: object;
}

const StatsChart: React.FC<StatsChartProps> = ({ data, type, style }) => {
  // 计算最大值用于比例计算
  const maxValue = Math.max(...data.map(item => item.value), 1);
  
  return (
    <View style={[styles.container, style]}>
      {type === 'bar' ? (
        // 柱状图
        <View style={styles.chartContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.barContainer}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color
                  }
                ]} 
              />
              <Text style={styles.label}>{item.label}</Text>
            </View>
          ))}
        </View>
      ) : (
        // 折线图 (简化版)
        <View style={styles.lineChartContainer}>
          <View style={styles.lineContainer}>
            {data.map((item, index) => (
              <View 
                key={index} 
                style={[
                  styles.linePoint,
                  { 
                    left: `${(index / (data.length - 1)) * 100}%`,
                    bottom: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color
                  }
                ]} 
              />
            ))}
          </View>
          <View style={styles.xAxisLabels}>
            {data.map((item, index) => (
              <Text key={index} style={styles.xAxisLabel}>{item.label}</Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 150,
    justifyContent: 'space-around',
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 4,
  },
  label: {
    marginTop: 8,
    fontSize: 10,
    color: '#666',
  },
  lineChartContainer: {
    height: 150,
  },
  lineContainer: {
    flex: 1,
    position: 'relative',
  },
  linePoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    transform: [{ translateX: -4 }, { translateY: 4 }],
  },
  xAxisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  xAxisLabel: {
    fontSize: 10,
    color: '#666',
  },
});

export default StatsChart;