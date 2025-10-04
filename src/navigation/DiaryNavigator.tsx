import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DiaryListScreen from '../screens/DiaryListScreen';
import DiaryDetailScreen from '../screens/DiaryDetailScreen';
import DiaryWizardScreen from '../screens/DiaryWizardScreen';

// 创建堆栈导航器
const Stack = createStackNavigator();

const DiaryNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DiaryList" component={DiaryListScreen} />
      <Stack.Screen name="DiaryDetail" component={DiaryDetailScreen} />
      <Stack.Screen name="DiaryWizard" component={DiaryWizardScreen} />
    </Stack.Navigator>
  );
};

export default DiaryNavigator;