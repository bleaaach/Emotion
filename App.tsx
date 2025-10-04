import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as ReduxProvider } from 'react-redux';
import { useDispatch } from 'react-redux';
import HomeScreen from './src/screens/HomeScreen';
import StatsScreen from './src/screens/StatsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ExercisesScreen from './src/screens/ExercisesScreen';
import AIInsightScreen from './src/screens/ai/AIInsightScreen';
import InsightDetailScreen from './src/screens/ai/InsightDetailScreen';
import ChatAIScreen from './src/screens/ai/ChatAIScreen';
import DiaryNavigator from './src/navigation/DiaryNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { store } from './src/store';
import userPreferencesService from './src/services/UserPreferencesService';
import localizationService from './src/services/LocalizationService';
import { setPreferences } from './src/store/slices/userPreferencesSlice';

// 创建底部标签导航器
const Tab = createBottomTabNavigator();
// 创建堆栈导航器
const Stack = createStackNavigator();

// AI分析模块堆栈导航器
const AIStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AIInsight" component={AIInsightScreen} />
      <Stack.Screen name="InsightDetail" component={InsightDetailScreen} />
      <Stack.Screen name="ChatAI" component={ChatAIScreen} />
    </Stack.Navigator>
  );
};

// AppContent 组件，用于在 Redux Provider 内部使用 useDispatch
const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // 应用启动时加载用户偏好设置
    const loadUserPreferences = async () => {
      try {
        const preferences = await userPreferencesService.getPreferences();
        dispatch(setPreferences(preferences));
      } catch (error) {
        console.error('Error loading user preferences:', error);
      }
    };
    
    loadUserPreferences();
  }, [dispatch]);
  
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: localizationService.t('navigation.home'),
            tabBarLabel: localizationService.t('navigation.home'),
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Diary" 
          component={DiaryNavigator} 
          options={{
            title: localizationService.t('navigation.diary'),
            tabBarLabel: localizationService.t('navigation.diary'),
            tabBarIcon: ({ color, size }) => (
              <Icon name="book" color={color} size={size} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Stats" 
          component={StatsScreen} 
          options={{
            title: localizationService.t('navigation.stats'),
            tabBarLabel: localizationService.t('navigation.stats'),
            tabBarIcon: ({ color, size }) => (
              <Icon name="bar-chart" color={color} size={size} />
            ),
          }} 
        />
        <Tab.Screen 
          name="AI" 
          component={AIStack}
          options={{
            title: localizationService.t('navigation.ai'),
            tabBarLabel: localizationService.t('navigation.ai'),
            tabBarIcon: ({ color, size }) => (
              <Icon name="insights" color={color} size={size} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Exercises" 
          component={ExercisesScreen}
          options={{
            title: localizationService.t('navigation.exercises'),
            tabBarLabel: localizationService.t('navigation.exercises'),
            tabBarIcon: ({ color, size }) => (
              <Icon name="fitness-center" color={color} size={size} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            title: localizationService.t('navigation.profile'),
            tabBarLabel: localizationService.t('navigation.profile'),
            tabBarIcon: ({ color, size }) => (
              <Icon name="person" color={color} size={size} />
            ),
          }} 
        />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <AppContent />
    </ReduxProvider>
  );
};

export default App;