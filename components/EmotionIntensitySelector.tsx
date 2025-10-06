import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';

interface EmotionIntensitySelectorProps {
  initialValue?: number; // 初始强度值，默认5
  onValueChange: (value: number) => void; // 当值改变时的回调函数
  emotionName?: string; // 情绪名称，用于显示
  color?: string; // 滑块颜色
}

const EmotionIntensitySelector: React.FC<EmotionIntensitySelectorProps> = ({
  initialValue = 5,
  onValueChange,
  emotionName = '情绪',
  color = '#007AFF',
}) => {
  const [intensity, setIntensity] = useState<number>(initialValue);

  const handleValueChange = (value: number) => {
    // 确保值是整数
    const roundedValue = Math.round(value);
    setIntensity(roundedValue);
    onValueChange(roundedValue);
  };

  // 获取强度描述
  const getIntensityDescription = (value: number): string => {
    if (value <= 3) return '轻微';
    if (value <= 6) return '中等';
    if (value <= 8) return '强烈';
    return '非常强烈';
  };

  // 创建强度指示器的标记点
  const renderMarkers = () => {
    const markers = [];
    for (let i = 1; i <= 10; i += 1) {
      // 只显示1, 5, 10这些关键值
      const showLabel = i === 1 || i === 5 || i === 10;
      markers.push(
        <View key={i} style={styles.markerContainer}>
          <View
            style={[
              styles.marker,
              i === intensity && { backgroundColor: color, height: 12 },
            ]}
          />
          {showLabel && (
            <Text style={styles.markerLabel}>{i}</Text>
          )}
        </View>
      );
    }
    return markers;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{emotionName}强度</Text>
        <Text style={[styles.valueText, { color }]}>{intensity}</Text>
      </View>
      
      {/* 滑块组件 */}
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={intensity}
        onValueChange={handleValueChange}
        minimumTrackTintColor={color}
        maximumTrackTintColor="#d1d5db"
        thumbTintColor={color}
      />
      
      {/* 强度指示器 */}
      <View style={styles.markersContainer}>{renderMarkers()}</View>
      
      {/* 强度描述 */}
      <Text style={styles.description}>
        当前强度: {getIntensityDescription(intensity)}
      </Text>
      
      {/* 快速选择按钮 */}
      <View style={styles.quickSelectContainer}>
        <TouchableOpacity
          style={[
            styles.quickSelectButton,
            intensity <= 3 && styles.quickSelectButtonActive,
          ]}
          onPress={() => handleValueChange(2)}
        >
          <Text
            style={[
              styles.quickSelectText,
              intensity <= 3 && styles.quickSelectTextActive,
            ]}
          >
            轻微
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.quickSelectButton,
            intensity > 3 && intensity <= 6 && styles.quickSelectButtonActive,
          ]}
          onPress={() => handleValueChange(5)}
        >
          <Text
            style={[
              styles.quickSelectText,
              intensity > 3 && intensity <= 6 && styles.quickSelectTextActive,
            ]}
          >
            中等
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.quickSelectButton,
            intensity > 6 && styles.quickSelectButtonActive,
          ]}
          onPress={() => handleValueChange(8)}
        >
          <Text
            style={[
              styles.quickSelectText,
              intensity > 6 && styles.quickSelectTextActive,
            ]}
          >
            强烈
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  valueText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
    ...Platform.select({
      ios: {
        // iOS平台特定样式
      },
      android: {
        // Android平台特定样式
      },
    }),
  },
  markersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 4,
    height: 8,
    backgroundColor: '#d1d5db',
    borderRadius: 2,
    marginBottom: 4,
  },
  markerLabel: {
    fontSize: 12,
    color: '#8e8e93',
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    color: '#8e8e93',
    marginTop: 8,
  },
  quickSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  quickSelectButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f2f2f7',
  },
  quickSelectButtonActive: {
    backgroundColor: '#007AFF',
  },
  quickSelectText: {
    fontSize: 14,
    color: '#8e8e93',
    fontWeight: '500',
  },
  quickSelectTextActive: {
    color: '#ffffff',
  },
});

export default EmotionIntensitySelector;