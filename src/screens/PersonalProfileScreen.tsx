import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Button, Chip, Divider } from 'react-native-paper';
import Card from '../components/Card';
import StatsChart from '../components/StatsChart';
import InsightCard from '../components/InsightCard';

const PersonalProfileScreen = ({ navigation }: any) => {
  // ʾ������
  const insights = [
    {
      id: 1,
      title: "��ֵ�۶���",
      content: "����ᵽ�Ĺؼ�����'�ɳ�'��'ѧϰ'���������ǳ����Ӹ��˷�չ��"
    },
    {
      id: 2,
      title: "����ģʽ",
      content: "�������˼ʹ�ϵʱ���㾭��ʹ��'���'��'����'�ȴʻ㣬���������ͬ���ġ�"
    }
  ];

  const answeredQuestions = [
    { id: 1, title: "ʲô��������е����л�����", date: "2023-05-15" },
    { id: 2, title: "����һ������е����������ʱ��", date: "2023-05-10" },
    { id: 3, title: "���������������ϵ���ЩƷ�ʣ�", date: "2023-05-05" }
  ];

  const tags = ['�ɳ�', 'ѧϰ', '���', '����', '��ֵ��', '�˼ʹ�ϵ'];

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="���˵���" />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        {/* �������� */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>��������</Text>
          <View style={styles.profileSummary}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>�ѻش�����</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>18</Text>
              <Text style={styles.statLabel}>������ǩ</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statLabel}>���췢��</Text>
            </View>
          </View>
        </Card>

        {/* �ؼ����� */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>�ؼ�����</Text>
          <View style={styles.tagCloud}>
            {tags.map((tag, index) => (
              <Chip 
                key={index} 
                mode="outlined" 
                style={[styles.tag, { fontSize: 12 + (index % 3) * 2 }]}
              >
                {tag}
              </Chip>
            ))}
          </View>
        </Card>

        {/* ���˶��� */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>���˶���</Text>
          {insights.map((insight) => (
            <InsightCard 
              key={insight.id}
              title={insight.title}
              content={insight.content}
            />
          ))}
        </Card>

        {/* �ش���ʷ */}
        <Card style={styles.section}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>�ش���ʷ</Text>
            <Button 
              mode="text" 
              onPress={() => navigation.navigate('QuestionLibrary')}
            >
              �鿴ȫ��
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

        {/* ����������ʷ */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>����������ʷ</Text>
          <View style={styles.timeline}>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>��������</Text>
                <Text style={styles.timelineDate}>2023-04-01</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>�״λش�����</Text>
                <Text style={styles.timelineDate}>2023-04-05</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>�����׸�����</Text>
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