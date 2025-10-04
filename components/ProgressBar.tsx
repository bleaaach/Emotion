import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0 to 1
  style?: object;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.background, styles.rounded]}>
        <View 
          style={[
            styles.fill, 
            styles.rounded, 
            { width: `${Math.min(progress * 100, 100)}%` }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 6,
    width: '100%',
  },
  background: {
    flex: 1,
    backgroundColor: '#e5e7eb',
  },
  fill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  rounded: {
    borderRadius: 3,
  },
});

export default ProgressBar;