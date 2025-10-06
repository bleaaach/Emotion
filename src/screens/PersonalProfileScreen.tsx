import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Button, Chip, Divider } from 'react-native-paper';
import Card from '@legacy-components/Card';
import StatsChart from '@legacy-components/StatsChart';
import InsightCard from '@legacy-components/InsightCard';

const PersonalProfileScreen = ({ navigation }: any) => {
  // 示例数据
  const insights = [
    {
      id: 1,
      title: "价值观洞察",
      content: "你最常提到的关键词是'成长'和'学习'，这表明你非常重视个人发展。"
    },
    {
      id: 2,
      title: "情绪模式",
      content: "在描述人际关系时，你经常使用'理解'和'包容'等词汇，体现了你的同理心。"
    }
  ];

  const answeredQuestions = [
    { id: 1, title: "什么情况下你会感到最有活力？", date: "2023-05-15" },
    { id: 2, title: "描述一个让你感到深深满足的时刻", date: "2023-05-10" },
    { id: 3, title: "你最欣赏朋友身上的哪些品质？", date: "2023-05-05" }
  ];

  const tags = ['成长', '学习', '理解', '包容', '价值观', '人际关系'];

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="个人档案" />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        {/* 档案概览 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>档案概览</Text>
          <View style={styles.profileSummary}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>已回答问题</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>18</Text>
              <Text style={styles.statLabel}>创建标签</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statLabel}>洞察发现</Text>
            </View>
          </View>
        </Card>

        {/* 关键词云 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>关键词云</Text>
          <View style={styles.tagCloud}>
            {tags.map((tag, index) => (
              <Chip 
                key={index} 
                mode="outlined" 
                style={styles.tag}
                textStyle={{ fontSize: 12 + (index % 3) * 2 }}
              >
                {tag}
              </Chip>
            ))}
          </View>
        </Card>

        {/* 个人洞察 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>个人洞察</Text>
          {insights.map((insight) => (
            <InsightCard
              key={insight.id}
              title={insight.title}
              content={insight.content}
              icon="info"
              iconColor="#fff"
              iconBackgroundColor="#4A90E2"
            />
          ))}
        </Card>

        {/* 回答历史 */}
        <Card style={styles.section}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>回答历史</Text>
            <Button 
              mode="text" 
              onPress={() => navigation.navigate('QuestionLibrary')}
            >
              查看全部
            </Button>
          </View>
          {answeredQuestions.map((question) => (
            <View key={question.id}>
              <View style={styles.historyItem}>
                <Text style={styles.questionTitle}>{question.title}</Text>
                <Text style={styles.questionDate}>{question.date}</Text>
              </View>
              <Divider />
            </View>
          ))}
        </Card>

        {/* 档案更新历史 */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>档案更新历史</Text>
          <View style={styles.timeline}>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>档案创建</Text>
                <Text style={styles.timelineDate}>2023-04-01</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>首次回答问题</Text>
                <Text style={styles.timelineDate}>2023-04-05</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>生成首个洞察</Text>
                <Text style={styles.timelineDate}>2023-04-12</Text>
              </View>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    flex: 1,
    padding: 16
  },
  section: {
    marginBottom: 16,
    padding: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  profileSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  statItem: {
    alignItems: 'center'
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2'
  },
  statLabel: {
    fontSize: 14,
    color: '#666'
  },
  tagCloud: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  tag: {
    margin: 4
  },
  historyItem: {
    paddingVertical: 12
  },
  questionTitle: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333'
  },
  questionDate: {
    fontSize: 12,
    color: '#999'
  },
  timeline: {
    marginLeft: 10
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4A90E2',
    marginRight: 12
  },
  timelineContent: {
    flex: 1
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333'
  },
  timelineDate: {
    fontSize: 14,
    color: '#999'
  }
});

export default PersonalProfileScreen;