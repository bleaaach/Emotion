import storageService, { StorageKeys } from './StorageService';

// 日记条目类型定义
export interface DiaryEntry {
  id: string;
  date: string; // ISO格式日期
  emotions: string[]; // 情绪标签
  emotionType: string; // 情绪类型（用于颜色标识）
  title: string;
  excerpt: string;
  situation: string; // 情境描述
  automaticThoughts: string; // 自动思维
  beliefRating: number; // 信念评分 (1-100%)
  alternativeThoughts: string; // 替代思维
  newBeliefRating: number; // 新的信念评分 (1-100%)
  behavior: string; // 行为描述
  result: string; // 结果评价
  bodySensations?: string; // 身体感受
}

class DiaryService {
  // 获取所有日记条目
  async getAllEntries(): Promise<DiaryEntry[]> {
    try {
      const entries = await storageService.getItem<DiaryEntry[]>(StorageKeys.DIARY_ENTRIES);
      return entries || [];
    } catch (error) {
      console.error('Error getting diary entries:', error);
      return [];
    }
  }

  // 根据ID获取单个日记条目
  async getEntryById(id: string): Promise<DiaryEntry | null> {
    try {
      const entries = await this.getAllEntries();
      return entries.find(entry => entry.id === id) || null;
    } catch (error) {
      console.error(`Error getting diary entry with id ${id}:`, error);
      return null;
    }
  }

  // 保存日记条目（新增或更新）
  async saveEntry(entry: DiaryEntry): Promise<void> {
    try {
      const entries = await this.getAllEntries();
      const existingIndex = entries.findIndex(e => e.id === entry.id);
      
      if (existingIndex >= 0) {
        // 更新现有条目
        entries[existingIndex] = entry;
      } else {
        // 添加新条目
        entries.push(entry);
      }
      
      // 按日期倒序排列
      entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      await storageService.setItem(StorageKeys.DIARY_ENTRIES, entries);
    } catch (error) {
      console.error('Error saving diary entry:', error);
      throw error;
    }
  }

  // 删除日记条目
  async deleteEntry(id: string): Promise<void> {
    try {
      const entries = await this.getAllEntries();
      const filteredEntries = entries.filter(entry => entry.id !== id);
      await storageService.setItem(StorageKeys.DIARY_ENTRIES, filteredEntries);
    } catch (error) {
      console.error(`Error deleting diary entry with id ${id}:`, error);
      throw error;
    }
  }

  // 根据日期范围获取日记条目
  async getEntriesByDateRange(startDate: Date, endDate: Date): Promise<DiaryEntry[]> {
    try {
      const entries = await this.getAllEntries();
      return entries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= startDate && entryDate <= endDate;
      });
    } catch (error) {
      console.error('Error getting diary entries by date range:', error);
      return [];
    }
  }

  // 根据情绪类型获取日记条目
  async getEntriesByEmotionType(emotionType: string): Promise<DiaryEntry[]> {
    try {
      const entries = await this.getAllEntries();
      return entries.filter(entry => entry.emotionType === emotionType);
    } catch (error) {
      console.error(`Error getting diary entries by emotion type ${emotionType}:`, error);
      return [];
    }
  }

  // 获取日记统计信息
  async getStatistics(): Promise<{
    totalEntries: number;
    emotionDistribution: Record<string, number>;
  }> {
    try {
      const entries = await this.getAllEntries();
      const emotionDistribution: Record<string, number> = {};
      
      entries.forEach(entry => {
        if (emotionDistribution[entry.emotionType]) {
          emotionDistribution[entry.emotionType]++;
        } else {
          emotionDistribution[entry.emotionType] = 1;
        }
      });
      
      return {
        totalEntries: entries.length,
        emotionDistribution,
      };
    } catch (error) {
      console.error('Error getting diary statistics:', error);
      return {
        totalEntries: 0,
        emotionDistribution: {},
      };
    }
  }
}

// 创建日记服务实例
const diaryService = new DiaryService();

export default diaryService;