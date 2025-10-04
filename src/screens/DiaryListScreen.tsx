import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Card from '../../components/Card';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useTranslation from '../hooks/useTranslation';
import diaryService, { DiaryEntry } from '../services/DiaryService';

const DiaryListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation();
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  
  // 获取日记数据
  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const entries = await diaryService.getAllEntries();
        setDiaryEntries(entries);
      } catch (error) {
        console.error('获取日记列表失败:', error);
      }
    };
    
    fetchDiaryEntries();
    
    // 当返回到此页面时重新获取数据
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDiaryEntries();
    });
    
    return unsubscribe;
  }, [navigation]);
  
  const getEmotionColor = (emotionType: string) => {
    switch (emotionType) {
      case '平静': return '#10b981';
      case '焦虑': return '#f59e0b';
      case '悲伤': return '#8b5cf6';
      case '愤怒': return '#ef4444';
      default: return '#10b981';
    }
  };
  
  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('diary.list.title')}</Text>
        <TouchableOpacity 
          style={styles.newEntryButton}
          onPress={() => navigation.navigate('DiaryWizard')}
        >
          <Icon name="add" size={16} color="#fff" />
          <Text style={styles.newEntryButtonText}>{t('diary.list.newEntry')}</Text>
        </TouchableOpacity>
      </View>
      
      {/* 标签页 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabItem, styles.tabActive]}>
          <Text style={styles.tabTextActive}>{t('diary.list.tabs.all')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>{t('diary.list.tabs.anxious')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>{t('diary.list.tabs.calm')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>{t('diary.list.tabs.sad')}</Text>
        </TouchableOpacity>
      </View>

      {/* 日记列表 */}
      <ScrollView style={styles.listContainer}>
        {diaryEntries.map((entry) => (
          <TouchableOpacity 
            key={entry.id} 
            onPress={() => navigation.navigate('DiaryDetail', { diary: entry })}
          >
            <Card style={styles.diaryCard}>
              <View style={[styles.emotionIndicator, { backgroundColor: getEmotionColor(entry.emotionType) }]} />
              <View style={styles.cardContent}>
                <Text style={styles.title}>{entry.title}</Text>
                <Text style={styles.excerpt}>{entry.excerpt}</Text>
                <View style={styles.footer}>
                  <Text style={styles.emotions}>{entry.emotions.join(' · ')}</Text>
                  <Text style={styles.date}>{formatDate(entry.date)}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 新增日记按钮 */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => navigation.navigate('DiaryWizard')}
      >
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
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
    paddingTop: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  newEntryButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  newEntryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 16,
  },
  tabItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    color: '#000',
  },
  tabTextActive: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  diaryCard: {
    flexDirection: 'row',
    marginBottom: 12,
    padding: 16,
    backgroundColor: 'white',
  },
  emotionIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  excerpt: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emotions: {
    fontSize: 12,
    color: '#999',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DiaryListScreen;