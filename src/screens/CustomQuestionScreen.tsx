import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Appbar, Button, Chip } from 'react-native-paper';
import Card from '../components/Card';
import EmotionChip from '../components/EmotionChip';

const CustomQuestionScreen = ({ navigation }: any) => {
  // 表单状态
  const [question, setQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  
  // 问题分类
  const categories = [
    { id: 1, name: '自我认知', color: '#FF6B6B' },
    { id: 2, name: '价值观', color: '#4ECDC4' },
    { id: 3, name: '人际关系', color: '#45B7D1' },
    { id: 4, name: '情绪管理', color: '#96CEB4' },
    { id: 5, name: '目标与梦想', color: '#FFEAA7' },
    { id: 6, name: '成长经历', color: '#DDA0DD' }
  ];
  
  // 保存自定义问题
  const saveCustomQuestion = () => {
    if (!question.trim()) {
      Alert.alert('提示', '请输入问题内容');
      return;
    }
    
    if (!selectedCategory && !newCategory.trim()) {
      Alert.alert('提示', '请选择或输入问题分类');
      return;
    }
    
    const category = newCategory.trim() || selectedCategory;
    
    const customQuestion = {
      id: Date.now(), // 简单的ID生成
      title: question,
      category: category,
      isFavorite: false,
      isAnswered: false,
      isCustom: true
    };
    
    // 这里应该保存到本地存储
    console.log('保存自定义问题:', customQuestion);
    Alert.alert('成功', '自定义问题已保存');
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="添加自定义问题" />
      </Appbar.Header>
      
      <ScrollView style={styles.content}>
        {/* 问题内容 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>问题内容</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="请输入你的问题..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={question}
            onChangeText={setQuestion}
          />
        </Card>
        
        {/* 问题分类 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>问题分类</Text>
          <Text style={styles.subtitle}>选择现有分类</Text>
          <View style={styles.chipContainer}>
            {categories.map((category) => (
              <Chip
                key={category.id}
                mode={selectedCategory === category.name ? 'flat' : 'outlined'}
                selected={selectedCategory === category.name}
                style={[
                  styles.categoryChip, 
                  { backgroundColor: selectedCategory === category.name ? category.color : 'transparent' }
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </Chip>
            ))}
          </View>
          
          <Text style={[styles.subtitle, { marginTop: 16 }]}>或创建新分类</Text>
          <View style={styles.newCategoryContainer}>
            <TextInput
              style={styles.input}
              placeholder="输入新分类名称"
              value={newCategory}
              onChangeText={setNewCategory}
            />
            <Button 
              mode="outlined" 
              onPress={() => {
                if (newCategory.trim()) {
                  setSelectedCategory(null);
                }
              }}
              disabled={!newCategory.trim()}
            >
              使用新分类
            </Button>
          </View>
        </Card>
        
        {/* 提示信息 */}
        <Card style={styles.section}>
          <Text style={styles.tipTitle}>? 小贴士</Text>
          <Text style={styles.tipText}>
            ? 好的问题应该是开放性的，能够引发深入思考{"\n"}
            ? 尽量让问题与你的个人成长和内心探索相关{"\n"}
            ? 可以从"什么"、"如何"、"为什么"等角度来设计问题
          </Text>
        </Card>
      </ScrollView>
      
      {/* 保存按钮 */}
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={saveCustomQuestion}
          style={styles.saveButton}
        >
          保存问题
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333'
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 12,
    color: '#666'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff'
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top'
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  categoryChip: {
    marginRight: 8,
    marginBottom: 8
  },
  newCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#fff'
  },
  saveButton: {
    paddingVertical: 8
  }
});

export default CustomQuestionScreen;