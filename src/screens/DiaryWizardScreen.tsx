import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, Button, Chip, ProgressBar } from 'react-native-paper';
import EmotionChip from '@legacy-components/EmotionChip';
import Card from '@legacy-components/Card';
import DistortionChip from '@legacy-components/DistortionChip';
import Slider from '@react-native-community/slider';
import diaryService from '../services/DiaryService';
import { Alert } from 'react-native';

// 导入增强组件
import MultipleEmotionIntensitySelector from '@components/MultipleEmotionIntensitySelector';
// 导入类型定义
import { ThoughtPattern, CopingStrategy } from '../../src/types/diary';

const DiaryWizardScreen = ({ navigation }: { navigation: any }) => {
  // 步骤状态
  const [currentStep, setCurrentStep] = useState(0);
  
  // 定义情绪类型
  interface Emotion {
    id: number;
    name: string;
    color: string;
  }

  // 定义认知扭曲类型
  interface Distortion {
    id: number;
    name: string;
  }

  // 更新表单数据状态，添加认知扭曲相关字段
  const [formData, setFormData] = useState({
    situation: {
      time: '',
      location: '',
      description: ''
    },
    emotions: [] as Emotion[],
    emotionIntensities: {} as Record<string, number>, // 情绪强度映射
    automaticThoughts: '',
    automaticThoughtsBelief: 50,
    alternativeThoughts: '',
    alternativeThoughtsBelief: 50,
    behavior: '',
    result: '',
    distortions: [] as Distortion[], // 添加认知扭曲字段
    distortionSeverity: 5, // 添加扭曲程度字段
    thoughtPatterns: [] as ThoughtPattern['id'][], // 思想模式ID列表
    copingStrategies: [] as CopingStrategy['id'][], // 应对策略ID列表
    bodySensations: '', // 身体感受
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

  // 添加认知扭曲类型定义
  const distortionTypes = [
    { id: 1, name: '全有或全无思维' },
    { id: 2, name: '灾难化思维' },
    { id: 3, name: '情绪化推理' },
    { id: 4, name: '预测未来' },
    { id: 5, name: '放大负面' },
    { id: 6, name: '贴标签' },
    { id: 7, name: '读心术' },
    { id: 8, name: '缩小正面' },
    { id: 9, name: '责备他人' },
    { id: 10, name: '过度概括' },
    { id: 11, name: '自我责备' },
    { id: 12, name: '应该陈述' }
  ];

  // 更新步骤定义，添加行为结果步骤
  const steps = [
    '记录情境',
    '识别情绪',
    '情绪强度',
    '分析自动思维',
    '识别思想模式',
    '构建替代思维',
    '选择应对策略',
    '行为与结果',
    '识别认知扭曲',
    '身体感受'
  ];

  // 更新情绪强度
  const handleIntensityChange = (intensities: Record<string, number>) => {
    setFormData(prev => ({
      ...prev,
      emotionIntensities: intensities
    }));
  };

  // 更新身体感受
  const handleBodySensationsChange = (text: string) => {
    setFormData(prev => ({
      ...prev,
      bodySensations: text
    }));
  };

  // 切换情绪选择
  const toggleEmotion = (emotion: any) => {
    // 添加空值检查
    if (!emotion) return;
    
    const isSelected = formData.emotions.find((e: any) => {
      // 添加空值检查
      if (!e) return false;
      return e.id === emotion.id;
    });
    
    if (isSelected) {
      setFormData({
        ...formData,
        emotions: formData.emotions.filter((e: any) => {
          // 添加空值检查
          if (!e) return false;
          return e.id !== emotion.id;
        })
      });
    } else {
      setFormData({
        ...formData,
        emotions: [...formData.emotions, emotion]
      });
    }
  };

  // 切换认知扭曲选择
  const toggleDistortion = (distortion: any) => {
    const isSelected = formData.distortions.find((d: any) => d.id === distortion.id);
    if (isSelected) {
      setFormData({
        ...formData,
        distortions: formData.distortions.filter((d: any) => d.id !== distortion.id)
      });
    } else {
      setFormData({
        ...formData,
        distortions: [...formData.distortions, distortion]
      });
    }
  };

  // 更新表单数据
  const updateFormData = (section: string, field: string, value: any) => {
    setFormData(prev => {
      if (section === 'situation') {
        return { ...prev, situation: { ...prev.situation, [field]: value } };
      }
      return prev;
    });
  };
  
  // 保存日记
  const saveDiary = async () => {
    try {
      // 构建情境描述字符串
      let situationText = formData.situation.description;
      if (formData.situation.time || formData.situation.location) {
        situationText = `${formData.situation.time ? formData.situation.time + ' ' : ''}${formData.situation.location ? '在' + formData.situation.location + ' ' : ''}${formData.situation.description}`;
      }
      
      const diaryData: any = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        situation: situationText,
        emotions: formData.emotions.map((e: any) => {
          // 添加空值检查
          if (!e) return '';
          return typeof e === 'string' ? e : e.name;
        }),
        emotionType: formData.emotions.length > 0 ? (formData.emotions[0] ? (typeof formData.emotions[0] === 'string' ? formData.emotions[0] : formData.emotions[0].name) : '平静') : '平静',
        emotionIntensities: formData.emotionIntensities,
        thoughtPatterns: formData.thoughtPatterns,
        copingStrategies: formData.copingStrategies,
        bodySensations: formData.bodySensations,
        title: formData.situation.description.substring(0, 20) || '未命名日记',
        excerpt: formData.situation.description.substring(0, 50) || '暂无描述',
        automaticThoughts: formData.automaticThoughts,
        beliefRating: formData.automaticThoughtsBelief,
        alternativeThoughts: formData.alternativeThoughts,
        newBeliefRating: formData.alternativeThoughtsBelief,
        behavior: formData.behavior,
        result: formData.result,
        distortions: formData.distortions.map((d: any) => d.name),
        distortionSeverity: formData.distortionSeverity
      };
      
      await diaryService.saveEntry(diaryData);
      Alert.alert('成功', '日记已保存');
      navigation.goBack();
    } catch (error) {
      console.error('保存日记失败:', error);
      Alert.alert('错误', '保存日记失败');
    }
  };
  
  // 下一步
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 完成向导，保存日记
      saveDiary();
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
            <Text style={styles.subtitle}>请详细描述当时的情境，包括时间、地点和具体事件</Text>
            <TextInput
              style={styles.input}
              placeholder="时间（例如：下午3点、晚上8:30）"
              value={formData.situation.time}
              onChangeText={(text) => updateFormData('situation', 'time', text)}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="地点（例如：办公室、家中客厅、地铁上）"
              value={formData.situation.location}
              onChangeText={(text) => updateFormData('situation', 'location', text)}
              placeholderTextColor="#999"
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="情境描述（请详细描述当时发生了什么，包括事件的起因、经过和你的感受）"
              multiline
              numberOfLines={4}
              value={formData.situation.description}
              onChangeText={(text) => updateFormData('situation', 'description', text)}
              placeholderTextColor="#999"
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
                    selected={!!formData.emotions.find((e: any) => {
                      // 添加空值检查
                      if (!e) return false;
                      return e.id === emotion.id;
                    })}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="身体感受描述（例如：心跳加速、肌肉紧张等）"
              multiline
              numberOfLines={3}
              value={formData.emotions.map(e => {
                // 添加空值检查
                if (!e) return '';
                return e.name || '';
              }).join(', ')}
              editable={false}
            />
          </Card>
        );
        
      case 2: // 情绪强度
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>情绪强度评估</Text>
            <Text style={styles.subtitle}>为每种情绪评估其强度</Text>
            {formData.emotions.length > 0 ? (
              <MultipleEmotionIntensitySelector
                emotions={formData.emotions}
                intensities={formData.emotionIntensities}
                onIntensityChange={handleIntensityChange}
              />
            ) : (
              <Text style={styles.noEmotionText}>请先在情绪识别步骤中选择至少一种情绪</Text>
            )}
          </Card>
        );
        
      case 3: // 分析自动思维
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>自动思维分析</Text>
            <Text style={styles.subtitle}>写下当时脑海中自动出现的想法</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="自动思维内容（例如：我可能无法胜任这份工作）"
              multiline
              numberOfLines={4}
              value={formData.automaticThoughts}
              onChangeText={(text) => setFormData({...formData, automaticThoughts: text})}
            />
            <View style={styles.beliefContainer}>
              <Text>这些想法的可信度: {formData.automaticThoughtsBelief}%</Text>
              <View style={styles.sliderContainer}>
                <Text>0</Text>
                <Slider
                  style={{ flex: 1, marginHorizontal: 10 }}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  value={formData.automaticThoughtsBelief}
                  onValueChange={(value) => setFormData({...formData, automaticThoughtsBelief: value})}
                  minimumTrackTintColor="#4A90E2"
                  maximumTrackTintColor="#ddd"
                  thumbTintColor="#4A90E2"
                />
                <Text>100</Text>
              </View>
            </View>
          </Card>
        );
        
      case 4: // 识别思想模式
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>识别思想模式</Text>
            <Text style={styles.subtitle}>描述与你当时想法相关的思想模式</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="例如：过度概括、灾难化思考、非黑即白思维等"
              multiline
              numberOfLines={4}
              value={formData.thoughtPatterns.join(', ')}
              onChangeText={(text) => setFormData({...formData, thoughtPatterns: text.split(',').map(p => p.trim()).filter(Boolean)})}
            />
          </Card>
        );
        
      case 5: // 构建替代思维
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>构建替代思维</Text>
            <Text style={styles.subtitle}>尝试用更平衡、理性的想法来替代之前的自动思维</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="替代思维内容（例如：我之前完成过类似的项目，这次只是需要更多时间）"
              multiline
              numberOfLines={4}
              value={formData.alternativeThoughts}
              onChangeText={(text) => setFormData({...formData, alternativeThoughts: text})}
            />
            <View style={styles.beliefContainer}>
              <Text>对替代思维的相信程度: {formData.alternativeThoughtsBelief}%</Text>
              <View style={styles.sliderContainer}>
                <Text>0</Text>
                <Slider
                  style={{ flex: 1, marginHorizontal: 10 }}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  value={formData.alternativeThoughtsBelief}
                  onValueChange={(value) => setFormData({...formData, alternativeThoughtsBelief: value})}
                  minimumTrackTintColor="#4A90E2"
                  maximumTrackTintColor="#ddd"
                  thumbTintColor="#4A90E2"
                />
                <Text>100</Text>
              </View>
            </View>
          </Card>
        );
        
      case 6: // 选择应对策略
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>选择应对策略</Text>
            <Text style={styles.subtitle}>描述你可以使用的应对策略</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="例如：深呼吸、散步、与朋友交谈等"
              multiline
              numberOfLines={4}
              value={formData.copingStrategies.join(', ')}
              onChangeText={(text) => setFormData({...formData, copingStrategies: text.split(',').map(s => s.trim()).filter(Boolean)})}
            />
          </Card>
        );
        
      case 7: // 行为与结果
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>行为与结果</Text>
            <Text style={styles.subtitle}>描述你实际做了什么以及结果如何</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="实际行为描述（例如：我决定先完成一个小任务来建立信心）"
              multiline
              numberOfLines={3}
              value={formData.behavior}
              onChangeText={(text) => setFormData({...formData, behavior: text})}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="结果评价（例如：完成小任务后我感觉更有信心了）"
              multiline
              numberOfLines={3}
              value={formData.result}
              onChangeText={(text) => setFormData({...formData, result: text})}
            />
          </Card>
        );
        
      case 8: // 识别认知扭曲
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>认知扭曲识别</Text>
            <Text style={styles.subtitle}>识别你的思维中可能存在的认知扭曲类型</Text>
            
            <View style={styles.chipContainer}>
              {distortionTypes.map((distortion) => (
                <TouchableOpacity
                  key={distortion.id}
                  onPress={() => toggleDistortion(distortion)}
                >
                  <DistortionChip
                    distortion={distortion.name}
                    selected={!!formData.distortions.find((d: any) => d.id === distortion.id)}
                  />
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.beliefContainer}>
              <Text>扭曲程度评估: {formData.distortionSeverity}/10</Text>
              <View style={styles.sliderContainer}>
                <Text>低</Text>
                <Slider
                  style={{ flex: 1, marginHorizontal: 10 }}
                  minimumValue={1}
                  maximumValue={10}
                  step={1}
                  value={formData.distortionSeverity}
                  onValueChange={(value) => setFormData({...formData, distortionSeverity: value})}
                  minimumTrackTintColor="#4A90E2"
                  maximumTrackTintColor="#ddd"
                  thumbTintColor="#4A90E2"
                />
                <Text>高</Text>
              </View>
            </View>
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="改进建议（系统生成的认知重构建议）..."
              multiline
              numberOfLines={4}
              // 这里可以添加AI生成的建议
              editable={false}
            />
          </Card>
        );
        
      case 9: // 身体感受
        return (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>身体感受</Text>
            <Text style={styles.subtitle}>描述你当时身体上的感受和反应</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="身体感受描述（例如：心跳加速、手心出汗、肌肉紧张等）"
              multiline
              numberOfLines={4}
              value={formData.bodySensations}
              onChangeText={handleBodySensationsChange}
              placeholderTextColor="#999"
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
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
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fafafa'
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
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8
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
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  navButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 8,
    paddingVertical: 4
  },
  emotionName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  intensityItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8
  },
  noEmotionText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20
  }
});

export default DiaryWizardScreen;