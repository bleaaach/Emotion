import { I18n } from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

// 导入翻译文件
import zh from '../locales/zh';
import en from '../locales/en';

// 创建 i18n 实例
const i18n = new I18n({
  zh,
  en,
});

// 获取设备语言
const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    return locales[0].languageCode;
  }
  return 'zh'; // 默认语言
};

// 设置默认语言
const deviceLanguage = getDeviceLanguage();
i18n.defaultLocale = 'zh';
i18n.locale = deviceLanguage;
i18n.enableFallback = true;

// 本地化服务类
class LocalizationService {
  // 获取翻译文本
  t(key: string, options?: any) {
    return i18n.t(key, options);
  }

  // 更改语言
  changeLanguage(language: string) {
    i18n.locale = language;
  }

  // 获取当前语言
  getCurrentLanguage() {
    return i18n.locale;
  }

  // 获取支持的语言列表
  getSupportedLanguages() {
    return Object.keys(i18n.translations);
  }
}

// 创建本地化服务实例
const localizationService = new LocalizationService();

export default localizationService;