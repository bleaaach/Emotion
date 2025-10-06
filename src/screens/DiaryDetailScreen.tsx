import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Appbar, Button, Chip, Divider } from 'react-native-paper';
import EmotionChip from '@legacy-components/EmotionChip';
import Card from '@legacy-components/Card';
import MultipleEmotionIntensitySelector from '@components/MultipleEmotionIntensitySelector';
import DiaryService from '@services/DiaryService';
import { DiaryEntry } from '@services/DiaryService';
// 情绪选项 - 提前定义，确保在 useState 初始化函数中可用
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

// 认知扭曲选项
const distortionOptions = [
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

// 身体感受选项
const bodySensationOptions = [
  { id: 'tension', name: '肌肉紧张' },
  { id: 'fast-heartbeat', name: '心跳加速' },
  { id: 'shortness-breath', name: '呼吸急促' },
  { id: 'nausea', name: '恶心' },
  { id: 'sweating', name: '出汗' },
  { id: 'headache', name: '头痛' },
  { id: 'dizziness', name: '头晕' },
  { id: 'fatigue', name: '疲劳' },
  { id: 'restlessness', name: '坐立不安' },
  { id: 'other', name: '其他' }
];
const DiaryDetailScreen = ({ navigation, route }: { navigation: any, route: any }) => {
  const { diary } = route.params || {};
  
  // 表单状态
  const [situation, setSituation] = useState({
    time: diary?.situation?.time || '',
    location: diary?.situation?.location || '',
    description: diary?.situation?.description || ''
  });
  
  // 修复情绪状态初始化，处理从存储中读取的字符串数组
  const [emotions, setEmotions] = useState(() => {
    // 添加对 diary 和 diary.emotions 的检查
    if (diary && diary.emotions) {
      // 如果情绪数据是字符串数组，转换为对象数组
      if (Array.isArray(diary.emotions) && (diary.emotions.length === 0 || typeof diary.emotions[0] === 'string')) {
        return diary.emotions.map((name: string) => {
          const option = emotionOptions.find(opt => opt.name === name);
          return option || { id: Date.now() + Math.random(), name, color: '#999' };
        });
      }
      // 如果已经是对象数组，直接使用
      return diary.emotions;
    }
    return [];
  });
  
  // 新增状态字段
  const [emotionIntensities, setEmotionIntensities] = useState<Record<string, number>>(diary?.emotionIntensities || {});
  const [thoughtPatterns, setThoughtPatterns] = useState<string[]>(diary?.thoughtPatterns || []);
  const [copingStrategies, setCopingStrategies] = useState<string[]>(diary?.copingStrategies || []);
  const [bodySensations, setBodySensations] = useState<string[]>(diary?.bodySensations || []);
  const [distortions, setDistortions] = useState<string[]>(diary?.distortions || []);
  const [distortionSeverity, setDistortionSeverity] = useState<Record<string, number>>(diary?.distortionSeverity || {});
  
  const [automaticThoughts, setAutomaticThoughts] = useState(diary?.automaticThoughts || '');
  const [automaticThoughtsBelief, setAutomaticThoughtsBelief] = useState(diary?.automaticThoughtsBelief || 50);
  const [alternativeThoughts, setAlternativeThoughts] = useState(diary?.alternativeThoughts || '');
  const [alternativeThoughtsBelief, setAlternativeThoughtsBelief] = useState(diary?.alternativeThoughtsBelief || 50);
  const [behavior, setBehavior] = useState(diary?.behavior || '');
  const [result, setResult] = useState(diary?.result || '');
  
  // 切换情绪选择
  const toggleEmotion = (emotion: any) => {
    // 添加空值检查
    if (!emotion) return;
    
    const isSelected = emotions.find((e: any) => {
      // 添加空值检查
      if (!e) return false;
      // 处理不同数据结构的情绪对象
      if (e.id !== undefined) {
        return e.id === emotion.id;
      }
      // 如果是字符串，直接比较名称
      if (typeof e === 'string') {
        return e === emotion.name;
      }
      // 如果是对象但没有id，比较名称
      return e.name === emotion.name;
    });
    
    if (isSelected) {
      setEmotions(emotions.filter((e: any) => {
        // 添加空值检查
        if (!e) return false;
        // 处理不同数据结构的情绪对象
        if (e.id !== undefined) {
          return e.id !== emotion.id;
        }
        // 如果是字符串，直接比较名称
        if (typeof e === 'string') {
          return e !== emotion.name;
        }
        // 如果是对象但没有id，比较名称
        return e.name !== emotion.name;
      }));
    } else {
      setEmotions([...emotions, emotion]);
    }
  };
  
  // 更新情绪强度
  const handleIntensityChange = (intensities: Record<string, number>) => {
    setEmotionIntensities(intensities);
  };
  
  // 保存日记
  const saveDiary = async () => {
    try {
      // 构建情境描述字符串
      let situationText = situation.description;
      if (situation.time || situation.location) {
        situationText = `${situation.time ? situation.time + ' ' : ''}${situation.location ? '在' + situation.location + ' ' : ''}${situation.description}`;
      }
      
      const diaryData: any = {
        id: diary?.id || Date.now().toString(),
        date: diary?.date || new Date().toISOString(),
        situation: situationText,
        emotions: emotions.map((e: any) => {
          // 添加空值检查
          if (!e) return '';
          return typeof e === 'string' ? e : e.name;
        }),
        emotionType: emotions.length > 0 ? (emotions[0] ? (typeof emotions[0] === 'string' ? emotions[0] : emotions[0].name) : '平静') : '平静',
        title: situation.description.substring(0, 20) || '未命名日记',
        excerpt: situation.description.substring(0, 50) || '暂无描述',
        automaticThoughts,
        beliefRating: automaticThoughtsBelief,
        alternativeThoughts,
        newBeliefRating: alternativeThoughtsBelief,
        behavior,
        result,
        // 新增字段
        emotionIntensities,
        thoughtPatterns,
        copingStrategies,
        bodySensations,
        distortions,
        distortionSeverity
      };
      
      await DiaryService.saveEntry(diaryData);
      Alert.alert('成功', '日记已保存');
      navigation.goBack();
    } catch (error) {
      console.error('保存日记失败:', error);
      Alert.alert('错误', '保存日记失败');
    }
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
          <Text style={styles.sectionSubtitle}>请详细描述当时的情境，包括时间、地点和具体事件</Text>
          <TextInput
            style={styles.input}
            placeholder="时间（例如：下午3点、晚上8:30）"
            value={situation.time}
            onChangeText={(text) => setSituation({...situation, time: text})}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="地点（例如：办公室、家中客厅、地铁上）"
            value={situation.location}
            onChangeText={(text) => setSituation({...situation, location: text})}
            placeholderTextColor="#999"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="情境描述（请详细描述当时发生了什么，包括事件的起因、经过和你的感受）"
            multiline
            numberOfLines={4}
            value={situation.description}
            onChangeText={(text) => setSituation({...situation, description: text})}
            placeholderTextColor="#999"
          />
        </Card>
        
        {/* 情绪记录区域 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>情绪记录</Text>
          <Text style={styles.sectionSubtitle}>请选择你当时感受到的情绪（可多选）</Text>
          <View style={styles.chipContainer}>
            {emotionOptions.map((emotion) => (
              <TouchableOpacity
                key={emotion.id}
                onPress={() => toggleEmotion(emotion)}
              >
                <EmotionChip
                  emotion={emotion.name}
                  selected={!!emotions.find((e: any) => {
                    // 添加空值检查
                    if (!e) return false;
                    // 处理不同数据结构的情绪对象
                    if (e.id !== undefined) {
                      return e.id === emotion.id;
                    }
                    // 如果是字符串，直接比较名称
                    if (typeof e === 'string') {
                      return e === emotion.name;
                    }
                    // 如果是对象但没有id，比较名称
                    return e.name === emotion.name;
                  })}
                />
              </TouchableOpacity>
            ))}
          </View>
        </Card>
        
        {/* 情绪强度评估 */}
        {emotions.length > 0 && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>情绪强度</Text>
            <Text style={styles.sectionSubtitle}>请评估每种情绪的强度（1-10分）</Text>
            <MultipleEmotionIntensitySelector
              emotions={emotions}
              intensities={emotionIntensities}
              onIntensityChange={handleIntensityChange}
            />
          </Card>
        )}
        
        {/* 身体感受 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>身体感受</Text>
          <Text style={styles.sectionSubtitle}>请选择你当时感受到的身体反应</Text>
          <View style={styles.chipContainer}>
            {bodySensationOptions.map((sensation) => (
              <TouchableOpacity
                key={sensation.id}
                onPress={() => {
                  if (bodySensations.includes(sensation.name)) {
                    setBodySensations(bodySensations.filter(name => name !== sensation.name));
                  } else {
                    setBodySensations([...bodySensations, sensation.name]);
                  }
                }}
              >
                <Chip
                  selected={bodySensations.includes(sensation.name)}
                  style={[styles.chip, bodySensations.includes(sensation.name) && styles.chipSelected]}
                  textStyle={bodySensations.includes(sensation.name) && styles.chipTextSelected}
                >
                  {sensation.name}
                </Chip>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="其他身体感受描述（可选）"
            multiline
            numberOfLines={3}
            value={''}
            onChangeText={() => {}}
          />
        </Card>
        
        {/* 自动思维记录区域 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>自动思维</Text>
          <Text style={styles.sectionSubtitle}>写下当时脑海中自动出现的想法</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="自动思维内容（例如：我可能无法胜任这份工作）"
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
        
        {/* 思想模式识别 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>思想模式</Text>
          <Text style={styles.sectionSubtitle}>识别你自动思维中存在的认知模式</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="例如：过度概括、灾难化思考、非黑即白思维等"
            multiline
            numberOfLines={4}
            value={thoughtPatterns.join(', ')}
            onChangeText={(text) => setThoughtPatterns(text.split(',').map(p => p.trim()).filter(Boolean))}
          />
        </Card>
        
        {/* 认知扭曲识别 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>认知扭曲</Text>
          <Text style={styles.sectionSubtitle}>识别自动思维中存在的认知扭曲（可多选）</Text>
          <View style={styles.chipContainer}>
            {distortionOptions.map((pattern: { id: number; name: string }) => (
              <TouchableOpacity
                key={pattern.id}
                onPress={() => {
                  if (distortions.includes(pattern.name)) {
                    setDistortions(distortions.filter(name => name !== pattern.name));
                    // 同时移除对应的严重程度
                    const updatedSeverity = { ...distortionSeverity };
                    delete updatedSeverity[pattern.name];
                    setDistortionSeverity(updatedSeverity);
                  } else {
                    setDistortions([...distortions, pattern.name]);
                    // 设置默认严重程度
                    setDistortionSeverity({ ...distortionSeverity, [pattern.name]: 5 });
                  }
                }}
              >
                <Chip
                  selected={distortions.includes(pattern.name)}
                  style={[styles.chip, distortions.includes(pattern.name) && styles.chipSelected]}
                  textStyle={distortions.includes(pattern.name) && styles.chipTextSelected}
                >
                  {pattern.name}
                </Chip>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
        
        {/* 替代思维区域 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>替代思维</Text>
          <Text style={styles.sectionSubtitle}>尝试用更平衡、理性的想法来替代之前的自动思维</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="替代思维内容（例如：我之前完成过类似的项目，这次只是需要更多时间）"
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
        
        {/* 应对策略 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>应对策略</Text>
          <Text style={styles.sectionSubtitle}>描述你可以使用的应对策略</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="例如：深呼吸、散步、与朋友交谈等"
            multiline
            numberOfLines={4}
            value={copingStrategies.join(', ')}
            onChangeText={(text) => setCopingStrategies(text.split(',').map(s => s.trim()).filter(Boolean))}
          />
        </Card>
        
        {/* 行为结果记录 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>行为与结果</Text>
          <Text style={styles.sectionSubtitle}>描述你实际做了什么以及结果如何</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="实际行为描述（例如：我决定先完成一个小任务来建立信心）"
            multiline
            numberOfLines={3}
            value={behavior}
            onChangeText={setBehavior}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="结果评价（例如：完成小任务后我感觉更有信心了）"
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
    marginBottom: 8,
    color: '#333'
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 12,
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
  chip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#f0f0f0'
  },
  chipSelected: {
    backgroundColor: '#4A90E2'
  },
  chipTextSelected: {
    color: '#ffffff'
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
  saveButton: {
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingVertical: 8
  }
});

export default DiaryDetailScreen;