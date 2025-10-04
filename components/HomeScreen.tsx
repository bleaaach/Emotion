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
            <View 
              key={emotion} 
              style={styles.emotionChipWrapper}
            >
              <TouchableOpacity 
                onPress={() => setSelectedEmotion(emotion)}
              >
                <EmotionChip
                  emotion={emotion}
                  selected={selectedEmotion === emotion}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.intensityContainer}>
          <Text style={styles.intensityLabel}>情绪强度:</Text>
          <ProgressBar progress={emotionIntensity} style={styles.progressBar} />
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.recordButton}>记录情绪</Text>
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
      </View>
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
    marginBottom: 24,
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
  emotionChipWrapper: {
    marginRight: 8,
    marginBottom: 8,
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
  buttonContainer: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  recordButton: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
    justifyContent: 'space-between',
  },
  activityCard: {
    width: '48%',
    padding: 16,
    alignItems: 'center',
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
});

export default HomeScreen;