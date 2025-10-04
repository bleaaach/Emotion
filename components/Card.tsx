import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

interface CardProps {
  children: React.ReactNode;
  style?: object;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <Surface style={[styles.card, style]} elevation={1}>
      {children}
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
  },
});

export default Card;