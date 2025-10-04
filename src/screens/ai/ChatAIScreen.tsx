import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useTranslation from '../../hooks/useTranslation';

const ChatAIScreen: React.FC = () => {
  const { t } = useTranslation();
  // 模拟聊天历史记录
  const [chatHistory, setChatHistory] = useState([
    { id: '1', type: 'ai', content: '您好！我是您的情绪助手AI，有什么我可以帮助您的吗？', timestamp: '10:30' },
    { id: '2', type: 'user', content: '最近我总是感到焦虑，尤其是在工作的时候。', timestamp: '10:32' },
    { id: '3', type: 'ai', content: '我理解您的感受。能告诉我更多关于这种焦虑的情况吗？比如它通常在什么情况下出现？', timestamp: '10:33' },
  ]);

  const [userMessage, setUserMessage] = useState('');

  const handleSendMessage = () => {
    if (userMessage.trim() === '') return;
    
    // 添加用户消息
    const newUserMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory(prev => [...prev, newUserMessage]);
    setUserMessage('');
    
    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: '谢谢您的分享。基于您描述的情况，我建议您可以尝试深呼吸练习来缓解焦虑。同时，记录下引发焦虑的具体事件也会有助于我们进一步分析。',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: any }) => {
    if (item.type === 'ai') {
      return (
        <View style={styles.aiMessageContainer}>
          <View style={styles.aiMessage}>
            <Text style={styles.messageText}>{item.content}</Text>
            <Text style={styles.messageTime}>{item.timestamp}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.userMessageContainer}>
          <View style={styles.userMessage}>
            <Text style={[styles.messageText, styles.userMessageText]}>{item.content}</Text>
            <Text style={[styles.messageTime, styles.userMessageTime]}>{item.timestamp}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('ai.chat.title')}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 聊天历史 */}
      <FlatList
        data={chatHistory}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
      />

      {/* 输入区域 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={userMessage}
          onChangeText={setUserMessage}
          placeholder={t('ai.chat.placeholder')}
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, userMessage.trim() === '' && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={userMessage.trim() === ''}
        >
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
  },
  aiMessageContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  aiMessage: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 0,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  userMessage: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 16,
    borderBottomRightRadius: 0,
    maxWidth: '80%',
  },
  messageText: {
    color: '#333',
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#fff',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'right',
  },
  userMessageTime: {
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
});

export default ChatAIScreen;