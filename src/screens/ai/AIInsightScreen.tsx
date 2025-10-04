import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Card from '../../../components/Card';
import InsightCard from '../../../components/InsightCard';
import useTranslation from '../../hooks/useTranslation';

const AIInsightScreen: React.FC = () => {
  const { t } = useTranslation();
  // 模拟今日洞察数据
  const todayInsights = [
    {
      id: '1',
      title: '情绪模式识别',
      content: '您在过去一周中，焦虑情绪通常在下午2点到4点之间达到峰值，建议在这个时间段进行深呼吸练习。',
      icon: 'insights',
      iconColor: '#3b82f6',
      iconBackgroundColor: '#dbeafe',
    },
    {
      id: '2',
      title: '思维模式分析',
      content: '检测到您经常使用"全或无"的思维模式，这可能加剧负面情绪。尝试使用更平衡的思维方式。',
      icon: 'psychology',
      iconColor: '#8b5cf6',
      iconBackgroundColor: '#ede9fe',
    },
  ];

  // 模拟个性化建议数据
  const personalizedSuggestions = [
    {
      id: '1',
      title: '深呼吸练习',
      content: '当感到焦虑时，尝试4-7-8呼吸法：吸气4秒，屏息7秒，呼气8秒。',
      icon: 'air',
      iconColor: '#10b981',
      iconBackgroundColor: '#dcfce7',
    },
    {
      id: '2',
      title: '感恩日记',
      content: '每天记录3件让您感恩的事情，有助于培养积极心态。',
      icon: 'book',
      iconColor: '#f59e0b',
      iconBackgroundColor: '#fef3c7',
    },
  ];

  // 模拟AI分析历史数据
  const aiAnalysisHistory = [
    { id: '1', date: '今天', title: '情绪波动分析' },
    { id: '2', date: '昨天', title: '思维模式识别' },
    { id: '3', date: '3天前', title: '压力源分析' },
    { id: '4', date: '5天前', title: '睡眠质量关联分析' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('ai.title')}</Text>
        <Text style={styles.headerSubtitle}>{t('ai.title')}</Text>
      </View>

      {/* 今日洞察 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('ai.insights.title')}</Text>
        {todayInsights.map((insight) => (
          <InsightCard
            key={insight.id}
            title={insight.title}
            content={insight.content}
            icon={insight.icon}
            iconColor={insight.iconColor}
            iconBackgroundColor={insight.iconBackgroundColor}
          />
        ))}
      </View>

      {/* 个性化建议 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('ai.suggestions.title')}</Text>
        {personalizedSuggestions.map((suggestion) => (
          <Card key={suggestion.id} style={styles.suggestionCard}>
            <View style={styles.suggestionHeader}>
              <View style={[styles.iconContainer, { backgroundColor: suggestion.iconBackgroundColor }]}>
                <Text style={[styles.iconText, { color: suggestion.iconColor }]}>
                  {suggestion.icon.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
            </View>
            <Text style={styles.suggestionContent}>{suggestion.content}</Text>
            <TouchableOpacity style={styles.suggestionButton}>
              <Text style={styles.suggestionButtonText}>{t('ai.suggestions.start')}</Text>
            </TouchableOpacity>
          </Card>
        ))}
      </View>

      {/* AI分析历史 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('ai.history.title')}</Text>
        {aiAnalysisHistory.map((history) => (
          <Card key={history.id} style={styles.historyItem}>
            <View style={styles.historyContent}>
              <Text style={styles.historyDate}>{history.date}</Text>
              <Text style={styles.historyTitle}>{history.title}</Text>
            </View>
            <TouchableOpacity style={styles.historyButton}>
              <Text style={styles.historyButtonText}>{t('ai.history.viewDetails')}</Text>
            </TouchableOpacity>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  suggestionCard: {
    padding: 16,
    marginBottom: 16,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestionContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  suggestionButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  suggestionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
  },
  historyContent: {
    flex: 1,
  },
  historyDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyButton: {
    padding: 8,
  },
  historyButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default AIInsightScreen;