import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Card from '../../components/Card';
import StatsChart from '../../components/StatsChart';

const StatsScreen: React.FC = () => {
  // 模拟情绪分布数据
  const emotionData = [
    { label: '平静', value: 18, color: '#10b981' },
    { label: '快乐', value: 12, color: '#f59e0b' },
    { label: '焦虑', value: 8, color: '#ef4444' },
    { label: '悲伤', value: 5, color: '#8b5cf6' },
    { label: '愤怒', value: 3, color: '#f97316' },
  ];

  // 月度统计数据
  const monthlyStats = [
    { icon: '📚', title: '日记记录', value: '18次', description: '本月已完成' },
    { icon: '💪', title: 'CBT练习', value: '12次', description: '本月已完成' },
    { icon: '🎯', title: '目标完成', value: '5个', description: '本月已完成' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>数据统计</Text>

      {/* 情绪分布图表 */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>情绪分布</Text>
        <StatsChart data={emotionData} type="bar" style={styles.chart} />
      </Card>

      {/* 月度统计 */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>月度统计</Text>
        {monthlyStats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statTitle}>{stat.title}</Text>
              <Text style={styles.statDescription}>{stat.description}</Text>
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        ))}
      </Card>

      {/* 情绪趋势 */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>情绪趋势</Text>
        <StatsChart 
          data={[
            { label: '周一', value: 60, color: '#10b981' },
            { label: '周二', value: 75, color: '#10b981' },
            { label: '周三', value: 40, color: '#10b981' },
            { label: '周四', value: 80, color: '#10b981' },
            { label: '周五', value: 55, color: '#10b981' },
            { label: '周六', value: 90, color: '#10b981' },
            { label: '周日', value: 70, color: '#10b981' },
          ]} 
          type="line" 
          style={styles.chart} 
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    marginBottom: 24,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chart: {
    height: 200,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statIcon: {
    fontSize: 20,
  },
  statInfo: {
    flex: 1,
  },
  statTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statDescription: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StatsScreen;