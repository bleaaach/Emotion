import storageService, { StorageKeys } from './StorageService';

// 用户偏好设置类型定义
export interface UserPreferences {
  darkMode: boolean;
  notificationsEnabled: boolean;
  language: string;
  reminderTime: string; // 提醒时间，格式为 "HH:mm"
}

// 默认用户偏好设置
const DEFAULT_PREFERENCES: UserPreferences = {
  darkMode: false,
  notificationsEnabled: true,
  language: 'zh',
  reminderTime: '09:00',
};

class UserPreferencesService {
  // 获取用户偏好设置
  async getPreferences(): Promise<UserPreferences> {
    try {
      const preferences = await storageService.getItem<UserPreferences>(StorageKeys.USER_PREFERENCES);
      return preferences || DEFAULT_PREFERENCES;
    } catch (error) {
      console.error('Error getting user preferences:', error);
      return DEFAULT_PREFERENCES;
    }
  }

  // 保存用户偏好设置
  async savePreferences(preferences: UserPreferences): Promise<void> {
    try {
      await storageService.setItem(StorageKeys.USER_PREFERENCES, preferences);
    } catch (error) {
      console.error('Error saving user preferences:', error);
      throw error;
    }
  }

  // 更新单个偏好设置项
  async updatePreference<K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ): Promise<void> {
    try {
      const currentPreferences = await this.getPreferences();
      const updatedPreferences = {
        ...currentPreferences,
        [key]: value,
      };
      await this.savePreferences(updatedPreferences);
    } catch (error) {
      console.error(`Error updating preference ${key}:`, error);
      throw error;
    }
  }

  // 重置为默认设置
  async resetToDefault(): Promise<void> {
    try {
      await this.savePreferences(DEFAULT_PREFERENCES);
    } catch (error) {
      console.error('Error resetting user preferences to default:', error);
      throw error;
    }
  }
}

// 创建用户偏好设置服务实例
const userPreferencesService = new UserPreferencesService();

export default userPreferencesService;