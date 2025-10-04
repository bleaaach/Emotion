import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, Button, Chip, ProgressBar } from 'react-native-paper';
import EmotionChip from '../components/EmotionChip';
import Card from '../components/Card';

const DiaryWizardScreen = ({ navigation }: any) => {
  // ����״̬
  const [currentStep, setCurrentStep] = useState(0);
  
  // ������
  const [formData, setFormData] = useState({
    situation: {
      time: '',
      location: '',
      description: ''
    },
    emotions: [],
    automaticThoughts: '',
    automaticThoughtsBelief: 50,
    alternativeThoughts: '',
    alternativeThoughtsBelief: 50,
    behavior: '',
    result: ''
  });
  
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
  
  // �������
  const steps = [
    '��¼�龳',
    'ʶ������',
    '�����Զ�˼ά',
    '�������˼ά',
    '��¼��Ϊ�ͽ��'
  ];
  
  // �л�����ѡ��
  const toggleEmotion = (emotion: any) => {
    const isSelected = formData.emotions.find((e: any) => e.id === emotion.id);
    if (isSelected) {
      setFormData({
        ...formData,
        emotions: formData.emotions.filter((e: any) => e.id !== emotion.id)
      });
    } else {
      setFormData({
        ...formData,
        emotions: [...formData.emotions, emotion]
      });
    }
  };
  
  // ���±�����
  const updateFormData = (section: string, field: string, value: any) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section as keyof typeof formData],
        [field]: value
      }
    });
  };
  
  // ��һ��
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // ����򵼣������ռ�
      console.log('�����ռ�:', formData);
      navigation.goBack();
    }
  };
  
  // ��һ��
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // ��Ⱦ��ǰ��������
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // ��¼�龳
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>�龳��¼</Text>
            <TextInput
              style={styles.input}
              placeholder="ʱ��"
              value={formData.situation.time}
              onChangeText={(text) => updateFormData('situation', 'time', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="�ص�"
              value={formData.situation.location}
              onChangeText={(text) => updateFormData('situation', 'location', text)}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="�龳����"
              multiline
              numberOfLines={4}
              value={formData.situation.description}
              onChangeText={(text) => updateFormData('situation', 'description', text)}
            />
          </Card>
        );
        
      case 1: // ʶ������
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>����ʶ��</Text>
            <Text style={styles.subtitle}>��ѡ���㵱ʱ���ܵ����������ɶ�ѡ��</Text>
            <View style={styles.chipContainer}>
              {emotionOptions.map((emotion) => (
                <TouchableOpacity
                  key={emotion.id}
                  onPress={() => toggleEmotion(emotion)}
                >
                  <EmotionChip
                    emotion={emotion.name}
                    color={emotion.color}
                    selected={!!formData.emotions.find((e: any) => e.id === emotion.id)}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="����������������磺�������١�������ŵȣ�"
              multiline
              numberOfLines={3}
              value={formData.emotions.map(e => e.name).join(', ')}
              editable={false}
            />
          </Card>
        );
        
      case 2: // �����Զ�˼ά
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>�Զ�˼ά����</Text>
            <Text style={styles.subtitle}>д�µ�ʱ�Ժ����Զ����ֵ��뷨</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="�Զ�˼ά����..."
              multiline
              numberOfLines={4}
              value={formData.automaticThoughts}
              onChangeText={(text) => setFormData({...formData, automaticThoughts: text})}
            />
            <View style={styles.beliefContainer}>
              <Text>��Щ�뷨�Ŀ��Ŷ�: {formData.automaticThoughtsBelief}%</Text>
              <View style={styles.sliderContainer}>
                <Text>0</Text>
                <View style={styles.sliderTrack}>
                  <View 
                    style={[
                      styles.sliderFill, 
                      { width: `${formData.automaticThoughtsBelief}%` }
                    ]} 
                  />
                </View>
                <Text>100</Text>
              </View>
            </View>
          </Card>
        );
        
      case 3: // �������˼ά
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>�������˼ά</Text>
            <Text style={styles.subtitle}>�����ø�ƽ�⡢���Ե��뷨�����֮ǰ���Զ�˼ά</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="���˼ά����..."
              multiline
              numberOfLines={4}
              value={formData.alternativeThoughts}
              onChangeText={(text) => setFormData({...formData, alternativeThoughts: text})}
            />
            <View style={styles.beliefContainer}>
              <Text>�����˼ά�����ų̶�: {formData.alternativeThoughtsBelief}%</Text>
              <View style={styles.sliderContainer}>
                <Text>0</Text>
                <View style={styles.sliderTrack}>
                  <View 
                    style={[
                      styles.sliderFill, 
                      { width: `${formData.alternativeThoughtsBelief}%` }
                    ]} 
                  />
                </View>
                <Text>100</Text>
              </View>
            </View>
          </Card>
        );
        
      case 4: // ��¼��Ϊ�ͽ��
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>��Ϊ����</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="ʵ����Ϊ����"
              multiline
              numberOfLines={3}
              value={formData.behavior}
              onChangeText={(text) => setFormData({...formData, behavior: text})}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="������ۣ�����´�����ʲô�������"
              multiline
              numberOfLines={3}
              value={formData.result}
              onChangeText={(text) => setFormData({...formData, result: text})}
            />
          </Card>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="�ռǴ�����" />
      </Appbar.Header>
      
      {/* ������ */}
      <View style={styles.progressContainer}>
        <ProgressBar 
          progress={(currentStep + 1) / steps.length} 
          style={styles.progressBar}
          color="#4A90E2"
        />
        <Text style={styles.stepText}>
          �� {currentStep + 1} ������ {steps.length} ��
        </Text>
        <Text style={styles.stepTitle}>{steps[currentStep]}</Text>
      </View>
      
      {/* �������� */}
      <ScrollView style={styles.content}>
        {renderStepContent()}
      </ScrollView>
      
      {/* ������ť */}
      <View style={styles.buttonContainer}>
        <Button
          onPress={prevStep}
          disabled={currentStep === 0}
          style={styles.navButton}
        >
          ��һ��
        </Button>
        <Button
          mode="contained"
          onPress={nextStep}
          style={styles.navButton}
        >
          {currentStep === steps.length - 1 ? '���' : '��һ��'}
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
  progressContainer: {
    padding: 16,
    backgroundColor: '#fff'
  },
  progressBar: {
    height: 8,
    borderRadius: 4
  },
  stepText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#666'
  },
  stepTitle: {
    textAlign: 'center',
    marginTop: 4,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
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
    marginBottom: 16,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff'
  },
  navButton: {
    flex: 1,
    marginHorizontal: 8
  }
});

export default DiaryWizardScreen;