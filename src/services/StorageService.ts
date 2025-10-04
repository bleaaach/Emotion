import AsyncStorage from '@react-native-async-storage/async-storage';

// 定义存储键名常量
export const StorageKeys = {
  USER_PREFERENCES: '@user_preferences',
  DIARY_ENTRIES: '@diary_entries',
  EXERCISE_PROGRESS: '@exercise_progress',
  AI_INSIGHTS: '@ai_insights',
} as const;

// 存储服务类
class StorageService {
  // 保存数据
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
      throw error;
    }
  }

  // 获取数据
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading data from AsyncStorage:', error);
      throw error;
    }
  }

  // 删除数据
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data from AsyncStorage:', error);
      throw error;
    }
  }

  // 清空所有数据
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      throw error;
    }
  }

  // 获取所有键名
  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys from AsyncStorage:', error);
      throw error;
    }
  }

  // 批量获取数据
  async multiGet(keys: string[]): Promise<[string, string | null][]> {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error) {
      console.error('Error getting multiple items from AsyncStorage:', error);
      throw error;
    }
  }

  // 批量保存数据
  async multiSet(keyValuePairs: [string, string][]): Promise<void> {
    try {
      await AsyncStorage.multiSet(keyValuePairs);
    } catch (error) {
      console.error('Error setting multiple items in AsyncStorage:', error);
      throw error;
    }
  }
}

// 创建存储服务实例
const storageService = new StorageService();

export default storageService;