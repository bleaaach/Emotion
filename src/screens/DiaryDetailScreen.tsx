import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Appbar, Button, Chip, Divider } from 'react-native-paper';
import EmotionChip from '../components/EmotionChip';
import Card from '../components/Card';

const DiaryDetailScreen = ({ navigation, route }: any) => {
  const { diary } = route.params || {};
  
  // ��״̬
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
  
  // ����ѡ��
  const emotionOptions = [
    { id: 1, name: '����', color: '#FF6B6B' },
    { id: 2, name: '��ŭ', color: '#FF8E53' },
    { id: 3, name: '����', color: '#4A90E2' },
    { id: 4, name: '��ɥ', color: '#556CD6' },
    { id: 5, name: '�¶�', color: '#9B59B6' },
    { id: 6, name: '����', color: '#E91E63' },
    { id: 7, name: '�־�', color: '#26C6DA' },
    { id: 8, name: '����', color: '#4CAF50' },
    { id: 9, name: '�˷�', color: '#FFEB3B' },
    { id: 10, name: 'ƽ��', color: '#8BC34A' }
  ];
  
  // �л�����ѡ��
  const toggleEmotion = (emotion: any) => {
    const isSelected = emotions.find((e: any) => e.id === emotion.id);
    if (isSelected) {
      setEmotions(emotions.filter((e: any) => e.id !== emotion.id));
    } else {
      setEmotions([...emotions, emotion]);
    }
  };
  
  // �����ռ�
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
    
    // ����Ӧ�ñ��浽���ش洢���͵�������
    console.log('�����ռ�:', diaryData);
    Alert.alert('�ɹ�', '�ռ��ѱ���');
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={diary ? "�༭�ռ�" : "�½��ռ�"} />
        <Appbar.Action icon="content-save" onPress={saveDiary} />
      </Appbar.Header>
      
      <ScrollView style={styles.content}>
        {/* �龳��¼���� */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>�龳��¼</Text>
          <TextInput
            style={styles.input}
            placeholder="ʱ��"
            value={situation.time}
            onChangeText={(text) => setSituation({...situation, time: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="�ص�"
            value={situation.location}
            onChangeText={(text) => setSituation({...situation, location: text})}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="�龳����"
            multiline
            numberOfLines={4}
            value={situation.description}
            onChangeText={(text) => setSituation({...situation, description: text})}
          />
        </Card>
        
        {/* ������¼���� */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>������¼</Text>
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
            placeholder="�����������"
            multiline
            numberOfLines={3}
            value={emotions.map(e => e.name).join(', ')}
            editable={false}
          />
        </Card>
        
        {/* �Զ�˼ά��¼���� */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>�Զ�˼ά</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="д������Զ�˼ά..."
            multiline
            numberOfLines={4}
            value={automaticThoughts}
            onChangeText={setAutomaticThoughts}
          />
          <View style={styles.beliefContainer}>
            <Text>���Ŷ�: {automaticThoughtsBelief}%</Text>
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
        
        {/* ���˼ά���� */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>���˼ά</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="д�¸�ƽ�⡢���Ե��뷨..."
            multiline
            numberOfLines={4}
            value={alternativeThoughts}
            onChangeText={setAlternativeThoughts}
          />
          <View style={styles.beliefContainer}>
            <Text>�µĿ��Ŷ�: {alternativeThoughtsBelief}%</Text>
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
        
        {/* ��Ϊ�����¼ */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>��Ϊ����</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="ʵ����Ϊ����"
            multiline
            numberOfLines={3}
            value={behavior}
            onChangeText={setBehavior}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="�������"
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
          �����ռ�
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