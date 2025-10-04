import React from 'react';
import { View, StyleSheet } from 'react-native';

interface EmotionIndicatorProps {
  emotion: string;
  style?: object;
}

const EmotionIndicator: React.FC<EmotionIndicatorProps> = ({ emotion, style }) => {
  const getEmotionColor = () => {
    switch (emotion.toLowerCase()) {
      case 'calm':
      case '平静':
        return '#10b981';
      case 'anxious':
      case '焦虑':
        return '#f59e0b';
      case 'happy':
      case '快乐':
        return '#f59e0b';
      case 'sad':
      case '悲伤':
        return '#8b5cf6';
      case 'angry':
      case '愤怒':
        return '#ef4444';
      default:
        return '#10b981';
    }
  };

  return (
    <View style={[styles.indicator, { backgroundColor: getEmotionColor() }, style]} />
  );
};

const styles = StyleSheet.create({
  indicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
});

export default EmotionIndicator;