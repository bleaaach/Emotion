import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import Card from '../../components/Card';
import InsightCard from '../../components/InsightCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useTranslation from '../hooks/useTranslation';

const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();
  // 模拟个人数据
  const profileData = {
    name: '用户名',
    memberSince: '已使用 EchoMind 86 天',
    diaryCount: 24,
    exerciseCount: 18,
    usageDays: 86,
  };

  // 模拟洞察数据
  const insights = [
    {
      id: '1',
      title: '您本周的焦虑情绪有所下降',
      content: '与上周相比，您的焦虑情绪减少了15%。继续保持记录和练习！',
      icon: 'lightbulb',
      iconColor: '#3b82f6',
      iconBackgroundColor: '#dbeafe',
    },
    {
      id: '2',
      title: '思维模式分析',
      content: '您倾向于使用"黑白思维"模式，建议尝试更灵活的思考方式。',
      icon: 'bar-chart',
      iconColor: '#8b5cf6',
      iconBackgroundColor: '#ede9fe',
    },
  ];

  const [nightMode, setNightMode] = React.useState(false);

  const menuItems = [
    { icon: 'person', title: t('profile.menu.manual'), hasSwitch: false },
    { icon: 'notifications', title: t('profile.menu.notifications'), hasSwitch: false },
    { icon: 'dark-mode', title: t('profile.menu.darkMode'), hasSwitch: true, switchValue: nightMode, onSwitch: () => setNightMode(!nightMode) },
    { icon: 'lock', title: t('profile.menu.privacy'), hasSwitch: false },
    { icon: 'help', title: t('profile.menu.help'), hasSwitch: false },
    { icon: 'share', title: t('profile.menu.share'), hasSwitch: false },
    { icon: 'settings', title: t('profile.menu.settings'), hasSwitch: false },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* 用户信息 */}
      <View style={styles.profileHeader}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' }} 
            style={styles.avatar} 
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{profileData.name}</Text>
            <Text style={styles.memberInfo}>{profileData.memberSince}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>{t('profile.editProfile')}</Text>
        </TouchableOpacity>
      </View>

      {/* 使用统计 */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{profileData.diaryCount}</Text>
          <Text style={styles.statLabel}>{t('profile.stats.diary')}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{profileData.exerciseCount}</Text>
          <Text style={styles.statLabel}>{t('profile.stats.exercises')}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{profileData.usageDays}</Text>
          <Text style={styles.statLabel}>{t('profile.stats.days')}</Text>
        </View>
      </View>

      {/* AI洞察 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile.insights.title')}</Text>
        {insights.map((insight) => (
          <InsightCard
            key={insight.id}
            title={insight.title}
            content={insight.content}
            icon={insight.icon}
            iconColor={insight.iconColor}
            iconBackgroundColor={insight.iconBackgroundColor}
          />
        ))}
      </View>

      {/* 个人说明书进度 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile.manual.title')}</Text>
        <Card style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>{t('profile.manual.progress')}</Text>
            <Text style={styles.progressText}>12/20</Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBar, { width: '60%' }]}></View>
          </View>
          <Text style={styles.progressDescription}>{t('profile.manual.question')}</Text>
        </Card>
        
        {/* 每日推荐问题 */}
        <Card style={styles.questionCard}>
          <Text style={styles.questionTitle}>{t('profile.manual.question')}</Text>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{t('profile.manual.question')}</Text>
            <Text style={styles.questionDescription}>{t('profile.manual.question')}</Text>
          </View>
          <TouchableOpacity style={styles.answerButton}>
            <Text style={styles.answerButtonText}>{t('profile.manual.answer')}</Text>
          </TouchableOpacity>
        </Card>
      </View>

      {/* 功能菜单 */}
      <View style={styles.section}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Icon name={item.icon} size={20} color="#007AFF" />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
            {item.hasSwitch ? (
              <Switch
                value={item.switchValue}
                onValueChange={item.onSwitch}
                trackColor={{ false: '#ccc', true: '#007AFF' }}
              />
            ) : (
              <Icon name="chevron-right" size={20} color="#ccc" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#e0f2fe',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  memberInfo: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressCard: {
    padding: 16,
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 14,
    color: '#999',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  progressDescription: {
    fontSize: 14,
    color: '#666',
  },
  questionCard: {
    padding: 16,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  questionContainer: {
    backgroundColor: '#dbeafe',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  questionDescription: {
    fontSize: 14,
    color: '#666',
  },
  answerButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  answerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
  },
});

export default ProfileScreen;