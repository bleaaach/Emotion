// 日记功能相关类型定义

/**
 * 情绪类型定义
 */
export interface Emotion {
  id: string;
  name: string;
  color: string;
  intensity?: number; // 新增: 情绪强度 1-10
}

/**
 * 思维模式类型定义
 * 基于认知行为疗法(CBT)的常见认知扭曲类型
 */
export interface ThoughtPattern {
  id: string;
  name: string;
  description: string;
  example: string;
}

/**
 * 应对策略类型定义
 */
export interface CopingStrategy {
  id: string;
  title: string;
  description: string;
  steps: string[];
  isCustom?: boolean; // 是否为用户自定义策略
}

/**
 * 日记条目基础接口
 */
export interface DiaryEntryBase {
  id: string;
  date: string; // ISO 日期字符串
  content: string; // 日记内容
  mood: Emotion | null; // 主要情绪
  createdAt: string;
  updatedAt: string;
}

/**
 * 增强的日记条目接口
 * 扩展基础日记功能，添加多情绪支持、思维分析和应对策略
 */
export interface EnhancedDiaryEntry extends DiaryEntryBase {
  // 增强功能：多情绪支持
  emotions: Emotion[]; // 新增: 支持记录多个情绪
  
  // 增强功能：思维分析
  thoughtPatterns: ThoughtPattern[]; // 新增: 记录识别出的思维模式
  alternativeThoughts?: string; // 新增: 替代性思维
  
  // 增强功能：应对策略
  copingStrategies: CopingStrategy[]; // 新增: 采用的应对策略
  reflection?: string; // 新增: 应对后的反思
  
  // 增强功能：情境标签
  tags?: string[]; // 新增: 可自定义的标签
}

/**
 * 日记提醒设置接口
 */
export interface DiaryReminder {
  enabled: boolean;
  time: string; // HH:MM 格式
  frequency: 'daily' | 'weekly' | 'custom';
  daysOfWeek?: number[]; // 对于 weekly 频率，指定星期几 (0-6)
  lastSent?: string; // 上次发送时间
}

/**
 * 日记列表筛选条件
 */
export interface DiaryFilter {
  startDate?: string;
  endDate?: string;
  emotions?: string[]; // 情绪 ID 数组
  thoughtPatterns?: string[]; // 思维模式 ID 数组
  tags?: string[];
}