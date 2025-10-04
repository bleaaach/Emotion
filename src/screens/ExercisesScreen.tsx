import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Card from '../../components/Card';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useTranslation from '../hooks/useTranslation';

const ExercisesScreen: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(t('exercises.categories.all'));

  const categories = [t('exercises.categories.all'), t('exercises.categories.emotion'), t('exercises.categories.communication'), t('exercises.categories.thought')];
  
  const exercises = [
    {
      id: '1',
      title: '思维记录表',
      description: '识别和挑战负面思维模式',
      duration: '10-15分钟',
      rating: 4.8,
      icon: 'brain',
      iconColor: '#3b82f6',
      iconBackground: '#dbeafe',
    },
    {
      id: '2',
      title: '呼吸放松法',
      description: '通过深呼吸缓解焦虑和压力',
      duration: '5-10分钟',
      rating: 4.9,
      icon: 'air',
      iconColor: '#10b981',
      iconBackground: '#dcfce7',
    },
    {
      id: '3',
      title: '行为激活',
      description: '通过增加积极活动改善情绪',
      duration: '15-20分钟',
      rating: 4.7,
      icon: 'task',
      iconColor: '#8b5cf6',
      iconBackground: '#ede9fe',
    },
    {
      id: '4',
      title: '观察与评判',
      description: '区分观察和评判性语言',
      duration: '10分钟',
      rating: 4.6,
      icon: 'comment',
      iconColor: '#f59e0b',
      iconBackground: '#fef3c7',
    },
    {
      id: '5',
      title: '需要与请求',
      description: '表达需要和提出具体请求',
      duration: '15分钟',
      rating: 4.7,
      icon: 'handshake',
      iconColor: '#f59e0b',
      iconBackground: '#fef3c7',
    },
  ];

  const recommendedExercises = exercises.slice(0, 3);
  const otherExercises = exercises.slice(3);

  return (
    <ScrollView style={styles.container}>
      {/* 头部 */}
      <Text style={styles.header}>{t('exercises.title')}</Text>
      
      {/* 搜索框 */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#ccc" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={t('exercises.title')}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* 分类筛选 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryItem,
                selectedCategory === category && styles.categoryItemActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 推荐练习 */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{t('exercises.recommendation.title')}</Text>
        {recommendedExercises.map((exercise) => (
          <View key={exercise.id} style={styles.exerciseCard}>
            <View style={[styles.iconContainer, { backgroundColor: exercise.iconBackground }]}>
              <Icon name={exercise.icon} size={24} color={exercise.iconColor} />
            </View>
            <View style={styles.exerciseContent}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <Text style={styles.exerciseDescription}>{exercise.description}</Text>
              <View style={styles.exerciseFooter}>
                <Text style={styles.duration}>{exercise.duration}</Text>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={14} color="#fbbf24" />
                  <Text style={styles.rating}>{exercise.rating}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </Card>

      {/* 深度问题定义卡 */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{t('profile.manual.title')}</Text>
        <View style={styles.gridContainer}>
          <Card style={styles.gridItem}>
            <View style={[styles.gridIconContainer, { backgroundColor: '#dbeafe' }]}>
              <Icon name="help" size={32} color="#3b82f6" />
            </View>
            <Text style={styles.gridTitle}>{t('profile.manual.title')}</Text>
            <Text style={styles.gridDescription}>{t('profile.manual.title')}</Text>
          </Card>
          
          <Card style={styles.gridItem}>
            <View style={[styles.gridIconContainer, { backgroundColor: '#ede9fe' }]}>
              <Icon name="favorite" size={32} color="#8b5cf6" />
            </View>
            <Text style={styles.gridTitle}>{t('profile.manual.title')}</Text>
            <Text style={styles.gridDescription}>{t('profile.manual.title')}</Text>
          </Card>
        </View>
      </Card>

      {/* 其他练习 */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{t('exercises.title')}</Text>
        {otherExercises.map((exercise) => (
          <View key={exercise.id} style={styles.exerciseCard}>
            <View style={[styles.iconContainer, { backgroundColor: exercise.iconBackground }]}>
              <Icon name={exercise.icon} size={24} color={exercise.iconColor} />
            </View>
            <View style={styles.exerciseContent}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <Text style={styles.exerciseDescription}>{exercise.description}</Text>
              <View style={styles.exerciseFooter}>
                <Text style={styles.duration}>{exercise.duration}</Text>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={14} color="#fbbf24" />
                  <Text style={styles.rating}>{exercise.rating}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
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
    marginBottom: 16,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 14,
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: 40,
    paddingRight: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: 'white',
  },
  categoryScroll: {
    marginBottom: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f5f5f5',
  },
  categoryItemActive: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    color: '#000',
  },
  categoryTextActive: {
    color: '#fff',
  },
  sectionCard: {
    marginBottom: 24,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  exerciseCard: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseContent: {
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
  exerciseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    color: '#999',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  gridIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gridDescription: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default ExercisesScreen;