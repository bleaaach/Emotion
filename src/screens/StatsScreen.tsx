import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Card from '../../components/Card';
import StatsChart from '../../components/StatsChart';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useTranslation from '../hooks/useTranslation';

const StatsScreen: React.FC = () => {
  const { t } = useTranslation();
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
    { icon: 'book', title: '日记记录', value: '18次', description: '本月已完成', iconColor: '#3b82f6', iconBackground: '#dbeafe' },
    { icon: 'fitness-center', title: 'CBT练习', value: '12次', description: '本月已完成', iconColor: '#10b981', iconBackground: '#dcfce7' },
    { icon: 'brain', title: '思维重构', value: '8次', description: '本月已完成', iconColor: '#8b5cf6', iconBackground: '#ede9fe' },
    { icon: 'person', title: '个人说明书', value: '5项', description: '本月已完成', iconColor: '#f59e0b', iconBackground: '#fef3c7' },
  ];

  // 情绪趋势数据
  const emotionTrendData = [
    { label: '周一', value: 60, color: '#10b981' },
    { label: '周二', value: 75, color: '#10b981' },
    { label: '周三', value: 40, color: '#10b981' },
    { label: '周四', value: 80, color: '#10b981' },
    { label: '周五', value: 55, color: '#10b981' },
    { label: '周六', value: 90, color: '#10b981' },
    { label: '周日', value: 70, color: '#10b981' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* 头部 */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{t('stats.title')}</Text>
        <View style={styles.timeSelector}>
          <TouchableOpacity style={styles.timeOption}>
            <Text style={styles.timeText}>{t('stats.tabs.week')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.timeOption, styles.timeOptionActive]}>
            <Text style={[styles.timeText, styles.timeTextActive]}>{t('stats.tabs.month')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeOption}>
            <Text style={styles.timeText}>{t('stats.tabs.quarter')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeOption}>
            <Text style={styles.timeText}>{t('stats.tabs.year')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 情绪分布 */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>{t('stats.emotionDistribution')}</Text>
        <View style={styles.chartContainer}>
          <View style={styles.chartBarsContainer}>
            <View style={styles.chartBarWrapper}>
              <View style={[styles.chartBar, { height: '60%', backgroundColor: '#a5f3fc' }]}></View>
              <Text style={styles.chartLabel}>平静</Text>
            </View>
            <View style={styles.chartBarWrapper}>
              <View style={[styles.chartBar, { height: '40%', backgroundColor: '#67e8f9' }]}></View>
              <Text style={styles.chartLabel}>快乐</Text>
            </View>
            <View style={styles.chartBarWrapper}>
              <View style={[styles.chartBar, { height: '70%', backgroundColor: '#06b6d4' }]}></View>
              <Text style={styles.chartLabel}>焦虑</Text>
            </View>
            <View style={styles.chartBarWrapper}>
              <View style={[styles.chartBar, { height: '30%', backgroundColor: '#0891b2' }]}></View>
              <Text style={styles.chartLabel}>悲伤</Text>
            </View>
            <View style={styles.chartBarWrapper}>
              <View style={[styles.chartBar, { height: '50%', backgroundColor: '#0e7490' }]}></View>
              <Text style={styles.chartLabel}>愤怒</Text>
            </View>
          </View>
        </View>
      </Card>

      {/* 思维模式分析 */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>{t('stats.thoughtPatterns')}</Text>
        <View style={styles.pieChartContainer}>
          <View style={styles.pieChart}>
            <View style={styles.pieChartInner}>
              <Text style={styles.pieChartTitle}>{t('stats.thoughtPatterns')}</Text>
              <Text style={styles.pieChartSubtitle}>{t('ai.history.title')}</Text>
            </View>
          </View>
        </View>
        <View style={styles.pieStatsContainer}>
          <View style={styles.pieStatItem}>
            <Text style={styles.pieStatValue}>40%</Text>
            <Text style={styles.pieStatLabel}>{t('stats.thoughtPatterns')}</Text>
          </View>
          <View style={styles.pieStatItem}>
            <Text style={styles.pieStatValue}>35%</Text>
            <Text style={styles.pieStatLabel}>{t('stats.thoughtPatterns')}</Text>
          </View>
          <View style={styles.pieStatItem}>
            <Text style={styles.pieStatValue}>25%</Text>
            <Text style={styles.pieStatLabel}>{t('stats.thoughtPatterns')}</Text>
          </View>
        </View>
      </Card>

      {/* 月度统计 */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>{t('stats.monthlyStats')}</Text>
        {monthlyStats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <View style={[styles.statIconBackground, { backgroundColor: stat.iconBackground }]}>
                <Icon name={stat.icon} size={20} color={stat.iconColor} />
              </View>
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
        <Text style={styles.cardTitle}>{t('stats.emotionTrend')}</Text>
        <View style={styles.trendChartContainer}>
          <View style={styles.trendBarsContainer}>
            <View style={styles.trendBarWrapper}>
              <View style={[styles.trendBar, { height: '60%', backgroundColor: '#10b981' }]}></View>
              <Text style={styles.trendLabel}>周一</Text>
            </View>
            <View style={styles.trendBarWrapper}>
              <View style={[styles.trendBar, { height: '75%', backgroundColor: '#10b981' }]}></View>
              <Text style={styles.trendLabel}>周二</Text>
            </View>
            <View style={styles.trendBarWrapper}>
              <View style={[styles.trendBar, { height: '40%', backgroundColor: '#10b981' }]}></View>
              <Text style={styles.trendLabel}>周三</Text>
            </View>
            <View style={styles.trendBarWrapper}>
              <View style={[styles.trendBar, { height: '80%', backgroundColor: '#10b981' }]}></View>
              <Text style={styles.trendLabel}>周四</Text>
            </View>
            <View style={styles.trendBarWrapper}>
              <View style={[styles.trendBar, { height: '55%', backgroundColor: '#10b981' }]}></View>
              <Text style={styles.trendLabel}>周五</Text>
            </View>
            <View style={styles.trendBarWrapper}>
              <View style={[styles.trendBar, { height: '90%', backgroundColor: '#10b981' }]}></View>
              <Text style={styles.trendLabel}>周六</Text>
            </View>
            <View style={styles.trendBarWrapper}>
              <View style={[styles.trendBar, { height: '70%', backgroundColor: '#10b981' }]}></View>
              <Text style={styles.trendLabel}>周日</Text>
            </View>
          </View>
        </View>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  timeSelector: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  timeOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  timeOptionActive: {
    backgroundColor: 'white',
  },
  timeText: {
    fontSize: 14,
    color: '#000',
  },
  timeTextActive: {
    fontWeight: 'bold',
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
  chartContainer: {
    height: 128,
    marginBottom: 16,
  },
  chartBarsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  chartBarWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  chartBar: {
    width: 32,
    borderRadius: 4,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 12,
    color: '#666',
  },
  pieChartContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pieChart: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  pieChartInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieChartTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  pieChartSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  pieStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pieStatItem: {
    alignItems: 'center',
  },
  pieStatValue: {
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 4,
  },
  pieStatLabel: {
    fontSize: 12,
    color: '#999',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statIconContainer: {
    marginRight: 12,
  },
  statIconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  trendChartContainer: {
    height: 160,
  },
  trendBarsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  trendBarWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  trendBar: {
    width: 24,
    borderRadius: 4,
    marginBottom: 8,
  },
  trendLabel: {
    fontSize: 12,
    color: '#666',
  },
});

export default StatsScreen;