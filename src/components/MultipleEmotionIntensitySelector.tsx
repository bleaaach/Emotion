/*
 * @Author: Bleaach008
 * @Date: 2025-10-06 12:29:12
 * @LastEditTime: 2025-10-06 12:42:30
 * @FilePath: \Emotion\src\components\MultipleEmotionIntensitySelector.tsx
 * @Description: 
 * 
 * Copyright (c) 2025 by 008, All Rights Reserved. 
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import EmotionIntensitySelector from '@legacy-components/EmotionIntensitySelector';

interface MultipleEmotionIntensitySelectorProps {
  emotions: Array<{ name: string; color?: string }>;
  intensities: Record<string, number>;
  onIntensityChange: (intensities: Record<string, number>) => void;
}

const MultipleEmotionIntensitySelector: React.FC<MultipleEmotionIntensitySelectorProps> = ({
  emotions,
  intensities,
  onIntensityChange,
}) => {
  const handleEmotionIntensityChange = (emotionName: string, value: number) => {
    const newIntensities = { ...intensities, [emotionName]: value };
    onIntensityChange(newIntensities);
  };

  return (
    <View style={styles.container}>
      {emotions.map((emotion, index) => (
        <View key={`${emotion.name}-${index}`} style={styles.emotionItem}>
          <EmotionIntensitySelector
            emotionName={emotion.name}
            initialValue={intensities[emotion.name] || 5}
            onValueChange={(value) => handleEmotionIntensityChange(emotion.name, value)}
            color={emotion.color || '#007AFF'}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  emotionItem: {
    marginBottom: 8,
  },
});

export default MultipleEmotionIntensitySelector;