import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Card from '../../../components/Card';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useTranslation from '../../hooks/useTranslation';

const InsightDetailScreen: React.FC = () => {
  const { t } = useTranslation();
  // 模拟洞察详情数据
  const insightDetail = {
    title: '情绪波动分析',
    date: '2023年3月15日',
    content: '通过对您过去30天的情绪记录进行分析，我们发现您的情绪波动与睡眠质量、工作压力和社交活动密切相关。特别是在工作日的下午时段，焦虑情绪出现频率较高。',
    dataEvidence: [
      '焦虑情绪峰值时间：下午2-4点（85%置信度）',
      '平静情绪高峰期：早晨6-8点（92%置信度）',
      '情绪波动与睡眠质量相关性：0.76',
      '工作日与周末情绪差异显著（p<0.05）'
    ],
    relatedDiaries: [
      { id: '1', date: '今天 14:30', title: '工作压力' },
      { id: '2', date: '昨天 15:20', title: '会议焦虑' },
      { id: '3', date: '3月13日 14:45', title: '项目汇报紧张' }
    ]
  };

  return (
    <ScrollView style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('ai.detail.title')}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 洞察标题和日期 */}
      <View style={styles.titleContainer}>
        <Text style={styles.insightTitle}>{insightDetail.title}</Text>
        <Text style={styles.insightDate}>{insightDetail.date}</Text>
      </View>

      {/* 洞察内容 */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>{t('ai.detail.title')}</Text>
        <Text style={styles.cardContent}>{insightDetail.content}</Text>
      </Card>

      {/* 数据支撑证据 */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>{t('ai.detail.title')}</Text>
        {insightDetail.dataEvidence.map((evidence, index) => (
          <View key={index} style={styles.evidenceItem}>
            <Icon name="check-circle" size={16} color="#10b981" style={styles.evidenceIcon} />
            <Text style={styles.evidenceText}>{evidence}</Text>
          </View>
        ))}
      </Card>

      {/* 相关日记条目 */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>{t('diary.list.title')}</Text>
        {insightDetail.relatedDiaries.map((diary) => (
          <TouchableOpacity key={diary.id} style={styles.diaryItem}>
            <View style={styles.diaryContent}>
              <Text style={styles.diaryDate}>{diary.date}</Text>
              <Text style={styles.diaryTitle}>{diary.title}</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </Card>

      {/* 用户反馈 */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>{t('ai.detail.title')}</Text>
        <View style={styles.feedbackContainer}>
          <TouchableOpacity style={[styles.feedbackButton, styles.feedbackHelpful]}>
            <Icon name="thumb-up" size={20} color="#10b981" />
            <Text style={styles.feedbackText}>{t('common.ok')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.feedbackButton, styles.feedbackNotHelpful]}>
            <Icon name="thumb-down" size={20} color="#ef4444" />
            <Text style={styles.feedbackText}>{t('common.cancel')}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportButtonText}>{t('profile.menu.help')}</Text>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  titleContainer: {
    padding: 24,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  insightTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  insightDate: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    margin: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  evidenceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  evidenceIcon: {
    marginTop: 3,
    marginRight: 12,
  },
  evidenceText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  diaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  diaryItemLast: {
    borderBottomWidth: 0,
  },
  diaryContent: {
    flex: 1,
  },
  diaryDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  diaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    justifyContent: 'center',
  },
  feedbackHelpful: {
    backgroundColor: '#dcfce7',
  },
  feedbackNotHelpful: {
    backgroundColor: '#fee2e2',
  },
  feedbackText: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  reportButton: {
    alignItems: 'center',
  },
  reportButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default InsightDetailScreen;