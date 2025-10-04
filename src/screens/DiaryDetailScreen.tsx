import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Appbar, Button, Chip, Divider } from 'react-native-paper';
import EmotionChip from '../components/EmotionChip';
import Card from '../components/Card';

const DiaryDetailScreen = ({ navigation, route }: any) => {
  const { diary } = route.params || {};
  
  // 表单状态
  const [situation, setSituation] = useState({
    time: diary?.situation?.time || '',
    location: diary?.situation?.location || '',
    description: diary?.situation?.description || ''
  });
  
  const [emotions, setEmotions] = useState(diary?.emotions || []);
  const [automaticThoughts, setAutomaticThoughts] = useState(diary?.automaticThoughts || '');
  const [automaticThoughtsBelief, setAutomaticThoughtsBelief] = useState(diary?.automaticThoughtsBelief || 50);
  const [alternativeThoughts, setAlternativeThoughts] = useState(diary?.alternativeThoughts || '');
  const [alternativeThoughtsBelief, setAlternativeThoughtsBelief] = useState(diary?.alternativeThoughtsBelief || 50);
  const [behavior, setBehavior] = useState(diary?.behavior || '');
  const [result, setResult] = useState(diary?.result || '');
  
  // 情绪选项
  const emotionOptions = [
    { id: 1, name: '焦虑', color: '#FF6B6B' },
    { id: 2, name: '愤怒', color: '#FF8E53' },
    { id: 3, name: '悲伤', color: '#4A90E2' },
    { id: 4, name: '沮丧', color: '#556CD6' },
    { id: 5, name: '孤独', color: '#9B59B6' },
    { id: 6, name: '羞愧', color: '#E91E63' },
    { id: 7, name: '恐惧', color: '#26C6DA' },
    { id: 8, name: '嫉妒', color: '#4CAF50' },
    { id: 9, name: '兴奋', color: '#FFEB3B' },
    { id: 10, name: '平静', color: '#8BC34A' }
  ];
  
  // 切换情绪选择
  const toggleEmotion = (emotion: any) => {
    const isSelected = emotions.find((e: any) => e.id === emotion.id);
    if (isSelected) {
      setEmotions(emotions.filter((e: any) => e.id !== emotion.id));
    } else {
      setEmotions([...emotions, emotion]);
    }
  };
  
  // 保存日记
  const saveDiary = () => {
    const diaryData = {
      id: diary?.id || Date.now(),
      date: diary?.date || new Date().toISOString(),
      situation,
      emotions,
      automaticThoughts,
      automaticThoughtsBelief,
      alternativeThoughts,
      alternativeThoughtsBelief,
      behavior,
      result
    };
    
    // 这里应该保存到本地存储或发送到服务器
    console.log('保存日记:', diaryData);
    Alert.alert('成功', '日记已保存');
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={diary ? "编辑日记" : "新建日记"} />
        <Appbar.Action icon="content-save" onPress={saveDiary} />
      </Appbar.Header>
      
      <ScrollView style={styles.content}>
        {/* 情境记录区域 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>情境记录</Text>
          <TextInput
            style={styles.input}
            placeholder="时间"
            value={situation.time}
            onChangeText={(text) => setSituation({...situation, time: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="地点"
            value={situation.location}
            onChangeText={(text) => setSituation({...situation, location: text})}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="情境描述"
            multiline
            numberOfLines={4}
            value={situation.description}
            onChangeText={(text) => setSituation({...situation, description: text})}
          />
        </Card>
        
        {/* 情绪记录区域 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>情绪记录</Text>
          <View style={styles.chipContainer}>
            {emotionOptions.map((emotion) => (
              <TouchableOpacity
                key={emotion.id}
                onPress={() => toggleEmotion(emotion)}
              >
                <EmotionChip
                  emotion={emotion.name}
                  color={emotion.color}
                  selected={!!emotions.find((e: any) => e.id === emotion.id)}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="身体感受描述"
            multiline
            numberOfLines={3}
            value={emotions.map(e => e.name).join(', ')}
            editable={false}
          />
        </Card>
        
        {/* 自动思维记录区域 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>自动思维</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="写下你的自动思维..."
            multiline
            numberOfLines={4}
            value={automaticThoughts}
            onChangeText={setAutomaticThoughts}
          />
          <View style={styles.beliefContainer}>
            <Text>可信度: {automaticThoughtsBelief}%</Text>
            <View style={styles.sliderContainer}>
              <Text>0</Text>
              <View style={styles.sliderTrack}>
                <View 
                  style={[
                    styles.sliderFill, 
                    { width: `${automaticThoughtsBelief}%` }
                  ]} 
                />
              </View>
              <Text>100</Text>
            </View>
          </View>
        </Card>
        
        {/* 替代思维区域 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>替代思维</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="写下更平衡、理性的想法..."
            multiline
            numberOfLines={4}
            value={alternativeThoughts}
            onChangeText={setAlternativeThoughts}
          />
          <View style={styles.beliefContainer}>
            <Text>新的可信度: {alternativeThoughtsBelief}%</Text>
            <View style={styles.sliderContainer}>
              <Text>0</Text>
              <View style={styles.sliderTrack}>
                <View 
                  style={[
                    styles.sliderFill, 
                    { width: `${alternativeThoughtsBelief}%` }
                  ]} 
                />
              </View>
              <Text>100</Text>
            </View>
          </View>
        </Card>
        
        {/* 行为结果记录 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>行为与结果</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="实际行为描述"
            multiline
            numberOfLines={3}
            value={behavior}
            onChangeText={setBehavior}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="结果评价"
            multiline
            numberOfLines={3}
            value={result}
            onChangeText={setResult}
          />
        </Card>
        
        <Button 
          mode="contained" 
          onPress={saveDiary}
          style={styles.saveButton}
        >
          保存日记
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12
  },
  beliefContainer: {
    marginTop: 16
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  sliderTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
    borderRadius: 2
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 2
  },
  saveButton: {
    marginVertical: 16
  }
});

export default DiaryDetailScreen;