import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义用户偏好设置的状态类型
interface UserPreferencesState {
  darkMode: boolean;
  notificationsEnabled: boolean;
  language: string;
}

// 定义初始状态
const initialState: UserPreferencesState = {
  darkMode: false,
  notificationsEnabled: true,
  language: 'zh',
};

// 创建 slice
export const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setPreferences: (state, action: PayloadAction<UserPreferencesState>) => {
      state.darkMode = action.payload.darkMode;
      state.notificationsEnabled = action.payload.notificationsEnabled;
      state.language = action.payload.language;
    },
  },
});

// 导出 actions
export const { toggleDarkMode, setDarkMode, toggleNotifications, setLanguage, setPreferences } = userPreferencesSlice.actions;

// 导出 reducer
export default userPreferencesSlice.reducer;