import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, Button, Chip, Divider, IconButton } from 'react-native-paper';
import Card from '@legacy-components/Card';
import EmotionChip from '@legacy-components/EmotionChip';

const QuestionLibraryScreen = ({ navigation }: any) => {
  // 问题分类
  const categories = [
    { id: 1, name: '自我认知', color: '#FF6B6B' },
    { id: 2, name: '价值观', color: '#4ECDC4' },
    { id: 3, name: '人际关系', color: '#45B7D1' },
    { id: 4, name: '情绪管理', color: '#96CEB4' },
    { id: 5, name: '目标与梦想', color: '#FFEAA7' },
    { id: 6, name: '成长经历', color: '#DDA0DD' }
  ];

  // 示例问题数据
  const sampleQuestions = [
    {
      id: 1,
      title: '什么情况下你会感到最有活力？',
      category: '自我认知',
      isFavorite: true,
      isAnswered: false
    },
    {
      id: 2,
      title: '描述一个让你感到深深满足的时刻',
      category: '价值观',
      isFavorite: false,
      isAnswered: true
    },
    {
      id: 3,
      title: '你最欣赏朋友身上的哪些品质？',
      category: '人际关系',
      isFavorite: true,
      isAnswered: false
    },
    {
      id: 4,
      title: '当你感到焦虑时，通常会做什么来缓解？',
      category: '情绪管理',
      isFavorite: false,
      isAnswered: true
    },
    {
      id: 5,
      title: '五年后你希望成为什么样的人？',
      category: '目标与梦想',
      isFavorite: false,
      isAnswered: false
    },
    {
      id: 6,
      title: '童年时期哪个经历对你影响最深？',
      category: '成长经历',
      isFavorite: true,
      isAnswered: false
    }
  ];

  // 状态
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions] = useState(sampleQuestions);

  // 过滤问题
  const filteredQuestions = selectedCategory
    ? questions.filter(q => q.category === selectedCategory)
    : questions;

  // 切换收藏状态
  const toggleFavorite = (id: number) => {
    console.log('切换收藏状态:', id);
    // 这里应该更新本地存储中的问题数据
  };

  // 开始回答问题
  const startAnswering = (question: any) => {
    navigation.navigate('QuestionAnswer', { question });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="问题库" />
        <Appbar.Action icon="account-details" onPress={() => navigation.navigate('PersonalProfile')} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        {/* 分类筛选 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>问题分类</Text>
          <View style={styles.chipContainer}>
            <TouchableOpacity onPress={() => setSelectedCategory(null)}>
              <Chip 
                mode={selectedCategory === null ? 'flat' : 'outlined'}
                selected={selectedCategory === null}
                style={styles.categoryChip}
              >
                全部
              </Chip>
            </TouchableOpacity>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                onPress={() => setSelectedCategory(category.name)}
              >
                <Chip
                  mode={selectedCategory === category.name ? 'flat' : 'outlined'}
                  selected={selectedCategory === category.name}
                  style={[styles.categoryChip, { backgroundColor: selectedCategory === category.name ? category.color : 'transparent' }]}
                >
                  {category.name}
                </Chip>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* 每日推荐 */}
        <Card style={styles.section}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>每日推荐</Text>
            <IconButton 
              icon="refresh" 
              size={20} 
              onPress={() => console.log('刷新推荐')}
            />
          </View>
          <TouchableOpacity onPress={() => startAnswering(questions[0])}>
            <Card style={styles.recommendedQuestion}>
              <Text style={styles.questionTitle}>{questions[0].title}</Text>
              <View style={styles.questionMeta}>
                <EmotionChip 
                  emotion={questions[0].category} 
                />
                {questions[0].isAnswered && (
                  <Chip icon="check" mode="outlined" style={styles.answeredChip}>
                    已回答
                  </Chip>
                )}
              </View>
            </Card>
          </TouchableOpacity>
        </Card>

        {/* 问题列表 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>所有问题</Text>
          {filteredQuestions.map((question) => (
            <View key={question.id}>
              <View style={styles.questionItem}>
                <TouchableOpacity 
                  style={styles.questionContent} 
                  onPress={() => startAnswering(question)}
                >
                  <Text style={styles.questionTitle}>{question.title}</Text>
                  <View style={styles.questionMeta}>
                    <EmotionChip 
                      emotion={question.category} 
                    />
                    {question.isAnswered && (
                      <Chip icon="check" mode="outlined" style={styles.answeredChip}>
                        已回答
                      </Chip>
                    )}
                  </View>
                </TouchableOpacity>
                <IconButton 
                  icon={question.isFavorite ? "heart" : "heart-outline"} 
                  iconColor={question.isFavorite ? "#FF6B6B" : "#999"}
                  onPress={() => toggleFavorite(question.id)}
                />
              </View>
              <Divider />
            </View>
          ))}
        </Card>

        {/* 添加自定义问题按钮 */}
        <Button 
          mode="outlined" 
          onPress={() => navigation.navigate('CustomQuestion')}
          style={styles.addButton}
          icon="plus"
        >
          添加自定义问题
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    flex: 1,
    padding: 16
  },
  section: {
    marginBottom: 16,
    padding: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  categoryChip: {
    marginRight: 8,
    marginBottom: 8
  },
  recommendedQuestion: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    marginBottom: 8
  },
  questionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12
  },
  questionContent: {
    flex: 1
  },
  questionTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333'
  },
  questionMeta: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  answeredChip: {
    marginLeft: 8
  },
  addButton: {
    marginVertical: 16
  }
});

export default QuestionLibraryScreen;