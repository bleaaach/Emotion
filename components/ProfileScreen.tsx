import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Card from './Card';
import InsightCard from './InsightCard';

const ProfileScreen: React.FC = () => {
  // 模拟个人数据
  const profileData = {
    name: '用户',
    memberSince: '2023年1月',
    streak: 12,
    totalEntries: 42,
  };

  // 模拟洞察数据
  const insights = [
    {
      id: '1',
      title: '情绪模式识别',
      content: '您通常在周末感到更平静，而在工作日的下午情绪波动较大。',
      icon: '🧠',
      iconColor: '#fff',
      iconBackgroundColor: '#8b5cf6',
    },
    {
      id: '2',
      title: '进步轨迹',
      content: '过去一个月中，您记录焦虑情绪的频率下降了25%。',
      icon: '📈',
      iconColor: '#fff',
      iconBackgroundColor: '#10b981',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>下午好，{profileData.name}</Text>
        <Text style={styles.memberInfo}>会员时长: {profileData.memberSince}</Text>
      </View>

      {/* 统计卡片 */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>{profileData.streak}</Text>
          <Text style={styles.statLabel}>连续记录(天)</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>{profileData.totalEntries}</Text>
          <Text style={styles.statLabel}>总记录数</Text>
        </Card>
      </View>

      {/* 洞察卡片 */}
      <Text style={styles.sectionTitle}>个人洞察</Text>
      {insights.map((insight) => (
        <InsightCard
          key={insight.id}
          title={insight.title}
          content={insight.content}
          icon={insight.icon}
          iconColor={insight.iconColor}
          iconBackgroundColor={insight.iconBackgroundColor}
        />
      ))}

      {/* 设置选项 */}
      <Text style={styles.sectionTitle}>设置</Text>
      <Card style={styles.settingCard}>
        <Text style={styles.settingText}>通知设置</Text>
      </Card>
      <Card style={styles.settingCard}>
        <Text style={styles.settingText}>隐私设置</Text>
      </Card>
      <Card style={styles.settingCard}>
        <Text style={styles.settingText}>账户设置</Text>
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
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  memberInfo: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingCard: {
    padding: 16,
    marginBottom: 12,
  },
  settingText: {
    fontSize: 16,
  },
});

export default ProfileScreen;