import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, Button, Chip, Divider, IconButton } from 'react-native-paper';
import Card from '../components/Card';
import EmotionChip from '../components/EmotionChip';

const QuestionLibraryScreen = ({ navigation }: any) => {
  // �������
  const categories = [
    { id: 1, name: '������֪', color: '#FF6B6B' },
    { id: 2, name: '��ֵ��', color: '#4ECDC4' },
    { id: 3, name: '�˼ʹ�ϵ', color: '#45B7D1' },
    { id: 4, name: '��������', color: '#96CEB4' },
    { id: 5, name: 'Ŀ��������', color: '#FFEAA7' },
    { id: 6, name: '�ɳ�����', color: '#DDA0DD' }
  ];

  // ʾ����������
  const sampleQuestions = [
    {
      id: 1,
      title: 'ʲô��������е����л�����',
      category: '������֪',
      isFavorite: true,
      isAnswered: false
    },
    {
      id: 2,
      title: '����һ������е����������ʱ��',
      category: '��ֵ��',
      isFavorite: false,
      isAnswered: true
    },
    {
      id: 3,
      title: '���������������ϵ���ЩƷ�ʣ�',
      category: '�˼ʹ�ϵ',
      isFavorite: true,
      isAnswered: false
    },
    {
      id: 4,
      title: '����е�����ʱ��ͨ������ʲô�����⣿',
      category: '��������',
      isFavorite: false,
      isAnswered: true
    },
    {
      id: 5,
      title: '�������ϣ����Ϊʲô�����ˣ�',
      category: 'Ŀ��������',
      isFavorite: false,
      isAnswered: false
    },
    {
      id: 6,
      title: 'ͯ��ʱ���ĸ���������Ӱ�����',
      category: '�ɳ�����',
      isFavorite: true,
      isAnswered: false
    }
  ];

  // ״̬
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions] = useState(sampleQuestions);

  // ��������
  const filteredQuestions = selectedCategory
    ? questions.filter(q => q.category === selectedCategory)
    : questions;

  // �л��ղ�״̬
  const toggleFavorite = (id: number) => {
    console.log('�л��ղ�״̬:', id);
    // ����Ӧ�ø��±��ش洢�е���������
  };

  // ��ʼ�ش�����
  const startAnswering = (question: any) => {
    navigation.navigate('QuestionAnswer', { question });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="�����" />
        <Appbar.Action icon="account-details" onPress={() => navigation.navigate('PersonalProfile')} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        {/* ����ɸѡ */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>�������</Text>
          <View style={styles.chipContainer}>
            <TouchableOpacity onPress={() => setSelectedCategory(null)}>
              <Chip 
                mode={selectedCategory === null ? 'flat' : 'outlined'}
                selected={selectedCategory === null}
                style={styles.categoryChip}
              >
                ȫ��
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

        {/* ÿ���Ƽ� */}
        <Card style={styles.section}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>ÿ���Ƽ�</Text>
            <IconButton 
              icon="refresh" 
              size={20} 
              onPress={() => console.log('ˢ���Ƽ�')}
            />
          </View>
          <TouchableOpacity onPress={() => startAnswering(questions[0])}>
            <Card style={styles.recommendedQuestion}>
              <Text style={styles.questionTitle}>{questions[0].title}</Text>
              <View style={styles.questionMeta}>
                <EmotionChip 
                  emotion={questions[0].category} 
                  color={categories.find(c => c.name === questions[0].category)?.color || '#999'} 
                />
                {questions[0].isAnswered && (
                  <Chip icon="check" mode="outlined" style={styles.answeredChip}>
                    �ѻش�
                  </Chip>
                )}
              </View>
            </Card>
          </TouchableOpacity>
        </Card>

        {/* �����б� */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>��������</Text>
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
                      color={categories.find(c => c.name === question.category)?.color || '#999'} 
                    />
                    {question.isAnswered && (
                      <Chip icon="check" mode="outlined" style={styles.answeredChip}>
                        �ѻش�
                      </Chip>
                    )}
                  </View>
                </TouchableOpacity>
                <IconButton 
                  icon={question.isFavorite ? "heart" : "heart-outline"} 
                  color={question.isFavorite ? "#FF6B6B" : "#999"}
                  onPress={() => toggleFavorite(question.id)}
                />
              </View>
              <Divider />
            </View>
          ))}
        </Card>

        {/* ����Զ������ⰴť */}
        <Button 
          mode="outlined" 
          onPress={() => navigation.navigate('CustomQuestion')}
          style={styles.addButton}
          icon="plus"
        >
          ����Զ�������
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