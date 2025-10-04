import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from './Card';

interface ExerciseCardProps {
  title: string;
  description: string;
  duration: string;
  rating: number;
  icon: string;
  iconColor: string;
  iconBackgroundColor: string;
  onPress?: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
  title, 
  description, 
  duration, 
  rating,
  icon,
  iconColor,
  iconBackgroundColor,
  onPress
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
          <Icon name={icon} size={24} color={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.footer}>
            <Text style={styles.duration}>{duration}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color="#ffb300" />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          </View>
        </View>
        {onPress && (
          <IconButton 
            icon="chevron-right" 
            size={24} 
            onPress={onPress}
            style={styles.chevronButton}
          />
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    padding: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    color: '#999999',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 4,
  },
  chevronButton: {
    margin: 0,
  },
});

export default ExerciseCard;