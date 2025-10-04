import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import DiaryListScreen from './src/screens/DiaryListScreen';
import StatsScreen from './src/screens/StatsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { Provider as PaperProvider } from 'react-native-paper';

// 创建底部标签导航器
const Tab = createBottomTabNavigator();

const App: React.FC = () => {
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
              title: '主页',
              tabBarLabel: '主页',
            }} 
          />
          <Tab.Screen 
            name="Diary" 
            component={DiaryListScreen} 
            options={{
              title: '日记',
              tabBarLabel: '日记',
            }} 
          />
          <Tab.Screen 
            name="Stats" 
            component={StatsScreen} 
            options={{
              title: '统计',
              tabBarLabel: '统计',
            }} 
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{
              title: '我的',
              tabBarLabel: '我的',
            }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;