import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip, ChipProps } from 'react-native-paper';

interface EmotionChipProps extends ChipProps {
  emotion: string;
  selected?: boolean;
}

const EmotionChip: React.FC<EmotionChipProps> = ({ 
  emotion, 
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
      {emotion}
    </Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#f2f2f7',
    borderRadius: 16,
    margin: 4,
  },
  chipSelected: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    margin: 4,
  },
  chipText: {
    color: '#000000',
  },
  chipTextSelected: {
    color: '#ffffff',
  },
});

export default EmotionChip;