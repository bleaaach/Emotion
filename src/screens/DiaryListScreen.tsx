import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import Card from '../../components/Card';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useTranslation from '../hooks/useTranslation';
import diaryService, { DiaryEntry } from '../services/DiaryService';
import { Swipeable } from 'react-native-gesture-handler';

const DiaryListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation();
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<DiaryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('all');
  
  // 获取日记数据
  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const entries = await diaryService.getAllEntries();
        console.log('Diary entries:', entries); // 添加调试日志
        setDiaryEntries(entries);
        setFilteredEntries(entries);
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
  
  // 筛选和搜索功能
  useEffect(() => {
    let result = [...diaryEntries];
    
    // 按情绪类型筛选
    if (selectedEmotion !== 'all') {
      result = result.filter(entry => entry.emotionType === selectedEmotion);
    }
    
    // 按搜索关键词筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(entry => {
        // 添加更全面的空值检查
        const title = (entry.title || '').toString();
        const excerpt = (entry.excerpt || '').toString();
        const emotions = Array.isArray(entry.emotions) ? entry.emotions : [];
        
        // 检查标题和摘要
        const titleMatch = title.toLowerCase().includes(query);
        const excerptMatch = excerpt.toLowerCase().includes(query);
        
        // 检查情绪标签
        const emotionMatch = emotions.some(emotion => {
          // 确保情绪项不为null或undefined
          const emotionStr = (emotion || '').toString();
          return emotionStr.toLowerCase().includes(query);
        });
        
        return titleMatch || excerptMatch || emotionMatch;
      });
    }
    
    setFilteredEntries(result);
  }, [diaryEntries, searchQuery, selectedEmotion]);
  
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

  // 删除日记条目
  const deleteDiaryEntry = async (entry: DiaryEntry) => {
    try {
      await diaryService.deleteEntry(entry.id);
      // 重新获取数据以更新列表
      const entries = await diaryService.getAllEntries();
      setDiaryEntries(entries);
      setFilteredEntries(entries);
      Alert.alert('成功', '日记已删除');
    } catch (error) {
      console.error('删除日记失败:', error);
      Alert.alert('错误', '删除日记失败');
    }
  };

  // 渲染右滑删除按钮
  const renderRightActions = (entry: DiaryEntry) => {
    return (
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            '删除日记',
            `确定要删除"${entry.title || '未命名日记'}"吗？`,
            [
              { text: '取消', style: 'cancel' },
              { 
                text: '删除', 
                style: 'destructive',
                onPress: () => deleteDiaryEntry(entry)
              }
            ]
          );
        }}
      >
        <Text style={styles.deleteButtonText}>删除</Text>
      </TouchableOpacity>
    );
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
      
      {/* 搜索框 */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="搜索日记..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      {/* 情绪筛选标签 */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.emotionFilterContainer}
        contentContainerStyle={styles.emotionFilterContent}
      >
        <TouchableOpacity 
          style={[styles.emotionChip, selectedEmotion === 'all' && styles.emotionChipActive]}
          onPress={() => setSelectedEmotion('all')}
        >
          <Text style={[styles.emotionChipText, selectedEmotion === 'all' && styles.emotionChipTextActive]}>
            全部
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.emotionChip, selectedEmotion === '焦虑' && styles.emotionChipActive]}
          onPress={() => setSelectedEmotion('焦虑')}
        >
          <Text style={[styles.emotionChipText, selectedEmotion === '焦虑' && styles.emotionChipTextActive]}>
            焦虑
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.emotionChip, selectedEmotion === '平静' && styles.emotionChipActive]}
          onPress={() => setSelectedEmotion('平静')}
        >
          <Text style={[styles.emotionChipText, selectedEmotion === '平静' && styles.emotionChipTextActive]}>
            平静
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.emotionChip, selectedEmotion === '悲伤' && styles.emotionChipActive]}
          onPress={() => setSelectedEmotion('悲伤')}
        >
          <Text style={[styles.emotionChipText, selectedEmotion === '悲伤' && styles.emotionChipTextActive]}>
            悲伤
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.emotionChip, selectedEmotion === '愤怒' && styles.emotionChipActive]}
          onPress={() => setSelectedEmotion('愤怒')}
        >
          <Text style={[styles.emotionChipText, selectedEmotion === '愤怒' && styles.emotionChipTextActive]}>
            愤怒
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 日记列表 */}
      <ScrollView style={styles.listContainer}>
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <Swipeable 
              key={entry.id} 
              renderRightActions={() => renderRightActions(entry)}
            >
              <TouchableOpacity 
                onPress={() => navigation.navigate('DiaryDetail', { diary: entry })}
                onLongPress={() => {
                  Alert.alert(
                    '删除日记',
                    `确定要删除"${entry.title || '未命名日记'}"吗？`,
                    [
                      { text: '取消', style: 'cancel' },
                      { 
                        text: '删除', 
                        style: 'destructive',
                        onPress: () => deleteDiaryEntry(entry)
                      }
                    ]
                  );
                }}
              >
                <Card style={styles.diaryCard}>
                  <View style={[styles.emotionIndicator, { backgroundColor: getEmotionColor(entry.emotionType) }]} />
                  <View style={styles.cardContent}>
                    <Text style={styles.title} numberOfLines={1}>{entry.title || '未命名日记'}</Text>
                    <Text style={styles.excerpt} numberOfLines={2}>{entry.excerpt || '暂无描述'}</Text>
                    <View style={styles.footer}>
                      <Text style={styles.emotions} numberOfLines={1}>
                        {Array.isArray(entry.emotions) && entry.emotions.length > 0 ? entry.emotions.join(' · ') : '暂无情绪'}
                      </Text>
                      <Text style={styles.date}>{formatDate(entry.date)}</Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            </Swipeable>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>暂无日记记录</Text>
            <Text style={styles.emptySubtext}>点击下方按钮创建你的第一条情绪日记</Text>
          </View>
        )}
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
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
    color: '#999',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    color: '#333',
  },
  emotionFilterContainer: {
    marginBottom: 16,
  },
  emotionFilterContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  emotionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f2f2f7',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  emotionChipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  emotionChipText: {
    color: '#666',
    fontSize: 14,
  },
  emotionChipTextActive: {
    color: 'white',
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
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    color: '#333',
  },
  excerpt: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emotions: {
    fontSize: 12,
    color: '#999',
    flex: 1,
    marginRight: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
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
  deleteButton: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 12,
    marginRight: 16,
    marginBottom: 12,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 16,
  },
});

export default DiaryListScreen;