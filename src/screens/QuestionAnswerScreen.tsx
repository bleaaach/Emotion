import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Appbar, Button, Chip, Divider } from 'react-native-paper';
import Card from '../components/Card';
import EmotionChip from '../components/EmotionChip';

const QuestionAnswerScreen = ({ navigation, route }: any) => {
  const { question } = route.params || {};
  
  // 回答状态
  const [answer, setAnswer] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  
  // 示例标签
  const suggestedTags = ['成长', '价值观', '自我认知', '人际关系', '情绪', '目标'];
  
  // 添加标签
  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setNewTag('');
    }
  };
  
  // 删除标签
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  
  // 保存回答
  const saveAnswer = () => {
    if (!answer.trim()) {
      Alert.alert('提示', '请填写回答内容');
      return;
    }
    
    const answerData = {
      questionId: question?.id,
      questionTitle: question?.title,
      answer,
      tags,
      date: new Date().toISOString()
    };
    
    // 这里应该保存到本地存储
    console.log('保存回答:', answerData);
    Alert.alert('成功', '回答已保存');
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="回答问题" />
      </Appbar.Header>
      
      <ScrollView style={styles.content}>
        {/* 问题展示 */}
        <Card style={styles.section}>
          <Text style={styles.questionTitle}>{question?.title}</Text>
          <View style={styles.questionMeta}>
            <EmotionChip 
              emotion={question?.category} 
              color="#4A90E2" 
            />
            {question?.isAnswered && (
              <Chip icon="history" mode="outlined" style={styles.historyChip}>
                查看历史回答
              </Chip>
            )}
          </View>
        </Card>
        
        {/* 回答编辑器 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>你的回答</Text>
          <TextInput
            style={[styles.textArea, styles.answerInput]}
            placeholder="在这里写下你的想法和感受..."
            multiline
            numberOfLines={10}
            textAlignVertical="top"
            value={answer}
            onChangeText={setAnswer}
          />
        </Card>
        
        {/* 标签添加 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>添加标签</Text>
          <View style={styles.tagInputContainer}>
            <TextInput
              style={styles.tagInput}
              placeholder="输入标签"
              value={newTag}
              onChangeText={setNewTag}
              onSubmitEditing={() => addTag(newTag)}
            />
            <Button 
              mode="outlined" 
              onPress={() => addTag(newTag)}
              style={styles.addTagButton}
            >
              添加
            </Button>
          </View>
          
          {/* 建议标签 */}
          <View style={styles.suggestedTagsContainer}>
            <Text style={styles.suggestedTagsTitle}>建议标签:</Text>
            <View style={styles.suggestedTags}>
              {suggestedTags.map((tag, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => addTag(tag)}
                  style={styles.suggestedTag}
                >
                  <Text style={styles.suggestedTagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* 已添加标签 */}
          <View style={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <View key={index} style={styles.tagItem}>
                <Chip 
                  onClose={() => removeTag(tag)}
                  style={styles.tagChip}
                >
                  {tag}
                </Chip>
              </View>
            ))}
          </View>
        </Card>
      </ScrollView>
      
      {/* 保存按钮 */}
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={saveAnswer}
          style={styles.saveButton}
        >
          保存回答
        </Button>
      </View>
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
  questionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333'
  },
  questionMeta: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  historyChip: {
    marginLeft: 8
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333'
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#fff'
  },
  answerInput: {
    height: 200,
    textAlignVertical: 'top'
  },
  tagInputContainer: {
    flexDirection: 'row',
    marginBottom: 16
  },
  tagInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#fff',
    marginRight: 8
  },
  addTagButton: {
    justifyContent: 'center'
  },
  suggestedTagsContainer: {
    marginBottom: 16
  },
  suggestedTagsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#666'
  },
  suggestedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  suggestedTag: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8
  },
  suggestedTagText: {
    fontSize: 12,
    color: '#666'
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tagItem: {
    marginRight: 8,
    marginBottom: 8
  },
  tagChip: {
    backgroundColor: '#4A90E2'
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#fff'
  },
  saveButton: {
    paddingVertical: 8
  }
});

export default QuestionAnswerScreen;