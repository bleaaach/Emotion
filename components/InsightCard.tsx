import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from './Card';

interface InsightCardProps {
  title: string;
  content: string;
  icon: string;
  iconColor: string;
  iconBackgroundColor: string;
  onDismiss?: () => void;
}

const InsightCard: React.FC<InsightCardProps> = ({ 
  title, 
  content, 
  icon, 
  iconColor,
  iconBackgroundColor,
  onDismiss 
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
          <Icon name={icon} size={20} color={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.contentText}>{content}</Text>
        </View>
        {onDismiss && (
          <IconButton 
            icon="close" 
            size={20} 
            onPress={onDismiss}
            style={styles.dismissButton}
          />
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contentText: {
    fontSize: 14,
    color: '#666666',
  },
  dismissButton: {
    margin: 0,
  },
});

export default InsightCard;