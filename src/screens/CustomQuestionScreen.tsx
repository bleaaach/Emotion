import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Appbar, Button, Chip } from 'react-native-paper';
import Card from '../components/Card';
import EmotionChip from '../components/EmotionChip';

const CustomQuestionScreen = ({ navigation }: any) => {
  // ��״̬
  const [question, setQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  
  // �������
  const categories = [
    { id: 1, name: '������֪', color: '#FF6B6B' },
    { id: 2, name: '��ֵ��', color: '#4ECDC4' },
    { id: 3, name: '�˼ʹ�ϵ', color: '#45B7D1' },
    { id: 4, name: '��������', color: '#96CEB4' },
    { id: 5, name: 'Ŀ��������', color: '#FFEAA7' },
    { id: 6, name: '�ɳ�����', color: '#DDA0DD' }
  ];
  
  // �����Զ�������
  const saveCustomQuestion = () => {
    if (!question.trim()) {
      Alert.alert('��ʾ', '��������������');
      return;
    }
    
    if (!selectedCategory && !newCategory.trim()) {
      Alert.alert('��ʾ', '��ѡ��������������');
      return;
    }
    
    const category = newCategory.trim() || selectedCategory;
    
    const customQuestion = {
      id: Date.now(), // �򵥵�ID����
      title: question,
      category: category,
      isFavorite: false,
      isAnswered: false,
      isCustom: true
    };
    
    // ����Ӧ�ñ��浽���ش洢
    console.log('�����Զ�������:', customQuestion);
    Alert.alert('�ɹ�', '�Զ��������ѱ���');
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="����Զ�������" />
      </Appbar.Header>
      
      <ScrollView style={styles.content}>
        {/* �������� */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>��������</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="�������������..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={question}
            onChangeText={setQuestion}
          />
        </Card>
        
        {/* ������� */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>�������</Text>
          <Text style={styles.subtitle}>ѡ�����з���</Text>
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
          
          <Text style={[styles.subtitle, { marginTop: 16 }]}>�򴴽��·���</Text>
          <View style={styles.newCategoryContainer}>
            <TextInput
              style={styles.input}
              placeholder="�����·�������"
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
              ʹ���·���
            </Button>
          </View>
        </Card>
        
        {/* ��ʾ��Ϣ */}
        <Card style={styles.section}>
          <Text style={styles.tipTitle}>? С��ʿ</Text>
          <Text style={styles.tipText}>
            ? �õ�����Ӧ���ǿ����Եģ��ܹ���������˼��{"\n"}
            ? ��������������ĸ��˳ɳ�������̽�����{"\n"}
            ? ���Դ�"ʲô"��"���"��"Ϊʲô"�ȽǶ����������
          </Text>
        </Card>
      </ScrollView>
      
      {/* ���水ť */}
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={saveCustomQuestion}
          style={styles.saveButton}
        >
          ��������
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