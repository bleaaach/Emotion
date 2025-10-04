import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';

interface CardProps {
  children: React.ReactNode;
  style?: object;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <Surface style={[styles.card, style]} elevation={2}>
      {children}
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#ffffff',
  },
});

export default Card;