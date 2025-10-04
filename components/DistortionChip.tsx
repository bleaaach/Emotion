import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip, ChipProps } from 'react-native-paper';

// 从ChipProps中排除children属性，因为我们内部已经处理了内容显示
interface DistortionChipProps extends Omit<ChipProps, 'children'> {
  distortion: string;
  selected?: boolean;
}

const DistortionChip: React.FC<DistortionChipProps> = ({ 
  distortion, 
  selected = false,
  ...props 
}) => {
  const getChipStyle = () => {
    if (selected) {
      return styles.chipSelected;
    }
    return styles.chip;
  };

  return (
    <Chip
      style={[getChipStyle(), props.style]}
      textStyle={selected ? styles.chipTextSelected : styles.chipText}
      {...props}
    >
      {distortion}
    </Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#f2f2f7',
    borderRadius: 16,
    margin: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  chipSelected: {
    backgroundColor: '#ff3b30',
    borderRadius: 16,
    margin: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  chipText: {
    color: '#000000',
    fontSize: 14,
  },
  chipTextSelected: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default DistortionChip;