import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Card from './Card';

const DiaryListScreen: React.FC = () => {
  // 模拟日记数据
  const diaryEntries = [
    {
      id: '1',
      date: '2023-06-15',
      emotions: ['焦虑', '压力'],
      title: '工作压力很大',
    },
    {
      id: '2',
      date: '2023-06-14',
      emotions: ['平静', '快乐'],
      title: '美好的一天',
    },
    {
      id: '3',
      date: '2023-06-12',
      emotions: ['悲伤', '焦虑'],
      title: '想念家人',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>情绪日记</Text>
        <Text style={styles.headerSubtitle}>记录您的想法和感受</Text>
      </View>

      {diaryEntries.map((entry) => (
        <Card key={entry.id} style={styles.diaryCard}>
          <Text style={styles.date}>{entry.date}</Text>
          <Text style={styles.title}>{entry.title}</Text>
          <View style={styles.emotionsContainer}>
            {entry.emotions.map((emotion, index) => (
              <View key={index} style={styles.emotionTag}>
                <Text style={styles.emotionText}>{emotion}</Text>
              </View>
            ))}
          </View>
        </Card>
      ))}

      <Card style={styles.newDiaryCard}>
        <Text style={styles.newDiaryText}>+ 新建日记</Text>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  diaryCard: {
    marginBottom: 16,
    padding: 16,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emotionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emotionTag: {
    backgroundColor: '#e0f2fe',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  emotionText: {
    color: '#0284c7',
    fontSize: 14,
  },
  newDiaryCard: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
  },
  newDiaryText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DiaryListScreen;