import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import EmotionChip from './EmotionChip';
import Card from './Card';
import ProgressBar from './ProgressBar';

const HomeScreen: React.FC = () => {
  const emotions = ['平静', '快乐', '焦虑', '悲伤', '愤怒', '压力'];
  const [selectedEmotion, setSelectedEmotion] = React.useState('平静');
  const [emotionIntensity, setEmotionIntensity] = React.useState(0.4);

  return (
    <ScrollView style={styles.container}>
      {/* 欢迎区域 */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>下午好，用户</Text>
        <Text style={styles.subWelcomeText}>今天感觉如何？花几分钟记录一下您的情绪吧</Text>
      </View>

      {/* 快速记录情绪 */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>快速记录情绪</Text>
        <View style={styles.emotionChipsContainer}>
          {emotions.map((emotion) => (
            <TouchableOpacity 
              key={emotion} 
              onPress={() => setSelectedEmotion(emotion)}
            >
              <EmotionChip
                emotion={emotion}
                selected={selectedEmotion === emotion}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.intensityContainer}>
          <Text style={styles.intensityLabel}>情绪强度:</Text>
          <ProgressBar progress={emotionIntensity} style={styles.progressBar} />
        </View>
        <TouchableOpacity style={styles.recordButtonContainer}>
          <Text style={styles.recordButtonText}>记录情绪</Text>
        </TouchableOpacity>
      </Card>

      {/* 今日活动 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>今日活动</Text>
        <Text style={styles.seeAllText}>查看全部</Text>
      </View>

      <View style={styles.activitiesContainer}>
        <Card style={styles.activityCard}>
          <View style={styles.activityIconContainer}>
            <View style={[styles.activityIcon, { backgroundColor: '#dbeafe' }]}>
              <Text style={styles.activityIconText}>📚</Text>
            </View>
          </View>
          <Text style={styles.activityTitle}>情绪日记</Text>
          <Text style={styles.activityDescription}>记录您的想法和感受</Text>
        </Card>

        <Card style={styles.activityCard}>
          <View style={styles.activityIconContainer}>
            <View style={[styles.activityIcon, { backgroundColor: '#e9d5ff' }]}>
              <Text style={styles.activityIconText}>🧠</Text>
            </View>
          </View>
          <Text style={styles.activityTitle}>思维重构</Text>
          <Text style={styles.activityDescription}>挑战负面思维模式</Text>
        </Card>

        <Card style={styles.activityCard}>
          <View style={styles.activityIconContainer}>
            <View style={[styles.activityIcon, { backgroundColor: '#dcfce7' }]}>
              <Text style={styles.activityIconText}>📈</Text>
            </View>
          </View>
          <Text style={styles.activityTitle}>进度跟踪</Text>
          <Text style={styles.activityDescription}>查看您的进步</Text>
        </Card>

        <Card style={styles.activityCard}>
          <View style={styles.activityIconContainer}>
            <View style={[styles.activityIcon, { backgroundColor: '#fed7aa' }]}>
              <Text style={styles.activityIconText}>💪</Text>
            </View>
          </View>
          <Text style={styles.activityTitle}>CBT练习</Text>
          <Text style={styles.activityDescription}>实用技巧和练习</Text>
        </Card>
      </View>

      {/* AI洞察 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>AI洞察</Text>
        <Text style={styles.seeAllText}>查看全部</Text>
      </View>

      <Card style={styles.insightCard}>
        <View style={styles.insightItem}>
          <View style={[styles.insightIcon, { backgroundColor: '#dbeafe' }]}>
            <Text style={styles.insightIconText}>💡</Text>
          </View>
          <View style={styles.insightTextContainer}>
            <Text style={styles.insightTitle}>您本周的焦虑情绪有所下降</Text>
            <Text style={styles.insightDescription}>与上周相比，您的焦虑情绪减少了15%。继续保持记录和练习！</Text>
          </View>
        </View>

        <View style={styles.insightItem}>
          <View style={[styles.insightIcon, { backgroundColor: '#e9d5ff' }]}>
            <Text style={styles.insightIconText}>📈</Text>
          </View>
          <View style={styles.insightTextContainer}>
            <Text style={styles.insightTitle}>思维模式分析</Text>
            <Text style={styles.insightDescription}>您倾向于使用"黑白思维"模式，建议尝试更灵活的思考方式。</Text>
          </View>
        </View>
      </Card>

      {/* 本周情绪趋势 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>本周情绪趋势</Text>
        <Text style={styles.seeAllText}>详细查看</Text>
      </View>

      <Card style={styles.trendCard}>
        <View style={styles.chartContainer}>
          <View style={styles.chartBarsContainer}>
            <View style={styles.chartBarWrapper}>
              <View style={[styles.chartBar, { height: '40%', backgroundColor: '#bfdbfe' }]}></View>
              <Text style={styles.chartLabel}>周一</Text>
            </View>
            <View style={styles.chartBarWrapper}>
              <View style={[styles.chartBar, { height: '60%', backgroundColor: '#93c5fd' }]}></View>
              <Text style={styles.chartLabel}>周二</Text>
            </View>
            <View style={styles.chartBarWrapper}>
              <View style={[styles.chartBar, { height: '80%', backgroundColor: '#60a5fa' }]}></View>
              <Text style={styles.chartLabel}>周三</Text>
            </View>
            <View style={styles.chartBarWrapper}>
              <View style={[styles.chartBar, { height: '70%', backgroundColor: '#3b82f6' }]}></View>
              <Text style={styles.chartLabel}>周四</Text>
            </View>
            <View style={styles.chartBarWrapper}>
              <View style={[styles.chartBar, { height: '50%', backgroundColor: '#60a5fa' }]}></View>
              <Text style={styles.chartLabel}>周五</Text>
            </View>
            <View style={styles.chartBarWrapper}>
              <View style={[styles.chartBar, { height: '65%', backgroundColor: '#93c5fd' }]}></View>
              <Text style={styles.chartLabel}>周六</Text>
            </View>
            <View style={styles.chartBarWrapper}>
              <View style={[styles.chartBar, { height: '45%', backgroundColor: '#bfdbfe' }]}></View>
              <Text style={styles.chartLabel}>周日</Text>
            </View>
          </View>
          <View style={styles.chartLegend}>
            <Text style={styles.legendText}>情绪低落</Text>
            <Text style={styles.legendText}>情绪良好</Text>
          </View>
        </View>
      </Card>

      {/* 个人说明书推荐 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>个人说明书推荐</Text>
        <Text style={styles.seeAllText}>查看全部</Text>
      </View>

      <Card style={styles.recommendationCard}>
        <View style={styles.recommendationContent}>
          <View style={[styles.recommendationIcon, { backgroundColor: '#e9d5ff' }]}>
            <Text style={styles.recommendationIconText}>👤</Text>
          </View>
          <View style={styles.recommendationTextContainer}>
            <Text style={styles.recommendationTitle}>了解您的压力触发因素</Text>
            <Text style={styles.recommendationDescription}>回答几个问题，帮助您更好地理解压力来源</Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>开始探索</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>

      {/* 练习推荐 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>推荐练习</Text>
        <Text style={styles.seeAllText}>查看全部</Text>
      </View>

      <Card style={styles.exerciseCard}>
        <View style={styles.exerciseContent}>
          <View style={[styles.exerciseIcon, { backgroundColor: '#dcfce7' }]}>
            <Text style={styles.exerciseIconText}>🍃</Text>
          </View>
          <View style={styles.exerciseTextContainer}>
            <Text style={styles.exerciseTitle}>呼吸放松法</Text>
            <Text style={styles.exerciseDescription}>通过深呼吸缓解焦虑和压力</Text>
            <View style={styles.exerciseBottomRow}>
              <Text style={styles.exerciseDuration}>5-10分钟</Text>
              <TouchableOpacity style={styles.startExerciseButton}>
                <Text style={styles.startExerciseButtonText}>开始练习</Text>
              </TouchableOpacity>
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
  welcomeContainer: {
    backgroundColor: '#e0f2fe',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subWelcomeText: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emotionChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  intensityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  intensityLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  progressBar: {
    flex: 1,
  },
  recordButtonContainer: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  recordButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#007AFF',
    fontSize: 14,
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityCard: {
    width: '48%',
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIconContainer: {
    marginBottom: 12,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIconText: {
    fontSize: 24,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  insightCard: {
    padding: 16,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  insightItemLast: {
    marginBottom: 0,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightIconText: {
    fontSize: 16,
  },
  insightTextContainer: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    color: '#666',
  },
  trendCard: {
    padding: 16,
  },
  chartContainer: {
    height: 150,
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
    width: 24,
    borderRadius: 4,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 12,
    color: '#666',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  legendText: {
    fontSize: 12,
    color: '#999',
  },
  recommendationCard: {
    padding: 16,
  },
  recommendationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  recommendationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recommendationIconText: {
    fontSize: 16,
  },
  recommendationTextContainer: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  exploreButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  exploreButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  exerciseCard: {
    padding: 16,
    marginBottom: 16,
  },
  exerciseContent: {
    flexDirection: 'row',
  },
  exerciseIcon: {
    width: 64,
    height: 64,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  exerciseIconText: {
    fontSize: 24,
  },
  exerciseTextContainer: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  exerciseBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseDuration: {
    fontSize: 12,
    color: '#999',
  },
  startExerciseButton: {
    backgroundColor: '#10b981',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  startExerciseButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomeScreen;