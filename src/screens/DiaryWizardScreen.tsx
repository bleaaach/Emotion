import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, Button, Chip, ProgressBar } from 'react-native-paper';
import EmotionChip from '../components/EmotionChip';
import Card from '../components/Card';

const DiaryWizardScreen = ({ navigation }: any) => {
  // 步骤状态
  const [currentStep, setCurrentStep] = useState(0);
  
  // 表单数据
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
  
  // 步骤标题
  const steps = [
    '记录情境',
    '识别情绪',
    '分析自动思维',
    '构建替代思维',
    '记录行为和结果'
  ];
  
  // 切换情绪选择
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
  
  // 更新表单数据
  const updateFormData = (section: string, field: string, value: any) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section as keyof typeof formData],
        [field]: value
      }
    });
  };
  
  // 下一步
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 完成向导，保存日记
      console.log('保存日记:', formData);
      navigation.goBack();
    }
  };
  
  // 上一步
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // 渲染当前步骤内容
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // 记录情境
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>情境记录</Text>
            <TextInput
              style={styles.input}
              placeholder="时间"
              value={formData.situation.time}
              onChangeText={(text) => updateFormData('situation', 'time', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="地点"
              value={formData.situation.location}
              onChangeText={(text) => updateFormData('situation', 'location', text)}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="情境描述"
              multiline
              numberOfLines={4}
              value={formData.situation.description}
              onChangeText={(text) => updateFormData('situation', 'description', text)}
            />
          </Card>
        );
        
      case 1: // 识别情绪
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>情绪识别</Text>
            <Text style={styles.subtitle}>请选择你当时感受到的情绪（可多选）</Text>
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
              placeholder="身体感受描述（例如：心跳加速、肌肉紧张等）"
              multiline
              numberOfLines={3}
              value={formData.emotions.map(e => e.name).join(', ')}
              editable={false}
            />
          </Card>
        );
        
      case 2: // 分析自动思维
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>自动思维分析</Text>
            <Text style={styles.subtitle}>写下当时脑海中自动出现的想法</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="自动思维内容..."
              multiline
              numberOfLines={4}
              value={formData.automaticThoughts}
              onChangeText={(text) => setFormData({...formData, automaticThoughts: text})}
            />
            <View style={styles.beliefContainer}>
              <Text>这些想法的可信度: {formData.automaticThoughtsBelief}%</Text>
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
        
      case 3: // 构建替代思维
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>构建替代思维</Text>
            <Text style={styles.subtitle}>尝试用更平衡、理性的想法来替代之前的自动思维</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="替代思维内容..."
              multiline
              numberOfLines={4}
              value={formData.alternativeThoughts}
              onChangeText={(text) => setFormData({...formData, alternativeThoughts: text})}
            />
            <View style={styles.beliefContainer}>
              <Text>对替代思维的相信程度: {formData.alternativeThoughtsBelief}%</Text>
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
        
      case 4: // 记录行为和结果
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>行为与结果</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="实际行为描述"
              multiline
              numberOfLines={3}
              value={formData.behavior}
              onChangeText={(text) => setFormData({...formData, behavior: text})}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="结果评价（这件事带来了什么后果？）"
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
        <Appbar.Content title="日记创建向导" />
      </Appbar.Header>
      
      {/* 进度条 */}
      <View style={styles.progressContainer}>
        <ProgressBar 
          progress={(currentStep + 1) / steps.length} 
          style={styles.progressBar}
          color="#4A90E2"
        />
        <Text style={styles.stepText}>
          第 {currentStep + 1} 步，共 {steps.length} 步
        </Text>
        <Text style={styles.stepTitle}>{steps[currentStep]}</Text>
      </View>
      
      {/* 步骤内容 */}
      <ScrollView style={styles.content}>
        {renderStepContent()}
      </ScrollView>
      
      {/* 导航按钮 */}
      <View style={styles.buttonContainer}>
        <Button
          onPress={prevStep}
          disabled={currentStep === 0}
          style={styles.navButton}
        >
          上一步
        </Button>
        <Button
          mode="contained"
          onPress={nextStep}
          style={styles.navButton}
        >
          {currentStep === steps.length - 1 ? '完成' : '下一步'}
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